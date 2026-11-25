# Lecture 03: Setting Up the Backend Environment

**Course Outcome:** CO1 – Understand HTTP fundamentals and set up a working backend development environment.  
**Author:** Ansh Tyagi (SAP ID: 590014867)

---

## 1. Overview
This lecture covers the foundational concepts of backend development and HTTP:
- **HTTP Request-Response Cycle**: Request method, headers, URL, body, status codes.
- **HTTP Methods**: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
- **Status Codes**: 
  - `200 OK`, `201 Created`
  - `400 Bad Request`, `404 Not Found`
  - `500 Internal Server Error`
- **Environment Setup**: Running server applications in Node.js (Express) and Python (Flask).

---

## 2. Directory Structure
```
Lecture 3/
├── express-demo/
│   ├── package.json
│   └── server.js
├── flask-demo/
│   ├── app.py
│   └── requirements.txt
└── README.md
```

---

## 3. Running and Testing

### Express.js Server (Port 3000)
```bash
cd express-demo
npm install
node server.js
```
- Home: `http://localhost:3000/`
- JSON Students: `http://localhost:3000/students`
- Single Student: `http://localhost:3000/students/1`
- HTML View: `http://localhost:3000/view/students`

### Flask Server (Port 5000)
```bash
cd flask-demo
py app.py
```
- Home: `http://127.0.0.1:5000/`
- Students: `http://127.0.0.1:5000/students`
- Single Student: `http://127.0.0.1:5000/students/1`
