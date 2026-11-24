import logging
import time
from typing import List, Optional
from fastapi import FastAPI, Request, HTTPException, status
from pydantic import BaseModel, Field

# Configure structured logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
logger = logging.getLogger("student-api")

app = FastAPI(
    title="PBL Assignment: Scalable Student API with Monitoring & CI/CD",
    description="Containerized FastAPI Student Management Service with structured logging, health checks, and Docker orchestration.",
    version="1.0.0"
)

# Pydantic Schemas
class StudentBase(BaseModel):
    name: str = Field(..., min_length=2, example="Ansh Tyagi")
    course: str = Field(default="Backend Development", example="Backend Development")
    gpa: Optional[float] = Field(default=8.5, ge=0.0, le=10.0, example=9.15)

class StudentCreate(StudentBase):
    pass

class Student(StudentBase):
    id: int

# In-memory storage seeded with initial records
students_db: List[dict] = [
    {"id": 1, "name": "Ansh Tyagi", "course": "Backend Development", "gpa": 9.15},
    {"id": 2, "name": "Aarav Sharma", "course": "Computer Science", "gpa": 8.50},
    {"id": 3, "name": "Meera Patel", "course": "Information Technology", "gpa": 9.20},
]

# Structured HTTP Request Logging Middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start = time.perf_counter()
    try:
        response = await call_next(request)
        duration_ms = (time.perf_counter() - start) * 1000
        logger.info(
            "method=%s path=%s status=%s duration_ms=%.2f",
            request.method, request.url.path, response.status_code, duration_ms,
        )
        response.headers["X-Process-Time-Ms"] = f"{duration_ms:.2f}"
        return response
    except Exception:
        duration_ms = (time.perf_counter() - start) * 1000
        logger.exception(
            "method=%s path=%s status=500 duration_ms=%.2f",
            request.method, request.url.path, duration_ms,
        )
        raise

# 1. Root Information Endpoint
@app.get("/", tags=["Info"])
def root():
    return {
        "application": "Student Management API",
        "framework": "FastAPI",
        "status": "running",
        "author": "Ansh Tyagi",
        "sapid": "590014867",
        "location": "Dehradun",
        "version": "1.0.0"
    }

# 2. Health Check Endpoint
@app.get("/health", tags=["Monitoring"])
def health():
    return {
        "status": "healthy",
        "timestamp": time.time(),
        "database": "connected"
    }

# 3. List All Students
@app.get("/students", response_model=List[Student], tags=["Students"])
def list_students():
    return students_db

# 4. Get Student By ID
@app.get("/students/{student_id}", response_model=Student, tags=["Students"])
def get_student(student_id: int):
    for s in students_db:
        if s["id"] == student_id:
            return s
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Student #{student_id} not found")

# 5. Create a New Student
@app.post("/students", response_model=Student, status_code=status.HTTP_201_CREATED, tags=["Students"])
def create_student(payload: StudentCreate):
    new_id = max([s["id"] for s in students_db], default=0) + 1
    new_student = {
        "id": new_id,
        "name": payload.name,
        "course": payload.course,
        "gpa": payload.gpa
    }
    students_db.append(new_student)
    logger.info("Created student id=%s name=%s", new_id, payload.name)
    return new_student

# 6. Delete Student By ID
@app.delete("/students/{student_id}", tags=["Students"])
def delete_student(student_id: int):
    global students_db
    for i, s in enumerate(students_db):
        if s["id"] == student_id:
            deleted = students_db.pop(i)
            logger.info("Deleted student id=%s", student_id)
            return {"status": "deleted", "student": deleted}
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Student #{student_id} not found")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
