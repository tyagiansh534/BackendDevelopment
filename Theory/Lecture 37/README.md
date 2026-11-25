# Lecture 37: Deployment Environments and Docker Containerization (FastAPI)

**Course Outcome:** CO4 – Apply security best practices and conduct testing; CO5 – Demonstrate effective team collaboration skills.  
**Author:** Ansh Tyagi (SAP ID: 590014867)

---

## 1. Overview
This lecture demonstrates packaging and containerizing a backend Python application using **Docker**:
- Selecting a lightweight base image (`python:3.12-slim`).
- Leveraging Docker layer caching with dependency installation (`requirements.txt`).
- Binding to `0.0.0.0` so container ports map correctly to the host machine.
- Defining `EXPOSE` and container startup command with `uvicorn`.

---

## 2. Directory Structure
```
Lecture 37/
├── main.py
├── requirements.txt
├── Dockerfile
├── .dockerignore
└── README.md
```

---

## 3. Build and Run Commands

### Build the Image
```bash
docker build -t student-api-fastapi:1.0 .
```

### Run the Container
```bash
docker run -d --name student-fastapi -p 8000:8000 student-api-fastapi:1.0
```

### Test the Endpoints
```bash
curl http://localhost:8000/
curl http://localhost:8000/health
curl http://localhost:8000/students
```
Expected output for `/health`:
```json
{"status":"healthy"}
```

### Stop and Cleanup
```bash
docker stop student-fastapi
docker rm student-fastapi
```
