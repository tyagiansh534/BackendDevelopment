# SQL (PostgreSQL) vs NoSQL (MongoDB)

**Author:** Ansh Tyagi | SAP ID: 590014867  
**Course:** Backend Development (CSFS3008) — Theory Unit 2 L13  

---

## 1. Architectural Comparison

| Dimension | Relational Databases (PostgreSQL) | Document Databases (MongoDB) |
| :--- | :--- | :--- |
| **Data Model** | Tabular relations (Rows & Columns) with explicit foreign keys | Hierarchical JSON-like documents (BSON) |
| **Schema** | Rigid, predefined schema with DDL constraints | Dynamic, polymorphic schema per document |
| **Query Language** | Structured Query Language (SQL) | JavaScript / Object-based Query API |
| **Relationships** | Normalized tables connected via `JOIN` clauses | Denormalized embedded subdocuments or `$lookup` references |
| **Transactions** | Full ACID (Atomicity, Consistency, Isolation, Durability) | Multi-document ACID transactions since v4.0 |
| **Scaling** | Primarily vertical scaling; read replicas | Native horizontal scaling through auto-sharding |

---

## 2. When to Use Which?

### Choose PostgreSQL When:
1. Data has complex relational connections requiring relational integrity.
2. Financial, billing, or enterprise transactions require strict ACID guarantees.
3. Complex multi-table aggregations, joins, and analytical reporting are standard.

### Choose MongoDB When:
1. Rapid iterative prototyping where schema changes constantly.
2. Ingesting high-velocity, polymorphic document structures (e.g., event logs, catalog items).
3. Massive horizontal write scale is required across distributed clusters.
