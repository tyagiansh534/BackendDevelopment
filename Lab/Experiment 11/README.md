# Experiment 11: Interactive Website Using HTML, CSS, JavaScript, and AJAX

**Course:** Backend Development Laboratory (CSFS3008P)  
**Course Outcomes:** CO2, CO3  
**Author:** Ansh Tyagi  
**SAP ID:** 590014867  

---

## 1. Objective
To design and build an interactive web portal using **HTML5, CSS3, JavaScript (ES6+), and AJAX** demonstrating:
1. Dynamic, asynchronous data consumption from both **JSON** and **XML** sources.
2. In-memory live search and multi-attribute filtering without full-page reloads.
3. Separation of presentation, application logic, and data layers.
4. On-demand course catalog fetching and responsive user interface design.

---

## 2. Directory Structure

```
Experiment 11/
├── index.html          # Interactive Academic Portal dashboard
├── style.css           # Responsive modern CSS layout and styling
├── app.js              # State management, AJAX Fetch requests, filtering and rendering
├── students.json       # JSON data source for students
├── students.xml        # XML data source for students
├── courses.json        # Course catalog data source
└── README.md           # Experiment documentation
```

---

## 3. Key Features
- **Dual Data Source Toggle:** Switch between JSON and XML endpoints with live status indicators.
- **Instant Search & Filter:** Filter by student name, ID, email, or department dropdown.
- **Computed Dashboard Metrics:** Real-time calculation of total students, average GPA, and active enrollment count.
- **Tabbed Navigation:** Seamless switching between Student Directory, Courses Catalog, and Architecture documentation.

---

## 4. How to Run
1. Open this directory in VS Code.
2. Launch `index.html` via **Live Server**.
3. Use the search bar, department filter, and data source toggle buttons to explore live AJAX requests.
