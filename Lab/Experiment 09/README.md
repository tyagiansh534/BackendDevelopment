# Experiment 09: Programs Using AJAX with HTML, XML, and JSON Data

**Course:** Backend Development Laboratory (CSFS3008P)  
**Author:** Ansh Tyagi  
**SAP ID:** 590014867  

---

## 1. Objective
To understand and implement **Asynchronous JavaScript and XML (AJAX)** using modern JavaScript (`fetch`, `async`/`await`), and demonstrate dynamic data exchange with:
- **JSON** (`students.json` with `response.json()`)
- **XML** (`students.xml` with `response.text()` and `DOMParser`)
- **HTML fragments** (`notice.html` dynamically injected into the DOM)

---

## 2. Directory Structure

```
Experiment 09/
├── index.html          # Web interface for AJAX operations
├── style.css           # Modern stylesheet
├── app.js              # Fetch API request logic and DOM manipulation
├── students.json       # JSON data interchange format
├── students.xml        # Hierarchical XML data source
├── notice.html         # Asynchronous HTML snippet
└── README.md           # Experiment documentation
```

---

## 3. How to Run
Run via a local HTTP web server (e.g., Live Server in VS Code):
1. Right-click `index.html` > **Open with Live Server**.
2. Click **Fetch JSON Students** to parse and display structured student JSON.
3. Click **Fetch XML Students** to retrieve XML and parse nodes via `DOMParser`.
4. Click **Fetch HTML Notice** to demonstrate asynchronous partial HTML page updates.
5. Inspect the Network tab in DevTools (**F12**) to observe HTTP status codes, response headers, and payloads.
