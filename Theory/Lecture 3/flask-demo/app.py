from flask import Flask, jsonify, request

app = Flask(__name__)

# Sample students data
students = [
    {"id": 1, "name": "Aarav", "branch": "CSE", "rollNo": 1},
    {"id": 2, "name": "Diya", "branch": "ECE", "rollNo": 2},
    {"id": 3, "name": "Rohan", "branch": "IT", "rollNo": 3}
]

@app.route("/")
def home():
    return jsonify({
        "application": "Student Management API",
        "backend": "Flask (Python)",
        "status": "running",
        "author": "Ansh Tyagi (SAP ID: 590014867)"
    })

@app.route("/students", methods=["GET"])
def get_students():
    return jsonify({
        "success": True,
        "count": len(students),
        "students": students
    }), 200

@app.route("/students/<int:student_id>", methods=["GET"])
def get_student(student_id):
    student = next((s for s in students if s["id"] == student_id), None)
    if student:
        return jsonify({"success": True, "student": student}), 200
    return jsonify({"success": False, "error": "Student not found"}), 404

@app.route("/health")
def health():
    return jsonify({"status": "healthy", "service": "flask-backend"}), 200

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
