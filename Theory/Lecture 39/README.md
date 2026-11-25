# Lecture 39: Multi-Container Deployment (FastAPI & Express)

**Course Outcome:** CO4 – Apply security best practices and conduct testing; CO5 – Demonstrate effective team collaboration skills.  
**Author:** Ansh Tyagi (SAP ID: 590014867)

---

## 1. Overview
This lecture demonstrates running multiple heterogeneous backend services side-by-side using Docker and Docker Compose:
- **Express.js API** running in a Node.js 22 container mapped to port `3000`.
- **FastAPI API** running in a Python 3.12 container mapped to port `8000`.
- **Contract Parity**: Both microservices implement the exact same API contract (`GET /`, `GET /health`, `GET /students`) across different programming languages and runtimes.

---

## 2. Directory Structure
```
Lecture 39/
├── docker-compose.yml
├── express-app/
│   ├── server.js
│   ├── package.json
│   ├── Dockerfile
│   └── .dockerignore
├── fastapi-app/
│   ├── main.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .dockerignore
└── README.md
```

---

## 3. Running with Docker Compose

### 1. Build and Start All Services
```bash
docker compose up -d --build
```

### 2. Verify Containers
```bash
docker compose ps
```

### 3. Verify Contract Parity
- **FastAPI**:
  - `curl http://localhost:8000/health` -> `{"status":"healthy"}`
  - `curl http://localhost:8000/students`
- **Express**:
  - `curl http://localhost:3000/health` -> `{"status":"healthy"}`
  - `curl http://localhost:3000/students`

### 4. Stop Services
```bash
docker compose down
```
