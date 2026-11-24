# Assignment 2: PostgreSQL as SQL + NoSQL: Working with JSONB

**Course:** Backend Development  
**Author:** Ansh Tyagi  
**SAP ID:** 590014867  

---

## Project Overview
This repository contains the complete implementation and theoretical analysis for **Assignment 2: PostgreSQL as SQL + NoSQL (Working with JSONB)**.

## Contents
1. **[solution.sql](file:///d:/Backend/theory/Assignment-2-PostgreSQL-JSONB/solution.sql):** Complete PostgreSQL SQL script covering:
   - Task 1: Hybrid schema creation (`products` with fixed SQL columns and dynamic `attributes JSONB`).
   - Task 2: Data population across 4 distinct categories (Books, Laptops, Accessories, Smartphones).
   - Task 3: Category-specific attribute filtering using `->>` and explicit type casting.
   - Task 4: JSONB containment query using `@>`.
   - Task 5: Dynamic document updates using `||` concatenation without schema alterations.
   - Task 6: GIN indexing (`CREATE INDEX USING GIN`) and `EXPLAIN ANALYZE` benchmarks.
2. **[mongo_comparison.js](file:///d:/Backend/theory/Assignment-2-PostgreSQL-JSONB/mongo_comparison.js):** Equivalent MongoDB (`mongosh`) implementation, including document ingestion, filtering, indexing, and syntax comparisons.
3. **[590014867_assignment2.md](file:///d:/Backend/theory/590014867_assignment2.md):** Complete assignment report answering all 5 conceptual questions and documenting all hands-on tasks.
