require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/todos', require('./routes/todos'));

app.get('/', (req, res) => {
  res.json({
    message: 'Express + Mongoose User Registration, Login & Todo API is running...',
    author: 'Ansh Tyagi (SAP ID: 590014867)',
    endpoints: {
      auth: ['POST /api/auth/register', 'POST /api/auth/login'],
      todos: ['GET /api/todos', 'POST /api/todos', 'GET /api/todos/:id', 'PUT /api/todos/:id', 'DELETE /api/todos/:id']
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

module.exports = app;
