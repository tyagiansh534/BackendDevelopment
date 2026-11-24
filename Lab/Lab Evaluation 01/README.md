# Lab Evaluation 01: Eisenhower Todo Web Application

**Course:** Backend Development Laboratory (CSFS3008P)  
**Author:** Ansh Tyagi  
**SAP ID:** 590014867  

---

## 1. Overview
A full-stack, server-side rendered Task Management Web Application built with **Node.js**, **Express.js**, **EJS templates**, and **PostgreSQL**.

The application organizes tasks into the 4 quadrants of the **Eisenhower Matrix** based on **Urgency** and **Importance**.

---

## 🚀 Features

- **Eisenhower 4-Quadrant Grid View**:
  - **Q1: Do First** (*Urgent & Important*): Immediate, high-priority actions.
  - **Q2: Schedule** (*Not Urgent & Important*): Long-term strategic activities.
  - **Q3: Delegate** (*Urgent & Not Important*): Time-sensitive tasks that can be delegated or automated.
  - **Q4: Eliminate / Drop** (*Not Urgent & Not Important*): Distractions and low-value tasks.
- **Task Management (CRUD)**:
  - Add tasks with title, description, urgency, importance, due date, and category.
  - Form validation ensuring task titles cannot be empty.
  - Delete tasks with immediate database removal.
  - Edit existing tasks (*Bonus Feature*).
- **Bonus & Enhancement Features**:
  - **Category Filtering**: Filter tasks by tag/category (Work, Study, Personal, etc.).
  - **Keyword Search**: Instant search across titles and descriptions.
  - **Live Quadrant Indicator**: Dynamic feedback showing target quadrant as checkboxes are toggled.
  - **Due Date Tracking**: Set and display due dates for each task.
  - **Modern Glassmorphism UI**: Responsive CSS Grid layout with distinct quadrant accents and hover states.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Backend** | Node.js (v18+) with Express.js |
| **Template Engine** | EJS (Embedded JavaScript) |
| **Database** | PostgreSQL (using `pg` pool driver) |
| **Styling** | Vanilla CSS with CSS Grid & Custom Properties |
| **Configuration** | `dotenv` |

---

## ⚙️ Prerequisites & Database Setup

1. Ensure **Node.js** (v18 or newer) is installed.
2. Ensure **PostgreSQL** is running on your machine (default port `5432`).
3. Ensure the database specified in `.env` exists (default: `postgres`).

### Database Table Schema

The application automatically creates the `tasks` table on startup:

```sql
CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  is_urgent BOOLEAN DEFAULT FALSE,
  is_important BOOLEAN DEFAULT FALSE,
  due_date DATE,
  category VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📦 Installation & Execution Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create or verify the `.env` file in the root directory:
```env
PORT=3000
PGHOST=127.0.0.1
PGPORT=5432
PGUSER=postgres
PGPASSWORD=postgres
PGDATABASE=postgres
```
*(Adjust `PGUSER`, `PGPASSWORD`, or `PGDATABASE` to match your local PostgreSQL / pgAdmin configuration if different).*

### 3. Start the Application
```bash
npm start
```
Or for development mode with automatic reload:
```bash
npm run dev
```

### 4. Access the Application
Open your web browser and navigate to:
```
http://localhost:3000
```

---

## 🛣️ Application Routes

| HTTP Method | Route | Description |
| :--- | :--- | :--- |
| `GET` | `/` or `/tasks` | Display Eisenhower Matrix with all tasks |
| `GET` | `/tasks/new` | Display form to create a new task |
| `POST` | `/tasks` | Validate and insert new task into PostgreSQL |
| `GET` | `/tasks/:id/edit` | Display edit task form *(Bonus)* |
| `POST` | `/tasks/:id/edit` | Update task in PostgreSQL *(Bonus)* |
| `POST` | `/tasks/:id/delete` | Delete task by ID from PostgreSQL |

---

## 📁 Project Structure

```
├── .env                  # Environment configuration
├── .env.example          # Sample environment configuration
├── db.js                 # PostgreSQL connection pool & table initializer
├── package.json          # Project metadata and dependencies
├── public/
│   └── css/
│       └── style.css     # CSS Grid matrix styling & design system
├── README.md             # Documentation and instructions
├── server.js             # Express server and route handlers
└── views/
    ├── edit.ejs          # Edit task view
    ├── error.ejs         # Error display view
    ├── index.ejs         # Eisenhower Matrix 4-quadrant view
    ├── new.ejs           # Add new task view
    └── partials/
        ├── footer.ejs    # Shared footer component
        └── header.ejs    # Shared header & navigation component
```
