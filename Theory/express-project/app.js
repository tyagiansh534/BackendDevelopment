const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// In-memory data store
let items = [
    { id: 1, name: "Introduction to Express.js", status: "completed" },
    { id: 2, name: "Routing and Middleware", status: "in-progress" }
];

// Routes
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to Express Project API",
        author: "Ansh Tyagi",
        sapId: "590014867",
        endpoints: ["GET /api/items", "POST /api/items"]
    });
});

app.get('/api/items', (req, res) => {
    res.json({ count: items.length, data: items });
});

app.post('/api/items', (req, res) => {
    const { name, status } = req.body;
    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }
    const newItem = {
        id: items.length + 1,
        name,
        status: status || "pending"
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
});
