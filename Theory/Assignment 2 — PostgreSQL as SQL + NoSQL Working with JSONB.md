# Assignment 2 — PostgreSQL as SQL + NoSQL: Working with JSONB

**Course:** Backend Development (CSFS3008P)  
**Author:** Ansh Tyagi  
**SAP ID:** 590014867  
**Date:** November 2026  

---

## Part A — Conceptual Questions

### Question 1: What is `jsonb` in PostgreSQL, and how does it differ from the plain `json` type?

**Answer:**  
PostgreSQL provides two native data types for storing JSON data: `json` and `jsonb`. The primary distinction lies in how the data is stored, processed, and indexed.

* **Storage Format:** The plain `json` data type stores an exact textual replica of the input string, including whitespace, formatting, and duplicate keys. In contrast, `jsonb` (Binary JSON) parses and decomposes the input into a structured binary format. During this process, insignificant whitespace is stripped, duplicate keys are eliminated (retaining only the last value), and object keys are sorted.
* **Write Performance:** Because `json` simply checks syntax validity and stores the raw text without decomposition, write operations (`INSERT`, `UPDATE`) are slightly faster than `jsonb`. Storing data in `jsonb` incurs a minor conversion overhead during ingestion to build the binary structure.
* **Query and Indexing Performance:** For read and query operations, `jsonb` is vastly superior. Every query on a `json` column requires reparsing the raw text from scratch. Conversely, `jsonb` binary representations allow instant random-access key lookup without reparsing. Furthermore, `jsonb` supports powerful **GIN (Generalized Inverted Index)** indexing, path extraction, and containment operators (`@>`), enabling sub-millisecond lookups on millions of nested documents.

```sql
-- Comparison example
CREATE TABLE demo_types (
    id SERIAL PRIMARY KEY,
    raw_doc JSON,
    binary_doc JSONB
);

INSERT INTO demo_types (raw_doc, binary_doc) VALUES (
    '{"name": "Ansh",  "age": 21, "name": "Ansh Tyagi"}',
    '{"name": "Ansh",  "age": 21, "name": "Ansh Tyagi"}'
);

-- raw_doc preserves exact spacing and duplicates:
-- {"name": "Ansh",  "age": 21, "name": "Ansh Tyagi"}

-- binary_doc removes duplicates and normalizes whitespace:
-- {"age": 21, "name": "Ansh Tyagi"}
```

---

### Question 2: How can PostgreSQL work as both a SQL and a NoSQL database in the same table?

**Answer:**  
PostgreSQL bridges the relational (SQL) and non-relational (NoSQL document) paradigms by allowing developers to mix strict, strongly typed columns with flexible, schemaless `jsonb` columns within the exact same table.

* **Relational Backbone:** Core enterprise attributes common to all entities—such as `id`, `name`, `category`, `price`, `created_at`, and foreign keys—are defined as standard SQL types (`INTEGER`, `VARCHAR`, `NUMERIC`, `TIMESTAMP`). This guarantees strict schema validation, referential integrity (foreign key constraints), ACID guarantees, and optimal indexing for core operational queries.
* **NoSQL Flexibility:** Entity-specific, polymorphic, or frequently evolving properties are stored inside a `jsonb` column (often named `attributes` or `metadata`). Different rows can hold entirely different key-value structures, arrays, or nested objects without requiring schema migrations (`ALTER TABLE`), sparse nullable columns, or complex Entity-Attribute-Value (EAV) anti-patterns.
* **Hybrid Unified Queries:** Developers can perform standard SQL joins, transactions, aggregations, and window functions while simultaneously filtering, updating, and indexing unstructured JSON document keys.

```sql
-- Hybrid SQL + NoSQL table
CREATE TABLE products (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,            -- Strict SQL
    category VARCHAR(50) NOT NULL,         -- Strict SQL
    price NUMERIC(10,2) NOT NULL,          -- Strict SQL
    attributes JSONB                       -- Schemaless NoSQL Document
);

-- Query combining relational columns with nested NoSQL predicates
SELECT name, price, attributes ->> 'author' AS author
FROM products
WHERE category = 'book' AND price < 600.00;
```

