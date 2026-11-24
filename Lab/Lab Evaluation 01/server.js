require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Database Table
db.initDB();

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Helper to format date
app.locals.formatDate = (dateString) => {
  if (!dateString) return null;
  const d = new Date(dateString);
  return isNaN(d) ? null : d.toISOString().split('T')[0];
};

app.locals.displayDate = (dateString) => {
  if (!dateString) return null;
  const d = new Date(dateString);
  return isNaN(d) ? null : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// -------------------------------------------------------------
// ROUTES
// -------------------------------------------------------------

// 1. GET / and /tasks - Display Eisenhower Matrix
app.get(['/', '/tasks'], async (req, res) => {
  try {
    const selectedCategory = req.query.category || '';
    const searchQuery = req.query.search || '';

    let queryText = 'SELECT * FROM tasks';
    const params = [];
    const conditions = [];

    if (selectedCategory) {
      params.push(selectedCategory);
      conditions.push(`category = $${params.length}`);
    }

    if (searchQuery) {
      params.push(`%${searchQuery}%`);
      conditions.push(`(title ILIKE $${params.length} OR description ILIKE $${params.length})`);
    }

    if (conditions.length > 0) {
      queryText += ' WHERE ' + conditions.join(' AND ');
    }

    queryText += ' ORDER BY created_at DESC';

    const result = await db.query(queryText, params);
    const allTasks = result.rows;

    // Fetch all distinct categories for filter dropdown
    const catResult = await db.query('SELECT DISTINCT category FROM tasks WHERE category IS NOT NULL AND category != \'\' ORDER BY category ASC');
    const categories = catResult.rows.map(r => r.category);

    // Eisenhower Matrix segregation
    const matrix = {
      q1_do: allTasks.filter(t => t.is_urgent && t.is_important),
      q2_schedule: allTasks.filter(t => !t.is_urgent && t.is_important),
      q3_delegate: allTasks.filter(t => t.is_urgent && !t.is_important),
      q4_eliminate: allTasks.filter(t => !t.is_urgent && !t.is_important),
    };

    const stats = {
      total: allTasks.length,
      q1: matrix.q1_do.length,
      q2: matrix.q2_schedule.length,
      q3: matrix.q3_delegate.length,
      q4: matrix.q4_eliminate.length,
    };

    res.render('index', {
      matrix,
      stats,
      categories,
      selectedCategory,
      searchQuery,
      totalCount: allTasks.length,
    });
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).render('error', { error: 'Failed to load tasks from database.' });
  }
});

// 2. GET /tasks/new - Show form to create a task
app.get('/tasks/new', (req, res) => {
  res.render('new', { error: null, formData: {} });
});

// 3. POST /tasks - Create a new task with validation
app.post('/tasks', async (req, res) => {
  const { title, description, isUrgent, isImportant, due_date, category } = req.body;

  // Validation: Check that title is not empty
  if (!title || !title.trim()) {
    return res.status(400).render('new', {
      error: 'Task title is required and cannot be empty.',
      formData: req.body,
    });
  }

  const isUrgentBool = isUrgent === 'on' || isUrgent === 'true' || isUrgent === true;
  const isImportantBool = isImportant === 'on' || isImportant === 'true' || isImportant === true;
  const dueDateVal = due_date && due_date.trim() !== '' ? due_date : null;
  const categoryVal = category && category.trim() !== '' ? category.trim() : null;

  try {
    const insertQuery = `
      INSERT INTO tasks (title, description, is_urgent, is_important, due_date, category, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)
      RETURNING *;
    `;
    await db.query(insertQuery, [
      title.trim(),
      description ? description.trim() : '',
      isUrgentBool,
      isImportantBool,
      dueDateVal,
      categoryVal,
    ]);

    res.redirect('/tasks');
  } catch (err) {
    console.error('Error inserting task:', err);
    res.status(500).render('new', {
      error: 'Failed to save task to database: ' + err.message,
      formData: req.body,
    });
  }
});

// 4. GET /tasks/:id/edit - (Bonus) Show edit form
app.get('/tasks/:id/edit', async (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  if (isNaN(taskId)) {
    return res.status(400).redirect('/tasks');
  }

  try {
    const result = await db.query('SELECT * FROM tasks WHERE id = $1', [taskId]);
    if (result.rows.length === 0) {
      return res.status(404).render('error', { error: 'Task not found.' });
    }

    res.render('edit', { task: result.rows[0], error: null });
  } catch (err) {
    console.error('Error fetching task for edit:', err);
    res.status(500).render('error', { error: 'Failed to retrieve task.' });
  }
});

// 5. POST /tasks/:id/edit - (Bonus) Update an existing task
app.post('/tasks/:id/edit', async (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const { title, description, isUrgent, isImportant, due_date, category } = req.body;

  if (isNaN(taskId)) {
    return res.status(400).redirect('/tasks');
  }

  if (!title || !title.trim()) {
    return res.status(400).render('edit', {
      task: { id: taskId, ...req.body },
      error: 'Task title is required and cannot be empty.',
    });
  }

  const isUrgentBool = isUrgent === 'on' || isUrgent === 'true' || isUrgent === true;
  const isImportantBool = isImportant === 'on' || isImportant === 'true' || isImportant === true;
  const dueDateVal = due_date && due_date.trim() !== '' ? due_date : null;
  const categoryVal = category && category.trim() !== '' ? category.trim() : null;

  try {
    const updateQuery = `
      UPDATE tasks
      SET title = $1, description = $2, is_urgent = $3, is_important = $4, due_date = $5, category = $6
      WHERE id = $7;
    `;
    await db.query(updateQuery, [
      title.trim(),
      description ? description.trim() : '',
      isUrgentBool,
      isImportantBool,
      dueDateVal,
      categoryVal,
      taskId,
    ]);

    res.redirect('/tasks');
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).render('edit', {
      task: { id: taskId, ...req.body },
      error: 'Failed to update task: ' + err.message,
    });
  }
});

// 6. POST /tasks/:id/delete - Delete task
app.post('/tasks/:id/delete', async (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  if (isNaN(taskId)) {
    return res.status(400).redirect('/tasks');
  }

  try {
    await db.query('DELETE FROM tasks WHERE id = $1', [taskId]);
    res.redirect('/tasks');
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).render('error', { error: 'Failed to delete task: ' + err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` Eisenhower Todo Server is running on http://localhost:${PORT}`);
  console.log(` Connected to PostgreSQL on ${process.env.PGHOST || '127.0.0.1'}:${process.env.PGPORT || 5432}`);
  console.log(`====================================================`);
});
