const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware for parsing URL-encoded bodies and serving static assets
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../Part-D-Static-Content/public')));

// Sample student dataset
const students = [
    { id: 1, name: "Ansh Tyagi", sapId: "590014867", course: "B.Tech CSE", gpa: 9.1 },
    { id: 2, name: "Meera Patel", sapId: "590014868", course: "B.Tech IT", gpa: 8.8 },
    { id: 3, name: "Kabir Singh", sapId: "590014869", course: "B.Tech CSE", gpa: 8.5 }
];

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        title: "Home | Lecture 8 SSR Demo",
        heading: "Server-Side Rendering with Express & EJS",
        author: "Ansh Tyagi",
        sapId: "590014867"
    });
});

app.get('/students', (req, res) => {
    res.render('students', {
        title: "Student Directory | SSR",
        students: students
    });
});

app.listen(PORT, () => {
    console.log(`Lecture 8 EJS Server running on http://localhost:${PORT}`);
});
