# Database Normalization Guide: 1NF, 2NF, 3NF

**Author:** Ansh Tyagi | SAP ID: 590014867  
**Course:** Backend Development (CSFS3008) — Theory Unit 2 L14 B  

---

## 1. Why Normalize?
Database normalization eliminates data redundancy and prevents update, insertion, and deletion anomalies.

## 2. The Three Standard Normal Forms

### 1. First Normal Form (1NF)
- **Criterion:** Every column must hold atomic (indivisible) values. No repeating groups or arrays stored as comma-separated text.
- **Fix:** Each item gets its own row with a primary key.

### 2. Second Normal Form (2NF)
- **Criterion:** Must be in 1NF, and all non-key attributes must be fully functionally dependent on the entire composite primary key (No partial dependencies).
- **Fix:** Separate entity attributes dependent on part of the key into distinct tables (`orders` vs `order_items`).

### 3. Third Normal Form (3NF)
- **Criterion:** Must be in 2NF, and no transitive dependencies (non-key columns cannot depend on other non-key columns).
- **Fix:** Move customer information (`customer_city` dependent on `customer_name` / `customer_id`) into an independent `customers` table.
