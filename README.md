# Backend Development

**Author:** Ansh Tyagi  
**SAP ID:** 590014867  
**Repository:** [https://github.com/tyagiansh534/BackendDevelopment](https://github.com/tyagiansh534/BackendDevelopment)

---

## 📁 Repository Structure

### 🧪 Lab Experiments (`Lab/`)
- **[Experiment -1](Lab/Experiment%20-1/README.md)**: Basic HTML5 elements & portfolio page.
- **[Experiment 05](Lab/Experiment%2005/README.md)**: JavaScript arrays, objects, functions, and Library Management utility.
- **[Experiment 07](Lab/Experiment%2007/README.md)**: ES6 concepts (let/const, arrow functions, destructuring, classes, modules).
- **[Experiment 08](Lab/Experiment%2008/README.md)**: DOM manipulation, event listeners, bubbling, delegation, and interactive To-Do application.
- **[Experiment 09](Lab/Experiment%2009/README.md)**: AJAX with HTML, XML, and JSON data (Fetch API, DOMParser, partial rendering).
- **[Experiment 10](Lab/Experiment%2010/README.md)**: jQuery selectors, DOM manipulation, animations, and `$.ajax` / `$.getJSON`.
- **[Experiment 11](Lab/Experiment%2011/README.md)**: Interactive Academic Portal with HTML5, CSS3, JavaScript, and dynamic XML/JSON catalogs.
- **[Experiment 12 - A](Lab/experiment%2012%20-%20A/README.md)**: Express.js MVC web application with EJS view templating.
- **[Experiment 12 - B](Lab/experiment%2012-B/README.md)**: Express.js Session & Cookie state management and Todo app.
- **[Experiment 13 - A](Lab/experiment%2013%20a/README.md)**: MongoDB & Mongoose User Authentication with Express.js.
- **[Experiment 13 B - Express Mongoose Todo App](Lab/Experiment%2013%20B%20-%20Express%20Mongoose%20Todo%20App/README.md)**: Full-featured Express + Mongoose User Registration, Login (JWT auth), and Todo management API.
- **[Experiment 15 - Django Todo App v1 Basic](Lab/Experiment%2015%20-%20Django%20Todo%20App%20v1%20Basic/README.md)**: Database-driven To-Do application built with Python Django (MVT pattern) and SQLite.
- **[Lab Evaluation 01](Lab/Lab%20Evaluation%2001/README.md)**: Eisenhower Matrix Todo App built with Node.js, Express, EJS, and PostgreSQL.

---

### 📚 Theory Lectures (`Theory/`)
- **[Lecture 03](Theory/Lecture%203/README.md)**: Setting Up Backend Development Environment (Express.js & Flask servers, HTTP request-response cycle).
- **[L04-HTTP-Requests-and-Responses](Theory/L04-HTTP-Requests-and-Responses/README.md)**: HTTP request structure, headers, status codes, DevTools inspection, and Flask JSON endpoints.
- **[L05-RESTful-APIs-FastAPI](Theory/L05-RESTful-APIs-FastAPI/README.md)**: RESTful Student & Course API built with FastAPI, Pydantic, and Uvicorn.
- **[L06-Session-Control](Theory/L06-Session-Control/README.md)**: Express.js sessions, secure cookies, and query parameters.
- **[L07-Web-Storage](Theory/L07-Web-Storage/README.md)**: Browser client storage with `localStorage`, `sessionStorage`, and JSON serialization.
- **[Lecture 8](Theory/Lecture%208/README.md)**: Server-Side Rendering across Node.js/Express (EJS) and FastAPI (Jinja2).
- **[Lecture 13](Theory/Lecture%2013/README.md)**: Relational & NoSQL Database fundamentals (PostgreSQL schema, MongoDB queries, comparison).
- **[Lecture 14](Theory/Lecture%2014/README.md)**: Database Schema Design & Normalization (ER modeling, 1NF, 2NF, 3NF decomposition).
- **[Lecture 15](Theory/Lecture%2015/README.md)**: Data Modeling, Mongoose schemas, Embedding vs Referencing, and validation.
- **[Lecture 19](Theory/Lecture%2019/README.md)**: Implementing RESTful APIs with FastAPI, SQLite, and SQLAlchemy (CRUD, pagination, filtering).
- **[Lecture 26](Theory/Lecture%2026/README.md)**: Django Framework fundamentals, MVT architecture, models, migrations, and REST endpoints.
- **[Lecture 29](Theory/Lecture%2029/README.md)**: Testing & Debugging Django Applications (Django test client, parameterized endpoints, mocking external APIs with `unittest.mock`).
- **[Lecture 37](Theory/Lecture%2037/README.md)**: Deployment Environments and Docker containerization for FastAPI (`Dockerfile`, layer caching).
- **[Lecture 39](Theory/Lecture%2039/README.md)**: Multi-Container Deployment with Docker Compose (FastAPI and Express contract parity).
- **[docker-bind](Theory/docker-bind/README.md)**: Host-to-container live filesystem synchronization via Docker bind mounts.
- **[docker-build](Theory/docker-build/README.md)**: Custom Dockerfile build and Nginx containerization.
- **[express-project](Theory/express-project/README.md)**: Express.js boilerplate setup with logging middleware.

---

### 📝 Assignments (`Theory/` & Root)
- **[Assignment 1: Notes Manager](Theory/Assignment-1-Notes-Manager/README.md)**: Browser-based Notes Manager using `localStorage` and dynamic DOM.
- **[Assignment 2: PostgreSQL as SQL + NoSQL](Theory/Assignment-2-PostgreSQL-JSONB/README.md)**: Working with `jsonb`, GIN indexing, containment queries, and hybrid schemas.
- **[Assignment 3: Cloud Architecture Presentation](Assignment-3/README.md)**: Comparative presentation on AWS Lambda vs Google Cloud Run Functions (Serverless Architecture).

---

### 🐳 PBL (Project-Based Learning) — Production Containerization (`PBL/`)
**Location:** [PBL/README.md](PBL/README.md)  
A complete production-grade microservice architecture:
- **FastAPI Student API**: CRUD endpoints, GPA analytics, and Prometheus metrics.
- **Horizontal Scaling**: 2 replica containers (`fastapi-node-1` on port 8001, `fastapi-node-2` on port 8002).
- **Nginx Reverse Proxy / Load Balancer**: Distributes traffic across replicas on port `8080` using round-robin.
- **Automated Test Suite**: 10/10 automated tests (`automationTesting.py`).
- **CI/CD Pipeline**: GitHub Actions workflow for building and pushing images to Docker Hub.