---

### Question 3: Give an example of a `jsonb` query using each of these operators, with the value it returns: `->`, `->>`, `@>`, `?`

**Answer:**  
PostgreSQL offers specialized operators for navigating and querying `jsonb` structures:

1. **`->` (Extract as JSONB):** Extracts a JSON object field or array element and returns the result as `jsonb`. Quotes are preserved for string values.
   ```sql
   SELECT attributes -> 'ram_gb' AS ram FROM products WHERE name = 'Dell XPS 15';
   -- Returns: 16 (as jsonb)
   SELECT attributes -> 'cpu' AS cpu FROM products WHERE name = 'Dell XPS 15';
   -- Returns: "Intel Core i7-13700H" (as jsonb, quotes included)
   ```

2. **`->>` (Extract as Text):** Extracts a JSON field or array element and returns the unquoted scalar value as native PostgreSQL `text`.
   ```sql
   SELECT attributes ->> 'cpu' AS cpu FROM products WHERE name = 'Dell XPS 15';
   -- Returns: Intel Core i7-13700H (as text, no outer quotes)
   ```
   *Difference between `->` and `->>`:* `->` returns `jsonb`, which retains JSON formatting and can be chained (e.g., `doc -> 'nested' -> 'key'`). `->>` returns terminal `text`, which is required when comparing, casting, or pattern matching (e.g., `(attributes ->> 'ram_gb')::int >= 16`).

3. **`@>` (Contains):** Evaluates whether the left-hand `jsonb` container contains the specified right-hand `jsonb` document. Returns a `boolean` (`true`/`false`).
   ```sql
   SELECT name FROM products WHERE attributes @> '{"wireless": true}';
   -- Returns: Logitech MX Master 3S
   ```

4. **`?` (Key Exists):** Checks whether a specific text string exists as a top-level key or array element. Returns `boolean`.
   ```sql
   SELECT name FROM products WHERE attributes ? 'battery_hours';
   -- Returns: Logitech MX Master 3S
   ```

---

### Question 4: How can a GIN index on a `jsonb` column change query performance?

**Answer:**  
A **Generalized Inverted Index (GIN)** is an indexing structure specifically engineered for handling composite types like arrays, full-text vectors, and `jsonb` documents. Instead of creating a single index entry per table row, a GIN index creates an index entry for every path, key, and value contained within the `jsonb` document.

* **Queries It Speeds Up:**
  GIN indexes accelerate containment and existence operations:
  - Containment queries: `attributes @> '{"wireless": true}'`
  - Key existence queries: `attributes ? 'battery_hours'`
  - Any key existence queries: `attributes ?| array['gpu', 'cpu']`
  - JSON path expressions using `jsonb_path_ops`.
  In large datasets (e.g., 500,000+ rows), a sequential table scan costing seconds is replaced by a GIN bitmap index scan taking under 2 milliseconds.

* **Queries It Does NOT Help With:**
  A default GIN index on `attributes` does **not** accelerate arbitrary inequality or range comparisons on extracted text fields, such as:
  ```sql
  SELECT * FROM products WHERE (attributes ->> 'price')::numeric > 500;
  ```
  The GIN index tracks equality and presence, not numeric ordering. To accelerate range or inequality filters on extracted JSON keys, a dedicated B-tree functional/expression index must be created instead:
  ```sql
  CREATE INDEX idx_products_ram ON products (((attributes ->> 'ram_gb')::int));
  ```

---

### Question 5: Where could PostgreSQL + `jsonb` replace a MongoDB deployment, and where would MongoDB still be the better fit?

**Answer:**  
When architecting modern backend data persistence, teams often choose between PostgreSQL with `jsonb` and dedicated document stores like MongoDB.

