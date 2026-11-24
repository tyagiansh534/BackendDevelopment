# PostgreSQL Quick Reference Guide

## Essential `psql` Commands
- `\l` : List all databases
- `\c <dbname>` : Connect to a database
- `\dt` : List all tables in current database
- `\d <tablename>` : Describe columns and constraints of a table
- `\q` : Quit psql CLI

## Essential DDL & DML Syntax

```sql
-- Create database
CREATE DATABASE university;

-- Table with primary key and foreign key
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    gpa NUMERIC(3,2) CHECK (gpa >= 0.0)
);

-- Insert row
INSERT INTO students (name, gpa) VALUES ('Ansh Tyagi', 9.15);

-- Inner Join
SELECT s.name, c.title
FROM students s
JOIN enrollments e ON s.id = e.student_id
JOIN courses c ON e.course_id = c.id;
```
