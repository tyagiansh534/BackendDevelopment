# Experiment 10: Programs to Familiarize jQuery

**Course:** Backend Development Laboratory (CSFS3008P)  
**Author:** Ansh Tyagi  
**SAP ID:** 590014867  

---

## 1. Objective
To familiarize with **jQuery** syntax, selectors, DOM manipulation methods, visual animations, and asynchronous data exchange via jQuery AJAX utilities.

---

## 2. Implemented Programs

### Program 1: jQuery DOM Manipulation, Selectors & Visual Effects
- **Selectors:** ID, class, and element selectors (`$("#targetBox")`, `$(".card")`).
- **Class & Style Manipulation:** `.toggleClass()`, `.removeClass()`, `.css()`.
- **Content & Structure:** `.text()`, `.html()`, `.append()`, `.empty()`.
- **Animations / Effects:** `.fadeToggle()`, `.slideToggle()`, `.show()`.

### Program 2: jQuery AJAX Asynchronous Data Retrieval
- **Core AJAX:** `$.ajax()` with `method: "GET"`, `dataType: "json"`, `success`, and `error` callbacks.
- **Shorthand Utility:** `$.getJSON()` with `.done()` and `.fail()` promises.
- **Error Handling:** Graceful HTTP 404 / network fault interception and user feedback display.

---

## 3. Directory Structure

```
Experiment 10/
├── index.html          # Dual-card presentation for both jQuery programs
├── style.css           # Styling for interactive controls and table
├── app.js              # Complete jQuery implementation for Program 1 & Program 2
├── students.json       # Mock JSON data source
└── README.md           # Experiment documentation
```

---

## 4. How to Run
Open `index.html` in a web browser using VS Code Live Server.
- Click Program 1 controls to test dynamic effects and DOM mutation.
- Click Program 2 buttons to trigger `$.ajax()` and `$.getJSON()` asynchronous data queries.
