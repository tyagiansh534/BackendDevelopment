# Experiment 13 B: Express + Mongoose User Registration, Login & Todo App

**Course Outcome:** Build full user authentication, JWT authorization, and MongoDB document relationships.  
**Author:** Ansh Tyagi (SAP ID: 590014867)

---

## 1. Overview
This experiment implements a full-featured backend with **Express.js**, **Mongoose (MongoDB)**, and **JWT authentication**:
- **Mongoose Schema & Models**:
  - `User`: Username, email, hashed password (using `bcryptjs` pre-save hook), and instance method `comparePassword`.
  - `Todo`: Linked to user (`ref: 'User'`), title, description, priority (`low`, `medium`, `high`), completed flag, and timestamps.
- **Authentication Routes (`/api/auth`)**:
  - `POST /register`: Registers user, hashes password, returns JWT token.
  - `POST /login`: Validates credentials, returns JWT token.
- **Protected Todo CRUD Routes (`/api/todos`)**:
  - Uses JWT verification middleware `middleware/auth.js`.
  - `GET /api/todos`: Fetch user's todos.
  - `POST /api/todos`: Create a new todo.
  - `GET /api/todos/:id`: Retrieve single todo.
  - `PUT /api/todos/:id`: Update completion status, title, priority.
  - `DELETE /api/todos/:id`: Remove todo.

---

## 2. Directory Structure
```
Experiment 13 B - Express Mongoose Todo App/
├── config/
│   └── db.js            # Mongoose MongoDB connection
├── models/
│   ├── User.js          # User schema with bcrypt pre-save hook
│   └── Todo.js          # Todo schema with User relation
├── middleware/
│   └── auth.js          # JWT header extraction and verification
├── routes/
│   ├── auth.js          # Registration and Login routes
│   └── todos.js         # Protected Todo CRUD endpoints
├── server.js            # Main Express entry point
├── package.json
├── .env.example
└── README.md
```

---

## 3. How to Run

### Install Dependencies
```bash
npm install
```

### Start Server
```bash
npm start
```
Server runs at `http://localhost:3000`.
