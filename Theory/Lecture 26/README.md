# Lecture 26: Django Student Management System API

**Course:** Backend Development (CSFS3008) — Theory Unit 3 L26  
**Author:** Ansh Tyagi  
**SAP ID:** 590014867  

---

## 1. Overview
This experiment implements a RESTful Student Management API using the **Django Framework** and SQLite:
- `models.py`: Strongly typed `Student` model with roll numbers, GPA, and timestamps.
- `views.py`: JSON response views handling student listing, detail view, and JSON payload creation.
- `urls.py`: Dispatched under `/api/students/`.

---

## 2. API Endpoints
- `GET /api/students/`: Retrieve all enrolled student records.
- `POST /api/students/create/`: Create a new student from JSON request body.
- `GET /api/students/<id>/`: Retrieve single student record by ID.

---

## 3. How to Run
```bash
cd "Theory/Lecture 26/student_system"
py manage.py migrate
py manage.py runserver
```
Visit `http://127.0.0.1:8000/api/students/` in your browser or Postman.
