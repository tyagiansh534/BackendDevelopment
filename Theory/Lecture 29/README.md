# Lecture 29: Testing and Debugging Django Applications

**Course Outcome:** CO4 - Apply security best practices and conduct testing.  
**Author:** Ansh Tyagi (SAP ID: 590014867)

---

## 1. Overview
This lecture demonstrates professional automated testing and systematic debugging in a Django backend application:
- **Unit & Integration Tests**: Using Django's `TestCase` and `SimpleTestCase` with the internal HTTP test client.
- **Endpoint Testing**: Testing the `health-check` and parameterized `student-detail` routes with URL reverse resolution (`reverse()`).
- **Mocking External Dependencies**: Using `unittest.mock.patch` on `requests.get` to test external API integrations deterministically without making actual network calls.
- **Database Isolation**: Verifying Django's automated test database creation and teardown to ensure test independence.
- **Systematic Defect Diagnosis**: Logging failures, reading assertion tracebacks, and verifying regression prevention.

---

## 2. Directory Structure
```
Lecture 29/
├── student_system/
│   ├── manage.py
│   ├── student_system/
│   │   ├── settings.py
│   │   └── urls.py
│   └── students/
│       ├── models.py
│       ├── views.py
│       ├── urls.py
│       ├── utils.py       # External API integration with timeout/logging
│       └── tests.py       # Full Django unit & integration test suite
├── run_tests.py           # Automated test suite runner
└── README.md
```

---

## 3. Running the Test Suite

Run tests with verbose output:
```bash
py run_tests.py
```
Or directly via Django manage.py:
```bash
cd student_system
py manage.py test students -v 2
```

### Key Test Cases Implemented:
1. `test_health_endpoint`: Asserts HTTP 200 and JSON `{"status": "ok"}`.
2. `test_student_detail_returns_id`: Tests parameterized `students/<int:student_id>/` route with test DB record.
3. `test_nonexistent_student_returns_404`: Asserts proper HTTP 404 response when record is missing.
4. `test_timeout_returns_safe_error`: Uses `@patch("students.utils.requests.get")` with `side_effect = Timeout` to verify graceful degradation.
5. `test_success_returns_data`: Mocks valid external HTTP payload.
6. `test_database_isolation`: Verifies that each test runs within an isolated transaction.