#### Where PostgreSQL + `jsonb` can replace MongoDB:
1. **ACID Transactions and Integrity:** When an application requires multi-table ACID transactions, foreign keys, and referential constraints alongside dynamic document attributes.
2. **Relational Joins:** When data models naturally consist of core relational entities (Users, Orders, Invoices) that must join dynamically with unstructured payloads. MongoDB `$lookup` aggregations are complex and slower than PostgreSQL SQL joins.
3. **Operational Simplicity:** Avoids maintaining and monitoring two separate database engines. A single PostgreSQL instance provides SQL, full-text search, GIS (PostGIS), and JSONB document capabilities.
4. **Strong Schema Guarantees on Fixed Fields:** Guarantees strict non-null, uniqueness, and typed checks on critical columns (`email`, `price`) while granting flexible attributes.

#### Where MongoDB is still the better fit:
1. **Massive Horizontal Scaling (Sharding):** MongoDB provides native, automated distributed sharding across clusters of nodes with automatic rebalancing. PostgreSQL typically relies on single-node vertical scaling or specialized extensions like Citus.
2. **High-Throughput Write-Heavy Unstructured Logs:** Applications ingesting massive streams of volatile, unstructured JSON (such as IoT telemetry, event clicks) benefit from MongoDB’s lightweight write pipeline.
3. **Developer Ergonomics in Pure JavaScript/Node.js:** MongoDB uses BSON and native JavaScript syntax (`mongosh`, Mongoose) without requiring SQL string concatenation or JSON type casting (`::int`).

---

## Part B — Hands-on Exercise: Product Catalog

### Task 1 — Schema Creation
```sql
CREATE TABLE products (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    attributes JSONB
);
```

### Task 2 — Insert Data (5 Products across 4 Categories)
```sql
INSERT INTO products (name, category, price, attributes) VALUES
('Clean Code', 'book', 499.00,
    '{"author": "Robert C. Martin", "pages": 464, "genre": "Engineering", "publisher": "Prentice Hall"}'::jsonb),

('Design Patterns', 'book', 650.00,
    '{"author": "Gang of Four", "pages": 395, "genre": "Computer Science", "publisher": "Addison-Wesley"}'::jsonb),

('MacBook Pro 16', 'laptop', 249999.00,
    '{"cpu": "Apple M3 Max", "ram_gb": 36, "storage_gb": 1000, "gpu": "30-core", "weight_kg": 2.14}'::jsonb),

('Dell XPS 15', 'laptop', 174990.00,
    '{"cpu": "Intel Core i7-13700H", "ram_gb": 16, "storage_gb": 512, "gpu": "RTX 4050", "weight_kg": 1.92}'::jsonb),

('Logitech MX Master 3S', 'accessory', 8995.00,
    '{"color": "Graphite", "wireless": true, "battery_hours": 70, "connectivity": "Bluetooth/USB"}'::jsonb),

('Google Pixel 9 Pro', 'smartphone', 109999.00,
    '{"screen_inch": 6.3, "camera_mp": 50, "os": "Android 15", "supports_5g": true}'::jsonb);
```

### Task 3 — Query by Category-Specific Attribute
```sql
-- 1. Book query: Filter by author
SELECT name, price, attributes ->> 'author' AS author
FROM products
WHERE category = 'book' AND attributes ->> 'author' = 'Robert C. Martin';

-- 2. Laptop query: Filter by RAM >= 16GB
SELECT name, price, attributes ->> 'cpu' AS cpu, (attributes ->> 'ram_gb')::int AS ram_gb
FROM products
WHERE category = 'laptop' AND (attributes ->> 'ram_gb')::int >= 16;

-- 3. Accessory query: Filter by battery hours >= 50
SELECT name, price, (attributes ->> 'battery_hours')::int AS battery_hours
FROM products
WHERE category = 'accessory' AND (attributes ->> 'battery_hours')::int >= 50;

-- 4. Smartphone query: Filter by 5G support
SELECT name, price, attributes ->> 'os' AS os
FROM products
WHERE category = 'smartphone' AND (attributes ->> 'supports_5g')::boolean = true;
```

