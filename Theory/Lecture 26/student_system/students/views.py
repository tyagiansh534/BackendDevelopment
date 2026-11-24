from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Student

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
            return JsonResponse({"status": "error", "message": str(e)}, status=400)
            
    return JsonResponse({"error": "POST method required"}, status=405)

def student_detail(request, student_id):
    try:
        s = Student.objects.get(id=student_id)
        return JsonResponse({
            "id": s.id,
            "name": s.name,
            "roll_number": s.roll_number,
            "email": s.email,
            "course": s.course,
            "gpa": float(s.gpa),
            "created_at": s.created_at.isoformat()
        })
    except Student.DoesNotExist:
        return JsonResponse({"status": "error", "message": "Student not found"}, status=404)
