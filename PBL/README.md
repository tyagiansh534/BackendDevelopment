# PBL Assignment: Containerizing a FastAPI App, Docker Hub CI/CD, Monitoring & Scaling

**Course:** Backend Development (CSFS3008) — Theory Unit 4 PBL  
**Author:** Ansh Tyagi  
**SAP ID:** 590014867  
**Location:** UPES, Dehradun  

---

## 1. Project Overview
This project delivers the complete solution for the **Unit 4 Problem-Based Learning (PBL) Assignment**:
1. **Application Containerization:** High-performance, stateless FastAPI Student Management Service containerized using a multi-stage `Dockerfile` (`python:3.12-slim`).
2. **Monitoring & Observability:** Custom HTTP request logging middleware recording request duration (`duration_ms`), status codes, paths, and exposed via `X-Process-Time-Ms` response headers, alongside a dedicated `/health` check.
3. **Automated Testing Suite:** Comprehensive automated test script (`automationTesting.py`) validating all CRUD routes, error codes, and headers.
4. **CI/CD Automation:** GitHub Actions workflow (`.github/workflows/ActionsYaml.yaml`) automatically executing `automationTesting.py`, authenticating via Docker Hub secrets, and building/pushing tagged Docker images on push.
5. **Horizontal Scaling & Load Balancing:** `docker-compose.yml` orchestrating multiple backend replicas (`fastapi-1:8001`, `fastapi-2:8002`) behind an **Nginx** round-robin reverse proxy (`port 8080`).

---

## 2. Directory Structure

```
PBL/
├── main.py                          # FastAPI Student API with logging & health checks
├── requirements.txt                 # Project dependencies
├── Dockerfile                       # Multi-stage production container definition
├── docker-compose.yml               # Multi-replica orchestration with Nginx load balancer
├── nginx.conf                       # Round-robin Nginx proxy configuration
├── automationTesting.py             # Route & health check automated test suite
├── .env.example                     # Environment template for Docker Hub tokens
├── .gitignore                       # Ignored secrets & compiled caches
├── README.md                        # Documentation & setup guide
└── .github/
    └── workflows/
        └── ActionsYaml.yaml         # Automated test -> build -> Docker Hub push pipeline
```

---

## 3. API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Application metadata, author information, and status |
| `GET` | `/health` | Health check endpoint for container orchestrators |
| `GET` | `/students` | List all students in catalog |
| `GET` | `/students/{id}` | Retrieve specific student by ID (404 if not found) |
| `POST` | `/students` | Create a new student record (HTTP 201) |
| `DELETE`| `/students/{id}` | Delete a student record (HTTP 200) |

---

## 4. How to Run Locally

### Option A: Direct Python Run (Fastest)
```bash
cd PBL
py -m pip install -r requirements.txt
py main.py
```
Open interactive Swagger API documentation at `http://127.0.0.1:8000/docs`.

### Option B: Run Automated Tests
```bash
cd PBL
py automationTesting.py
```

### Option C: Run with Docker Compose (Multi-Instance + Nginx Load Balancer)
```bash
cd PBL
docker compose up -d --build
```
Access the application through the load balancer:
- Load Balancer: `http://localhost:8080/`
- Replica 1: `http://localhost:8001/`
- Replica 2: `http://localhost:8002/`

---

## 5. CI/CD GitHub Actions Setup
1. In your GitHub repository, navigate to **Settings → Secrets and variables → Actions**.
2. Add the following repository secrets:
   - `DOCKERUSERNAME`: Your Docker Hub username.
   - `DOCKERTOKEN`: Your Docker Hub Personal Access Token (PAT).
3. Push to `main`. GitHub Actions will automatically:
   - Run `automationTesting.py`.
   - Build the Docker container.
   - Push `fastapi-student-api:v0.1` and `fastapi-student-api:latest` to your Docker Hub repository.