### Task 4 — Containment Query
```sql
-- Find any product containing the key/value pair {"wireless": true}
SELECT id, name, category, price, attributes
FROM products
WHERE attributes @> '{"wireless": true}';
```
*Result:* Returns `Logitech MX Master 3S`.

### Task 5 — Update JSONB Without Altering Table Schema
```sql
-- Append discount_pct and in_stock flags via concatenation operator (||)
UPDATE products
SET attributes = attributes || '{"discount_pct": 10, "in_stock": true}'::jsonb
WHERE name = 'Logitech MX Master 3S';

-- Verify update
SELECT name, attributes
FROM products
WHERE name = 'Logitech MX Master 3S';
```

### Task 6 — GIN Index and EXPLAIN ANALYZE Comparison
```sql
-- Create GIN index on JSONB attributes
CREATE INDEX idx_products_attributes ON products USING GIN (attributes);

-- Analyze containment query
EXPLAIN ANALYZE
SELECT name FROM products WHERE attributes @> '{"wireless": true}';
```

**Observation on Performance:**  
- **Before GIN Index:** PostgreSQL performs a `Seq Scan on products` checking all rows sequentially.
- **After GIN Index:** On small sample tables, PostgreSQL query planner may still prefer a sequential scan due to low row count; on tables with thousands of records, the planner switches to a `Bitmap Index Scan on idx_products_attributes` followed by a `Bitmap Heap Scan`, eliminating full-table scans.

---

### Task 7 — MongoDB Comparison (`mongosh`)

#### MongoDB Equivalent Script:
```javascript
// Connect and insert documents
use assignment2_catalog;

db.products.insertMany([
  { name: "Clean Code", category: "book", price: 499.00, attributes: { author: "Robert C. Martin", pages: 464 } },
  { name: "MacBook Pro 16", category: "laptop", price: 249999.00, attributes: { cpu: "Apple M3 Max", ram_gb: 36 } },
  { name: "Dell XPS 15", category: "laptop", price: 174990.00, attributes: { cpu: "Intel Core i7", ram_gb: 16 } },
  { name: "Logitech MX Master 3S", category: "accessory", price: 8995.00, attributes: { color: "Graphite", wireless: true } }
]);

// Query equivalent to Task 3 (laptop RAM >= 16)
db.products.find({ category: "laptop", "attributes.ram_gb": { $gte: 16 } });

// Containment query equivalent to Task 4
db.products.find({ "attributes.wireless": true });

// Update equivalent to Task 5
db.products.updateOne(
  { name: "Logitech MX Master 3S" },
  { $set: { "attributes.discount_pct": 10, "attributes.in_stock": true } }
);

// Multikey Indexing
db.products.createIndex({ "attributes.wireless": 1 });
```

#### Detailed Comparison Table:

| Criterion | PostgreSQL (`jsonb`) | MongoDB (`BSON`) |
| :--- | :--- | :--- |
| **Data Model** | Relational tables with nested binary JSON columns | Schemaless document collections |
| **Query Syntax** | SQL operators (`->`, `->>`, `@>`, `?`, `jsonb_path_query`) | JavaScript Object Query syntax (`find()`, `$gte`, `$in`) |
| **Type Casting** | Explicit casting required (e.g., `(attr->>'ram')::int`) | Preserves native BSON numeric and boolean types |
| **Indexing** | GIN index for document keys; B-tree expression index for values | Multikey, compound, single-field B-tree indexes |
| **Transactions & Joins**| Full multi-table ACID transactions, native SQL `JOIN` | Multi-document transactions supported; `$lookup` for joins |
| **Scaling** | Vertical scaling, read replicas, extension sharding (Citus) | Native horizontal auto-sharding out-of-the-box |

---

## Conclusion
PostgreSQL with `jsonb` bridges the gap between relational databases and document stores. It allows developers to maintain relational integrity and ACID transactions for core business entities while offering schemaless agility for polymorphic, evolving attributes without sacrificing query speed or indexing capability.
