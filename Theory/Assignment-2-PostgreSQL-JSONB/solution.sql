-- ============================================================================
-- Assignment 2: PostgreSQL as SQL + NoSQL: Working with JSONB
-- Course: Backend Development (Theory)
-- Author: Ansh Tyagi | SAP ID: 590014867
-- ============================================================================

-- Drop table if already exists
DROP TABLE IF EXISTS products CASCADE;

-- ----------------------------------------------------------------------------
-- TASK 1: Schema Definition
-- ----------------------------------------------------------------------------
CREATE TABLE products (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    attributes JSONB
);

-- ----------------------------------------------------------------------------
-- TASK 2: Insert Data (5 products across 4 distinct categories)
-- ----------------------------------------------------------------------------
INSERT INTO products (name, category, price, attributes) VALUES
-- Category 1: Books (attributes: author, pages, genre, publisher)
('Clean Code', 'book', 499.00,
 '{"author": "Robert C. Martin", "pages": 464, "genre": "Software Engineering", "publisher": "Prentice Hall"}'::jsonb),

('Design Patterns', 'book', 650.00,
 '{"author": "Gang of Four", "pages": 395, "genre": "Computer Science", "publisher": "Addison-Wesley"}'::jsonb),

-- Category 2: Laptops (attributes: cpu, ram_gb, storage_gb, gpu, weight_kg)
('MacBook Pro 16', 'laptop', 249999.00,
 '{"cpu": "Apple M3 Max", "ram_gb": 36, "storage_gb": 1000, "gpu": "30-core", "weight_kg": 2.14}'::jsonb),

('Dell XPS 15', 'laptop', 174990.00,
 '{"cpu": "Intel Core i7-13700H", "ram_gb": 16, "storage_gb": 512, "gpu": "RTX 4050", "weight_kg": 1.92}'::jsonb),

-- Category 3: Accessories (attributes: color, wireless, battery_hours, connectivity)
('Logitech MX Master 3S', 'accessory', 8995.00,
 '{"color": "Graphite", "wireless": true, "battery_hours": 70, "connectivity": "Bluetooth/USB"}'::jsonb),

-- Category 4: Smartphones (attributes: screen_inch, camera_mp, os, supports_5g)
('Google Pixel 9 Pro', 'smartphone', 109999.00,
 '{"screen_inch": 6.3, "camera_mp": 50, "os": "Android 15", "supports_5g": true}'::jsonb);

-- ----------------------------------------------------------------------------
-- TASK 3: Query by Category-Specific Attribute
-- ----------------------------------------------------------------------------

-- Query 1 (Book): Filter by author
SELECT name, price, attributes ->> 'author' AS author, attributes ->> 'pages' AS pages
FROM products
WHERE category = 'book'
  AND attributes ->> 'author' = 'Robert C. Martin';

-- Query 2 (Laptop): Filter by numeric comparison on ram_gb (cast text to int)
SELECT name, price, attributes ->> 'cpu' AS cpu, (attributes ->> 'ram_gb')::int AS ram_gb
FROM products
WHERE category = 'laptop'
  AND (attributes ->> 'ram_gb')::int >= 16;

-- Query 3 (Accessory): Filter by wireless battery life greater than 50 hours
SELECT name, price, attributes ->> 'color' AS color, (attributes ->> 'battery_hours')::int AS battery_life
FROM products
WHERE category = 'accessory'
  AND (attributes ->> 'battery_hours')::int >= 50;

-- Query 4 (Smartphone): Filter by 5G support
SELECT name, price, attributes ->> 'os' AS os, attributes ->> 'supports_5g' AS has_5g
FROM products
WHERE category = 'smartphone'
  AND (attributes ->> 'supports_5g')::boolean = true;

-- ----------------------------------------------------------------------------
-- TASK 4: Containment Query (@>)
-- ----------------------------------------------------------------------------
-- Find all products that contain {"wireless": true} inside attributes
SELECT id, name, category, price, attributes
FROM products
WHERE attributes @> '{"wireless": true}';

-- Additional containment: Find any book published by Prentice Hall
SELECT name, attributes
FROM products
WHERE attributes @> '{"publisher": "Prentice Hall"}';

-- ----------------------------------------------------------------------------
-- TASK 5: Update JSONB Without Altering Table Schema
-- ----------------------------------------------------------------------------
-- Add a discount percentage and in_stock flag using the concatenation operator (||)
UPDATE products
SET attributes = attributes || '{"discount_pct": 10, "in_stock": true}'::jsonb
WHERE name = 'Logitech MX Master 3S';

-- Verify the update
SELECT name, attributes
FROM products
WHERE name = 'Logitech MX Master 3S';

-- ----------------------------------------------------------------------------
-- TASK 6: GIN Index and Query Execution Plan Comparison
-- ----------------------------------------------------------------------------
-- 1. Explain analyze containment query BEFORE index
EXPLAIN ANALYZE
SELECT name FROM products WHERE attributes @> '{"wireless": true}';

-- 2. Create Generalized Inverted Index (GIN) on the attributes column
CREATE INDEX idx_products_attributes ON products USING GIN (attributes);

-- 3. Explain analyze containment query AFTER index
EXPLAIN ANALYZE
SELECT name FROM products WHERE attributes @> '{"wireless": true}';
