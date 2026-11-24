-- ============================================================================
-- Lecture 13: PostgreSQL Student Management Relational Database
-- Course: Backend Development (Theory Unit 2 L13)
-- Author: Ansh Tyagi | SAP ID: 590014867
-- ============================================================================

DROP TABLE IF EXISTS enrollments CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS departments CASCADE;

-- 1. Departments Table
CREATE TABLE departments (
    dept_id VARCHAR(10) PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL,
    building VARCHAR(50) NOT NULL
);

-- 2. Students Table
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    dept_id VARCHAR(10) REFERENCES departments(dept_id) ON DELETE CASCADE,
    gpa NUMERIC(3,2) CHECK (gpa >= 0.00 AND gpa <= 10.00),
    enrolled_date DATE DEFAULT CURRENT_DATE
);

-- 3. Courses Table
CREATE TABLE courses (
    course_code VARCHAR(20) PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    credits INT CHECK (credits > 0 AND credits <= 6),
    dept_id VARCHAR(10) REFERENCES departments(dept_id) ON DELETE CASCADE
);

-- 4. Enrollments Table (Many-to-Many junction)
CREATE TABLE enrollments (
    enrollment_id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(student_id) ON DELETE CASCADE,
    course_code VARCHAR(20) REFERENCES courses(course_code) ON DELETE CASCADE,
    semester VARCHAR(10) NOT NULL,
    grade VARCHAR(2),
    UNIQUE(student_id, course_code, semester)
);

-- Sample Data Ingestion
INSERT INTO departments (dept_id, dept_name, building) VALUES
('CSE', 'Computer Science and Engineering', 'Block 1'),
('IT', 'Information Technology', 'Block 2'),
('AIML', 'Artificial Intelligence & Machine Learning', 'Block 3');

INSERT INTO students (name, email, dept_id, gpa) VALUES
('Ansh Tyagi', 'tyagiansh534@gmail.com', 'CSE', 9.15),
('Aarav Sharma', 'aarav@example.com', 'CSE', 8.50),
('Meera Patel', 'meera@example.com', 'IT', 9.20),
('Kabir Singh', 'kabir@example.com', 'AIML', 7.90);

INSERT INTO courses (course_code, title, credits, dept_id) VALUES
('CSFS3008', 'Backend Development', 4, 'CSE'),
('CSFS3002', 'Data Structures & Algorithms', 4, 'CSE'),
('CSIX2001', 'Database Management Systems', 3, 'IT'),
('CSAI4001', 'Machine Learning', 4, 'AIML');

INSERT INTO enrollments (student_id, course_code, semester, grade) VALUES
(1, 'CSFS3008', 'V', 'A+'),
(1, 'CSFS3002', 'V', 'A'),
(2, 'CSFS3008', 'V', 'B+'),
(3, 'CSIX2001', 'V', 'A+'),
(4, 'CSAI4001', 'V', 'A');

-- Useful Queries
-- Query 1: Join students with their department and enrolled courses
SELECT s.student_id, s.name, d.dept_name, c.title AS course_title, e.grade
FROM students s
JOIN departments d ON s.dept_id = d.dept_id
JOIN enrollments e ON s.student_id = e.student_id
JOIN courses c ON e.course_code = c.course_code
ORDER BY s.student_id;

-- Query 2: Aggregate count of students per department
SELECT d.dept_name, COUNT(s.student_id) AS total_students, ROUND(AVG(s.gpa), 2) AS average_gpa
FROM departments d
LEFT JOIN students s ON d.dept_id = s.dept_id
GROUP BY d.dept_name;
