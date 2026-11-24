-- ============================================================================
-- Lecture 14: Library Management Relational Schema
-- Course: Backend Development (Theory Unit 2 L14 A)
-- Author: Ansh Tyagi | SAP ID: 590014867
-- ============================================================================

DROP TABLE IF EXISTS loans CASCADE;
DROP TABLE IF EXISTS book_authors CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS members CASCADE;
DROP TABLE IF EXISTS authors CASCADE;
DROP TABLE IF EXISTS publishers CASCADE;

CREATE TABLE publishers (
    publisher_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    address TEXT,
    email VARCHAR(100)
);

CREATE TABLE authors (
    author_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    bio TEXT
);

CREATE TABLE books (
    isbn VARCHAR(20) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    publisher_id INT REFERENCES publishers(publisher_id) ON DELETE SET NULL,
    publication_year INT CHECK (publication_year > 1800),
    available_copies INT NOT NULL DEFAULT 1 CHECK (available_copies >= 0)
);

CREATE TABLE book_authors (
    isbn VARCHAR(20) REFERENCES books(isbn) ON DELETE CASCADE,
    author_id INT REFERENCES authors(author_id) ON DELETE CASCADE,
    PRIMARY KEY (isbn, author_id)
);

CREATE TABLE members (
    member_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    membership_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE loans (
    loan_id SERIAL PRIMARY KEY,
    isbn VARCHAR(20) REFERENCES books(isbn),
    member_id INT REFERENCES members(member_id),
    loan_date DATE DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL,
    return_date DATE,
    CHECK (due_date >= loan_date)
);

-- Sample Data
INSERT INTO publishers (name, email) VALUES
('O''Reilly Media', 'orders@oreilly.com'),
('Pearson Education', 'contact@pearson.com');

INSERT INTO authors (name) VALUES
('Robert C. Martin'),
('Martin Fowler');

INSERT INTO books (isbn, title, publisher_id, publication_year, available_copies) VALUES
('978-0132350884', 'Clean Code', 2, 2008, 5),
('978-0201485677', 'Refactoring', 2, 1999, 3);

INSERT INTO book_authors (isbn, author_id) VALUES
('978-0132350884', 1),
('978-0201485677', 2);

INSERT INTO members (full_name, email) VALUES
('Ansh Tyagi', 'tyagiansh534@gmail.com'),
('Aarav Sharma', 'aarav@example.com');

INSERT INTO loans (isbn, member_id, loan_date, due_date) VALUES
('978-0132350884', 1, CURRENT_DATE, CURRENT_DATE + INTERVAL '14 days');
