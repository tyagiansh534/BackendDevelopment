# Library Management ER Diagram & Design

**Author:** Ansh Tyagi | SAP ID: 590014867  
**Course:** Backend Development (CSFS3008) — Theory Unit 2 L14 A  

---

## 1. Entity-Relationship Overview

```
[Publishers] (1) --------< (M) [Books] (M) >--------< (M) [Authors]
                                 |
                                 | (1)
                                 |
                                 v (M)
                              [Loans]
                                 ^ (M)
                                 |
                                 | (1)
                            [Members]
```

### Cardinalities:
- **Publishers to Books:** One-to-Many ($1:N$). A publisher can release multiple books; each book has one primary publisher.
- **Books to Authors:** Many-to-Many ($M:N$). A book can be co-authored by multiple writers, and an author can write multiple books. Decomposed via the `book_authors` junction table.
- **Members to Loans:** One-to-Many ($1:N$). A member can borrow multiple books over time.
- **Books to Loans:** One-to-Many ($1:N$). A book copy can be loaned across multiple transactions.
