from django.test import TestCase, SimpleTestCase
from django.urls import reverse
from unittest.mock import patch
import requests

from .models import Student
from .utils import get_external_data


class StudentHealthTest(SimpleTestCase):
    def test_health_endpoint(self):
        """Task 1: Test that the health endpoint returns 200 and status: ok."""
        response = self.client.get(reverse("health-check"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "ok")


class StudentRouteTest(TestCase):
    def test_student_detail_returns_id(self):
        """Task 2: Test parameterized endpoint with an isolated test record."""
        student = Student.objects.create(
            name="Aarav Sharma",
            roll_number="R101",
            email="aarav@upes.ac.in",
            course="B.Tech CSE",
            gpa=8.9
        )
        response = self.client.get(
            reverse("student-detail", kwargs={"student_id": student.id})
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["student_id"], student.id)
        self.assertEqual(response.json()["name"], "Aarav Sharma")

    def test_nonexistent_student_returns_404(self):
        """Test proper 404 handling for non-existent record."""
        response = self.client.get(
            reverse("student-detail", kwargs={"student_id": 9999})
        )
        self.assertEqual(response.status_code, 404)


class ExternalServiceTest(SimpleTestCase):
    @patch("students.utils.requests.get")
    def test_timeout_returns_safe_error(self, mock_get):
        """Task 4: Mock network timeout and assert graceful error handling."""
        mock_get.side_effect = requests.exceptions.Timeout

        result = get_external_data(42)

        self.assertIsNone(result["data"])
        self.assertEqual(result["error"], "External service timed out")

    @patch("students.utils.requests.get")
    def test_success_returns_data(self, mock_get):
        """Task 4: Mock successful external response."""
        mock_get.return_value.json.return_value = {"name": "Aarav", "scholarship": True}
        mock_get.return_value.raise_for_status.return_value = None

        result = get_external_data(42)

        self.assertIsNotNone(result["data"])
        self.assertEqual(result["data"]["name"], "Aarav")
        self.assertIsNone(result["error"])


class StudentDatabaseTest(TestCase):
    def test_database_isolation(self):
        """Task 5: Verify Django test runner isolates database per test case."""
        self.assertEqual(Student.objects.count(), 0)
        Student.objects.create(
            name="Diya Patel",
            roll_number="R102",
            email="diya@upes.ac.in",
            course="B.Tech ECE",
            gpa=9.2
        )
        self.assertEqual(Student.objects.count(), 1)
