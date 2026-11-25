from fastapi import FastAPI

app = FastAPI(title="Student API - FastAPI (Lecture 39)")

students = [
    {"id": 1, "name": "Aarav", "course": "Backend Development"},
    {"id": 2, "name": "Diya", "course": "Backend Development"},
    {"id": 3, "name": "Ansh Tyagi", "course": "Backend Development (590014867)"}
]

@app.get("/")
def read_root():
    return {
        "message": "Student API is running (FastAPI in Docker)",
        "framework": "FastAPI",
        "author": "Ansh Tyagi (SAP ID: 590014867)"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.get("/students")
def get_students():
    return students
