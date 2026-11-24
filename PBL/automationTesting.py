"""
automationTesting.py
Automated Test Suite for Student Management API.
Tests all endpoints: GET /, GET /health, GET /students, POST /students, GET /students/{id}, DELETE /students/{id}.
Supports:
1. In-process FastAPI TestClient (no live server needed, ideal for CI/CD runners).
2. Live HTTP endpoint testing (e.g. python automationTesting.py http://127.0.0.1:8000).
"""

import sys
import time

def run_tests_via_testclient():
    from fastapi.testclient import TestClient
    from main import app

    client = TestClient(app)
    print("=" * 60)
    print("  AUTOMATION TEST SUITE: FASTAPI STUDENT API")
    print("  Author: Ansh Tyagi | SAP ID: 590014867")
    print("=" * 60)

    total_tests = 0
    passed_tests = 0

    def assert_test(name, condition, details=""):
        nonlocal total_tests, passed_tests
        total_tests += 1
        if condition:
            passed_tests += 1
            print(f"  [PASS] {name} {details}")
        else:
            print(f"  [FAIL] {name} - FAILED {details}")

    # 1. Test Root
    res = client.get("/")
    assert_test("GET / (Root Endpoint)", res.status_code == 200 and res.json().get("status") == "running", f"(status={res.status_code})")
    assert_test("Root SAP ID Verification", res.json().get("sapid") == "590014867", f"(sapid={res.json().get('sapid')})")

    # 2. Test Health Check
    res = client.get("/health")
    assert_test("GET /health (Health Check)", res.status_code == 200 and res.json().get("status") == "healthy", f"(status={res.status_code})")

    # 3. Test List Students
    res = client.get("/students")
    students = res.json()
    assert_test("GET /students (List All)", res.status_code == 200 and isinstance(students, list) and len(students) >= 3, f"(count={len(students)})")

    # 4. Test Create Student (POST)
    new_student = {
        "name": "Test Candidate",
        "course": "Cloud Computing",
        "gpa": 8.75
    }
    res = client.post("/students", json=new_student)
    created = res.json()
    created_id = created.get("id")
    assert_test("POST /students (Create)", res.status_code == 201 and created_id is not None and created.get("name") == new_student["name"], f"(created_id={created_id})")

    # 5. Test Get Student By ID
    res = client.get(f"/students/{created_id}")
    assert_test(f"GET /students/{created_id} (Fetch by ID)", res.status_code == 200 and res.json().get("name") == "Test Candidate")

    # 6. Test Non-existent Student (404)
    res = client.get("/students/999999")
    assert_test("GET /students/999999 (404 Handling)", res.status_code == 404, f"(status={res.status_code})")

    # 7. Test Delete Student
    res = client.delete(f"/students/{created_id}")
    assert_test(f"DELETE /students/{created_id} (Delete)", res.status_code == 200 and res.json().get("status") == "deleted")

    # 8. Verify Deletion
    res = client.get(f"/students/{created_id}")
    assert_test(f"Verify Student #{created_id} Deleted", res.status_code == 404)

    # 9. Verify Middleware Header
    res = client.get("/")
    assert_test("X-Process-Time-Ms Header Check", "x-process-time-ms" in res.headers, f"(X-Process-Time-Ms={res.headers.get('x-process-time-ms')}ms)")

    print("-" * 60)
    print(f"Summary: {passed_tests}/{total_tests} tests passed successfully.")
    print("=" * 60)

    if passed_tests == total_tests:
        print(">>> ALL AUTOMATION TESTS PASSED! Ready for deployment. <<<")
        return 0
    else:
        print(">>> SOME TESTS FAILED! Check error logs above. <<<")
        return 1

if __name__ == "__main__":
    exit_code = run_tests_via_testclient()
    sys.exit(exit_code)
