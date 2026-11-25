# Lecture 19: Implementing RESTful APIs: Building API Endpoints

**Course Outcome:** CO3 – Build complete RESTful API endpoints with proper request handling and response formatting.  
**Author:** Ansh Tyagi (SAP ID: 590014867)

---

## 1. Overview
This lecture implements a full RESTful service for a Student/Course system using **FastAPI**, **Pydantic**, and **SQLAlchemy** with SQLite.

Key features implemented:
- **Layered Architecture**: Clear separation of `database.py`, `models.py`, `schemas.py`, and `main.py`.
- **CRUD Operations**: Full Create, Read, Update, and Delete endpoints for Students and Courses.
- **Data Validation**: Pydantic schema validation for request payloads and response serialization.
- **Query Parameters**: Dynamic branch filtering and paginated query results (`?branch=CSE&page=1&limit=10`).
- **Standard HTTP Codes**: `200 OK`, `201 Created`, `400 Bad Request` (duplicate prevention), and `404 Not Found`.

---

## 2. Directory Structure
```
Lecture 19/
├── database.py       # Engine, SessionLocal, Base, get_db dependency
├── models.py         # SQLAlchemy ORM models (Student, Course, Department, Enrollment)
├── schemas.py        # Pydantic validation schemas and response models
├── main.py           # FastAPI application endpoints
├── requirements.txt  # Python package dependencies
├── test_api.py       # Automated integration test runner
└── README.md
```

---

## 3. Running and Testing

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Start the Server
```bash
py main.py
```
Or with uvicorn:
```bash
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

### 3. Interactive Documentation
- **Swagger UI**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **ReDoc**: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

### 4. Run Automated Tests
```bash
py test_api.py
```
