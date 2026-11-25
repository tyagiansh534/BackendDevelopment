const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory student records
const students = [
    { id: 1, name: "Aarav", branch: "CSE", rollNo: 1 },
    { id: 2, name: "Diya", branch: "ECE", rollNo: 2 },
    { id: 3, name: "Rohan", branch: "IT", rollNo: 3 }
];

// Task 1: Root endpoint
app.get("/", (req, res) => {
    res.send("<h1>Student Management API</h1><p>Backend Server Running (Express.js)</p>");
});

// Task 2 & 3: List all students (JSON)
app.get("/students", (req, res) => {
    res.json({
        success: true,
        count: students.length,
        students: students
    });
});

// Task 2 & 3: Get student by ID
app.get("/students/:id", (req, res) => {
    const studentId = parseInt(req.params.id, 10);
    const student = students.find(s => s.id === studentId);
    if (student) {
        res.json({ success: true, student });
    } else {
        res.status(404).json({ success: false, error: "Student not found" });
    }
});

// Task 4: HTML formatted view
app.get("/view/students", (req, res) => {
    const studentListHtml = students
        .map(s => `<li><strong>${s.name}</strong> - Branch: ${s.branch} (Roll: ${s.rollNo})</li>`)
        .join("");
    res.send(`
        <!DOCTYPE html>
        <html>
        <head><title>Student Directory</title></head>
        <body>
            <h2>Student Directory</h2>
            <ul>${studentListHtml}</ul>
            <p><a href="/">Back to Home</a></p>
        </body>
        </html>
    `);
});

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ status: "healthy", timestamp: new Date().toISOString() });
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Express server running at http://localhost:${PORT}`);
    });
}

module.exports = app;
