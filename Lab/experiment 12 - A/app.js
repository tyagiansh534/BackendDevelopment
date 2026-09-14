const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
  res.send('Welcome to Express Server!');
});

app.get('/text', (req, res) => {
  res.send('This is plain text response');
});

app.get('/html', (req, res) => {
  res.send('<h1>HTML Response</h1><p>This is HTML content</p>');
});

app.get('/json', (req, res) => {
  res.json({
    message: 'This is JSON response',
    status: 'success',
    data: { name: 'Student', course: 'Backend Development' }
  });
});

app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ message: 'User details', userId: userId });
});

app.get('/search', (req, res) => {
  const { q, page, limit } = req.query;
  res.json({
    searchQuery: q,
    page: page || 1,
    limit: limit || 10
  });
});

app.get('/calculate', (req, res) => {
  const { num1, num2, operation } = req.query;
  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);
  
  let result;
  switch(operation) {
    case 'add': result = n1 + n2; break;
    case 'subtract': result = n1 - n2; break;
    case 'multiply': result = n1 * n2; break;
    case 'divide': result = n2 !== 0 ? n1 / n2 : 'Error'; break;
    case 'modulus': result = n1 % n2; break;
    case 'power': result = Math.pow(n1, n2); break;
    default: result = 'Invalid operation';
  }
  
  res.json({ num1: n1, num2: n2, operation, result });
});

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  res.json({
    message: 'Registration successful',
    user: { username, email }
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'test@example.com' && password === 'password123') {
    res.json({
      success: true,
      message: 'Login successful',
      token: 'sample-jwt-token'
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
});

app.get('/home', (req, res) => {
  res.render('home', {
    title: 'Home Page',
    heading: 'Welcome to EJS Templating',
    message: 'EJS makes it easy to generate dynamic HTML'
  });
});

app.get('/users', (req, res) => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ];
  res.render('users', { users });
});

app.get('/profile/:id', (req, res) => {
  const user = {
    id: req.params.id,
    name: 'John Doe',
    email: 'john@example.com',
    age: 25,
    city: 'New York'
  };
  res.render('profile', { user });
});

// --- Lab Task 1: Basic Server ---
app.get('/task1/text', (req, res) => {
  res.send('Name: Student Name, Roll Number: 123456789, Branch: Computer Science');
});

app.get('/task1/html', (req, res) => {
  res.send('<h2>Student Details</h2><p><strong>Name:</strong> Student Name</p><p><strong>Roll Number:</strong> 123456789</p><p><strong>Branch:</strong> Computer Science</p>');
});

app.get('/task1/json', (req, res) => {
  res.json({
    name: 'Student Name',
    rollNumber: '123456789',
    branch: 'Computer Science'
  });
});

// --- Lab Task 3: Student Management ---
const labStudents = [];
let nextStudentId = 1;

app.get('/students', (req, res) => {
  res.json(labStudents);
});

app.get('/students/:id', (req, res) => {
  const student = labStudents.find(s => s.id === parseInt(req.params.id));
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

app.post('/students/add', (req, res) => {
  const { name, email, course } = req.body;
  const newStudent = { id: nextStudentId++, name, email, course };
  labStudents.push(newStudent);
  res.status(201).json({ message: 'Student added successfully', student: newStudent });
});

// --- Lab Task 4: EJS Template (Timetable) ---
app.get('/timetable', (req, res) => {
  const schedule = [
    { day: 'Monday', time: '10:00 AM - 12:00 PM', subject: 'Backend Development', faculty: 'Dr. Smith' },
    { day: 'Tuesday', time: '02:00 PM - 04:00 PM', subject: 'Database Systems', faculty: 'Prof. Johnson' },
    { day: 'Wednesday', time: '09:00 AM - 11:00 AM', subject: 'Cloud Computing', faculty: 'Dr. Brown' }
  ];
  res.render('timetable', { schedule });
});

// --- Lab Task 5: Form Handling ---
app.get('/student/register', (req, res) => {
  res.render('register');
});

app.post('/student/register', (req, res) => {
  const { name, email, course, semester } = req.body;
  res.render('result', { student: { name, email, course, semester } });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  GET  / - Welcome message');
  console.log('  GET  /text - Plain text');
  console.log('  GET  /html - HTML response');
  console.log('  GET  /json - JSON response');
  console.log('  GET  /user/:id - User by ID');
  console.log('  GET  /search?q=term - Search');
  console.log('  GET  /calculate?num1=10&num2=5&operation=add');
  console.log('  POST /register - Register user');
  console.log('  POST /login - Login user');
  console.log('  GET  /home - EJS home page');
  console.log('  GET  /users - Users list');
  console.log('  GET  /profile/:id - User profile');
});
