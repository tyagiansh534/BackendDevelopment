const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

const students = [
  { id: 1, name: "Aarav", course: "Backend Development" },
  { id: 2, name: "Diya", course: "Backend Development" },
  { id: 3, name: "Ansh Tyagi", course: "Backend Development (590014867)" }
];

app.get("/", (req, res) => {
  res.json({
    message: "Student API is running (Express in Docker)",
    framework: "Express.js",
    author: "Ansh Tyagi (SAP ID: 590014867)"
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

app.get("/students", (req, res) => {
  res.json(students);
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Express API listening on port ${port}`);
});
