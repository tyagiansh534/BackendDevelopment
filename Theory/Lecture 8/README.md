# Lecture 8: Server-Side Rendering and Static Content

**Course:** Backend Development (CSFS3008) — Theory Unit 1  
**Author:** Ansh Tyagi  
**SAP ID:** 590014867  

---

## 1. Overview
This experiment demonstrates **Server-Side Rendering (SSR)** and **Static Asset Management** across two major backend ecosystems:
1. **Node.js + Express + EJS** (`Part-B-Node-Express-EJS`)
2. **Python + FastAPI + Jinja2** (`Part-C-FastAPI-Jinja2`)
3. **Shared Static Content** (`Part-D-Static-Content`)

---

## 2. Directory Structure

```
Lecture 8/
├── README.md
├── Part-B-Node-Express-EJS/         # Node.js + Express SSR
│   ├── app.js                       # Express routes and EJS engine configuration
│   ├── package.json
│   └── views/
│       ├── index.ejs                # Home view
│       └── students.ejs             # Iterative table view
├── Part-C-FastAPI-Jinja2/           # Python FastAPI SSR
│   ├── main.py                      # FastAPI app with Jinja2Templates
│   └── templates/
│       └── index.html               # Jinja2 template with loops
└── Part-D-Static-Content/           # Shared static assets
    └── public/
        └── css/
            └── style.css            # Stylesheet served via express.static / StaticFiles
```

---

## 3. How to Run

### Part B: Node.js + Express + EJS
```bash
cd "Theory/Lecture 8/Part-B-Node-Express-EJS"
npm install
node app.js
```
Open `http://localhost:3000/`

### Part C: Python FastAPI + Jinja2
```bash
cd "Theory/Lecture 8/Part-C-FastAPI-Jinja2"
py -m pip install fastapi uvicorn jinja2
py main.py
```
Open `http://127.0.0.1:8000/`
