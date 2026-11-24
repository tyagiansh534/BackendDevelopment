-- ============================================================================
-- Lecture 14: Step-by-Step Order Database Normalization (1NF, 2NF, 3NF)
-- Course: Backend Development (Theory Unit 2 L14 B)
-- Author: Ansh Tyagi | SAP ID: 590014867
-- ============================================================================

-- ----------------------------------------------------------------------------
-- STEP 0: Unnormalized Form (UNF) - Contains repeating groups and comma-separated items
-- Anomaly: Violation of atomicity, impossible to index individual items properly.
-- ----------------------------------------------------------------------------
-- unnormalized_orders(order_id, customer_name, customer_city, items, total_amount)

-- ----------------------------------------------------------------------------
-- STEP 1: First Normal Form (1NF)
-- Rule: Each column must contain atomic (indivisible) values; primary key defined.
-- ----------------------------------------------------------------------------
CREATE TABLE orders_1nf (
    order_id INT,
    item_id INT,
    customer_name VARCHAR(100),
    customer_city VARCHAR(100),
    item_name VARCHAR(100),
    item_price NUMERIC(10,2),
    quantity INT,
    PRIMARY KEY (order_id, item_id)
);

-- ----------------------------------------------------------------------------
-- STEP 2: Second Normal Form (2NF)
-- Rule: In 1NF and no partial dependencies (every non-key attribute must depend
--       on the ENTIRE composite primary key).
-- Decompose into Orders and Order_Items:
-- ----------------------------------------------------------------------------
CREATE TABLE orders_2nf (
    order_id INT PRIMARY KEY,
    customer_name VARCHAR(100),
    customer_city VARCHAR(100)
);

CREATE TABLE order_items_2nf (
    order_id INT REFERENCES orders_2nf(order_id),
    item_id INT,
    item_name VARCHAR(100),
    item_price NUMERIC(10,2),
    quantity INT,
    PRIMARY KEY (order_id, item_id)
);

-- ----------------------------------------------------------------------------
-- STEP 3: Third Normal Form (3NF)
-- Rule: In 2NF and no transitive dependencies (no non-key attribute depends
--       on another non-key attribute).
-- Customer info moved to customers table; Item details moved to items table.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS order_items_3nf CASCADE;
DROP TABLE IF EXISTS orders_3nf CASCADE;
DROP TABLE IF EXISTS items_3nf CASCADE;
DROP TABLE IF EXISTS customers_3nf CASCADE;

CREATE TABLE customers_3nf (
    customer_id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    customer_city VARCHAR(100) NOT NULL
);

CREATE TABLE items_3nf (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    unit_price NUMERIC(10,2) NOT NULL
);

CREATE TABLE orders_3nf (
    order_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers_3nf(customer_id),
    order_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE order_items_3nf (
    order_id INT REFERENCES orders_3nf(order_id) ON DELETE CASCADE,
    item_id INT REFERENCES items_3nf(item_id),
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10,2) NOT NULL, -- Historical price snapshot
    PRIMARY KEY (order_id, item_id)
);

-- Ingestion into fully normalized 3NF schema
INSERT INTO customers_3nf (customer_name, customer_city) VALUES
('Ansh Tyagi', 'Dehradun'),
('Aarav Sharma', 'Delhi');

INSERT INTO items_3nf (item_name, unit_price) VALUES
('Mechanical Keyboard', 4500.00),
('Wireless Mouse', 1800.00);

INSERT INTO orders_3nf (customer_id) VALUES (1);

INSERT INTO order_items_3nf (order_id, item_id, quantity, unit_price) VALUES
(1, 1, 1, 4500.00),
(1, 2, 2, 1800.00);

-- Query to verify total order value
SELECT o.order_id, c.customer_name, c.customer_city,
       SUM(oi.quantity * oi.unit_price) AS total_order_value
FROM orders_3nf o
JOIN customers_3nf c ON o.customer_id = c.customer_id
JOIN order_items_3nf oi ON o.order_id = oi.order_id
GROUP BY o.order_id, c.customer_name, c.customer_city;
