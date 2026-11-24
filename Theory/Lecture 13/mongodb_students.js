// ============================================================================
// Lecture 13: MongoDB Student Management Document Database (mongosh)
// Course: Backend Development (Theory Unit 2 L13)
// Author: Ansh Tyagi | SAP ID: 590014867
// ============================================================================

use student_management_db;

db.students.drop();

// Ingest documents with embedded and referenced structures
db.students.insertMany([
  {
    student_id: 1,
    name: "Ansh Tyagi",
    email: "tyagiansh534@gmail.com",
    gpa: 9.15,
    department: {
      code: "CSE",
      name: "Computer Science and Engineering",
      building: "Block 1"
    },
    enrollments: [
      { course_code: "CSFS3008", title: "Backend Development", credits: 4, grade: "A+" },
      { course_code: "CSFS3002", title: "Data Structures & Algorithms", credits: 4, grade: "A" }
    ]
  },
  {
    student_id: 2,
    name: "Aarav Sharma",
    email: "aarav@example.com",
    gpa: 8.50,
    department: {
      code: "CSE",
      name: "Computer Science and Engineering",
      building: "Block 1"
    },
    enrollments: [
      { course_code: "CSFS3008", title: "Backend Development", credits: 4, grade: "B+" }
    ]
  },
  {
    student_id: 3,
    name: "Meera Patel",
    email: "meera@example.com",
    gpa: 9.20,
    department: {
      code: "IT",
      name: "Information Technology",
      building: "Block 2"
    },
    enrollments: [
      { course_code: "CSIX2001", title: "Database Management Systems", credits: 3, grade: "A+" }
    ]
  }
]);

// Query 1: Find high-performing students (GPA >= 9.0)
db.students.find(
  { gpa: { $gte: 9.0 } },
  { name: 1, gpa: 1, "department.code": 1 }
);

// Query 2: Find all students taking CSFS3008
db.students.find(
  { "enrollments.course_code": "CSFS3008" },
  { name: 1, "enrollments.$": 1 }
);

// Query 3: Aggregation pipeline for average GPA per department
db.students.aggregate([
  {
    $group: {
      _id: "$department.name",
      totalStudents: { $sum: 1 },
      avgGpa: { $avg: "$gpa" }
    }
  }
]);
