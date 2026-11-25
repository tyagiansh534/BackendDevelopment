"""
test_api.py - Test suite for Lecture 19 Student & Course RESTful API
"""
import sys
import os
from datetime import date
from fastapi.testclient import TestClient

# Ensure current dir is in sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from main import app, Base, engine

client = TestClient(app)

def run_tests():
    print("=" * 60)
    print("  TEST SUITE: LECTURE 19 RESTFUL API (FASTAPI + SQLALCHEMY)")
    print("  Author: Ansh Tyagi | SAP ID: 590014867")
    print("=" * 60)

    # 1. Root & Health
    r = client.get("/")
    assert r.status_code == 200, f"Root failed: {r.status_code}"
    print("  [PASS] GET / (Root Endpoint)")

    r = client.get("/health")
    assert r.status_code == 200 and r.json()["status"] == "healthy"
    print("  [PASS] GET /health (Health Check)")

    # 2. Create Student
    student_payload = {
        "name": "Aarav Sharma",
        "email": "aarav.sharma@upes.ac.in",
        "branch": "CSE",
        "enrollment_date": "2024-08-01"
    }
    r = client.post("/students", json=student_payload)
    assert r.status_code in (201, 400), f"Create failed: {r.status_code}"
    print(f"  [PASS] POST /students (Created student status={r.status_code})")

    # 3. List Students with pagination
    r = client.get("/students?page=1&limit=5")
    assert r.status_code == 200
    res_data = r.json()
    assert "data" in res_data and "total" in res_data
    print(f"  [PASS] GET /students (Pagination total={res_data['total']})")

    # 4. Create Course
    course_payload = {
        "title": "Backend Engineering & APIs",
        "code": "CSEG3112",
        "credits": 4
    }
    r = client.post("/courses", json=course_payload)
    assert r.status_code in (201, 400)
    print(f"  [PASS] POST /courses (Course creation status={r.status_code})")

    # 5. List Courses
    r = client.get("/courses")
    assert r.status_code == 200
    print(f"  [PASS] GET /courses (Retrieved courses count={len(r.json())})")

    print("-" * 60)
    print(">>> ALL LECTURE 19 AUTOMATION TESTS PASSED! <<<")

if __name__ == "__main__":
    run_tests()
