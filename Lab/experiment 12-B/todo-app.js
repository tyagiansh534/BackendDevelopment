const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'todo-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Route: View To-Dos
app.get('/', (req, res) => {
    // Initialize todos array for this session if it doesn't exist
    if (!req.session.todos) {
        req.session.todos = [];
    }

    // Read theme from cookie (default to 'light' if not set)
    const theme = req.cookies['theme'] || 'light';
    const bgColor = theme === 'dark' ? '#333' : '#fff';
    const textColor = theme === 'dark' ? '#fff' : '#000';

    // Generate HTML String
    let html = `
    <html>
    <head>
        <title>Session To-Do List</title>
        <style>
            body { background-color: ${bgColor}; color: ${textColor}; font-family: Arial, sans-serif; padding: 20px; }
            form { margin-bottom: 20px; }
            ul { list-style-type: none; padding: 0; }
            li { padding: 10px 0; border-bottom: 1px solid #ccc; display: flex; justify-content: space-between; max-width: 400px; }
            button { margin-left: 10px; cursor: pointer; }
        </style>
    </head>
    <body>
        <h1>My To-Do List</h1>
        
        <!-- Add To-Do Form -->
        <form action="/add" method="POST">
            <input type="text" name="todoItem" placeholder="New to-do item" required>
            <button type="submit">Add</button>
        </form>

        <!-- List To-Dos -->
        <ul>`;

    req.session.todos.forEach((item, index) => {
        html += `
            <li>
                ${item}
                <form action="/delete/${index}" method="POST" style="display:inline; margin:0;">
                    <button type="submit">Delete</button>
                </form>
            </li>`;
    });

    html += `
        </ul>

        <hr style="margin-top:40px;">
        
        <!-- Theme Toggle Form (Optional Challenge) -->
        <form action="/theme" method="POST">
            <label>Theme Preference:</label>
            <select name="theme">
                <option value="light" ${theme === 'light' ? 'selected' : ''}>Light Mode</option>
                <option value="dark" ${theme === 'dark' ? 'selected' : ''}>Dark Mode</option>
            </select>
            <button type="submit">Save Theme</button>
        </form>

    </body>
    </html>
    `;

    res.send(html);
});

// Route: Add To-Do
app.post('/add', (req, res) => {
    if (!req.session.todos) req.session.todos = [];
    if (req.body.todoItem) {
        req.session.todos.push(req.body.todoItem);
    }
    res.redirect('/');
});

// Route: Delete To-Do
app.post('/delete/:id', (req, res) => {
    if (req.session.todos) {
        const id = parseInt(req.params.id);
        req.session.todos = req.session.todos.filter((item, index) => index !== id);
    }
    res.redirect('/');
});

// Route: Save Theme Cookie
app.post('/theme', (req, res) => {
    const selectedTheme = req.body.theme;
    res.cookie('theme', selectedTheme, { maxAge: 900000 }); // 15 minutes
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('To-Do App Server running on http://localhost:3000');
});
