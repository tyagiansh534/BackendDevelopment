from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import logging
from .models import Student
from .utils import get_external_data

logger = logging.getLogger(__name__)

def health_check(request):
    """Health check endpoint for system uptime verification."""
    return JsonResponse({"status": "ok", "service": "student_system", "sap_id": "590014867"})

def student_list(request):
    if request.method == 'GET':
        students = list(Student.objects.values())
        return JsonResponse({"status": "success", "count": len(students), "students": students}, safe=False)
    return JsonResponse({"error": "Method not allowed"}, status=405)

@csrf_exempt
def student_create(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            student = Student.objects.create(
                name=data.get('name'),
                roll_number=data.get('roll_number'),
                email=data.get('email'),
                course=data.get('course', 'B.Tech CSE'),
                gpa=data.get('gpa', 0.0)
            )
            return JsonResponse({"status": "created", "id": student.id, "name": student.name}, status=201)
        except Exception as e:
            logger.error(f"Error creating student: {e}")
            return JsonResponse({"status": "error", "message": str(e)}, status=400)
    return JsonResponse({"error": "POST method required"}, status=405)

def student_detail(request, student_id):
    try:
        s = Student.objects.get(id=student_id)
        return JsonResponse({
            "student_id": s.id,
            "name": s.name,
            "roll_number": s.roll_number,
            "email": s.email,
            "course": s.course,
            "gpa": float(s.gpa)
        })
    except Student.DoesNotExist:
        return JsonResponse({"status": "error", "message": "Student not found"}, status=404)

def student_external_profile(request, student_id):
    result = get_external_data(student_id)
    if result["error"]:
        return JsonResponse({"error": result["error"]}, status=503)
    return JsonResponse({"student_id": student_id, "profile": result["data"]})
