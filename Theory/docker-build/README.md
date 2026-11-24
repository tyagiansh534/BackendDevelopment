# Docker Build & Docker Compose Hands-on

**Course:** Backend Development (CSFS3008) — Theory Unit 4 L37–L39  
**Author:** Ansh Tyagi  
**SAP ID:** 590014867  

---

## 1. Overview
This module demonstrates building custom Docker images and orchestrating multi-container services:
- `Dockerfile`: Multi-layer build definition customizing an Alpine Nginx web server.
- `index.html`: Custom static web page injected at image build time.
- `compose.yaml`: Declarative service definition mapping port `8080:80`.

---

## 2. Build and Run Commands

### Method A: Build & Run via Docker CLI
```bash
# 1. Build the image
docker build -t custom-nginx-backend:latest .

# 2. Run container
docker run -d -p 8080:80 --name backend_web custom-nginx-backend:latest
```

### Method B: Run via Docker Compose (Recommended)
```bash
# Start service in background
docker compose up -d --build

# View container logs
docker compose logs

# Stop service
docker compose down
```

Open `http://localhost:8080` in your web browser.
