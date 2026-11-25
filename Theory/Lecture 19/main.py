from fastapi import FastAPI, HTTPException, Depends, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from datetime import date
import math

from database import engine, get_db, Base
from models import Student, Course, Department, Enrollment
from schemas import (
    StudentCreate,
    StudentUpdate,
    StudentResponse,
    CourseCreate,
    CourseResponse,
    PaginatedResponse,
    MessageResponse
)

# Initialize database schema
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Student & Course RESTful API",
    description="Lecture 19 - Implementing RESTful API Endpoints with FastAPI, Pydantic, and SQLAlchemy",
    version="1.0.0"
)

@app.get("/", tags=["Root"])
def root():
    return {
        "message": "Welcome to Student & Course RESTful API",
        "documentation": "/docs",
        "version": "1.0.0",
        "author": "Ansh Tyagi (SAP ID: 590014867)"
    }

@app.get("/health", tags=["Root"])
def health():
    return {"status": "healthy", "service": "student-api"}

# ----------------- Student Endpoints -----------------

@app.post("/students", response_model=StudentResponse, status_code=status.HTTP_201_CREATED, tags=["Students"])
def create_student(student: StudentCreate, db: Session = Depends(get_db)):
    # Check email duplicate
    existing = db.query(Student).filter(Student.email == student.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Student with email '{student.email}' already exists"
        )
    
    db_student = Student(
        name=student.name,
        email=student.email,
        branch=student.branch.value,
        enrollment_date=student.enrollment_date
    )
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

@app.get("/students", response_model=PaginatedResponse, tags=["Students"])
def list_students(
    branch: Optional[str] = Query(None, description="Filter by branch"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(10, ge=1, le=100, description="Items per page"),
    db: Session = Depends(get_db)
):
    query = db.query(Student)
    if branch:
        query = query.filter(Student.branch == branch)
    
    total = query.count()
    pages = math.ceil(total / limit) if total > 0 else 1
    offset = (page - 1) * limit
    students = query.offset(offset).limit(limit).all()
    
    return {
        "total": total,
        "page": page,
        "limit": limit,
        "pages": pages,
        "data": students
    }

@app.get("/students/{student_id}", response_model=StudentResponse, tags=["Students"])
def get_student(student_id: int, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Student #{student_id} not found")
    return student

@app.put("/students/{student_id}", response_model=StudentResponse, tags=["Students"])
def update_student(student_id: int, student_data: StudentUpdate, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Student #{student_id} not found")
    
    update_dict = student_data.model_dump(exclude_unset=True)
    if "branch" in update_dict and update_dict["branch"] is not None:
        update_dict["branch"] = update_dict["branch"].value
    
    for key, val in update_dict.items():
        setattr(student, key, val)
    
    db.commit()
    db.refresh(student)
    return student

@app.delete("/students/{student_id}", response_model=MessageResponse, tags=["Students"])
def delete_student(student_id: int, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Student #{student_id} not found")
    
    db.delete(student)
    db.commit()
    return {"message": f"Student #{student_id} successfully deleted"}

# ----------------- Course Endpoints -----------------

@app.post("/courses", response_model=CourseResponse, status_code=status.HTTP_201_CREATED, tags=["Courses"])
def create_course(course: CourseCreate, db: Session = Depends(get_db)):
    existing = db.query(Course).filter(Course.code == course.code).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Course code '{course.code}' already exists")
    
    db_course = Course(**course.model_dump())
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course

@app.get("/courses", response_model=List[CourseResponse], tags=["Courses"])
def list_courses(db: Session = Depends(get_db)):
    return db.query(Course).all()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
