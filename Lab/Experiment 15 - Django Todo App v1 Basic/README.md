# Experiment 15: Django To-Do Application (v1 Basic)

**Course:** Backend Development Laboratory (CSFS3008P)  
**Author:** Ansh Tyagi  
**SAP ID:** 590014867  

---

## 1. Objective
To install, set up, and develop a full-featured, database-driven **To-Do Application** using the **Django** web framework (MVT architecture) and an **SQLite** database.

---

## 2. Architecture & Concepts Implemented

- **Model-View-Template (MVT):**
  - **Model (`todo/models.py`):** `Task` model with `title` (CharField), `completed` (BooleanField), and `created_at` (DateTimeField).
  - **Views (`todo/views.py`):** Functions handling task listing (`task_list`), creation (`add_task`), status toggling (`toggle_task`), and deletion (`delete_task`).
  - **Templates (`todo/templates/todo/`):** Modular templates showcasing template inheritance (`extends 'todo/base.html'`) and partial inclusions (`include 'todo/navbar.html'`).
  - **Static Files (`todo/static/todo/`):** Custom CSS loaded via `load static`.
- **Django ORM & Migrations:** Schema generated using `makemigrations` and applied with `migrate`.
- **Admin Interface (`todo/admin.py`):** Model registered with custom filters and search capabilities.

---

## 3. Directory Structure

```
Experiment 15 - Django Todo App v1 Basic/
├── manage.py                        # Django administrative CLI
├── db.sqlite3                       # SQLite database
├── README.md                        # Documentation
│
├── todo_project/                    # Project root package
│   ├── __init__.py
│   ├── settings.py                  # Project settings (INSTALLED_APPS, static, database)
│   ├── urls.py                      # Root URL router
│   ├── asgi.py
│   └── wsgi.py
│
└── todo/                            # Django Application
    ├── __init__.py
    ├── admin.py                     # Django Admin registration
    ├── apps.py
    ├── models.py                    # Task database model
    ├── views.py                     # CRUD business logic
    ├── urls.py                      # App-level routing
    ├── migrations/                  # Database migration files
    │   ├── __init__.py
    │   └── 0001_initial.py
    ├── templates/todo/              # HTML Templates
    │   ├── base.html                # Base layout
    │   ├── navbar.html              # Modular navbar component
    │   ├── task_list.html           # Task listing & actions
    │   └── add_task.html            # Task creation form
    └── static/todo/                 # Static Assets
        └── style.css                # Application styling
```

---

## 4. How to Run

### Step 1: Navigate to directory
```bash
cd "Lab/Experiment 15 - Django Todo App v1 Basic"
```

### Step 2: Run Database Migrations (if needed)
```bash
py manage.py makemigrations
py manage.py migrate
```

### Step 3: Start the Development Server
```bash
py manage.py runserver
```

### Step 4: Open in Browser
Visit `http://127.0.0.1:8000/` to use the To-Do application.
Visit `http://127.0.0.1:8000/admin/` to access the Django administration dashboard.
