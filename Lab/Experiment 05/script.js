// ============================================================================
// Lab Experiment 05 - Task 1: Basic JavaScript (Arrays, Objects, Functions)
// Course: Backend Development Laboratory (CSFS3008P)
// Author: Ansh Tyagi | SAP ID: 590014867
// ============================================================================

// 1. Arrays Demonstration
const fruits = ['Apple', 'Banana', 'Mango'];
console.log('--- Array Demonstration ---');
console.log('Fruits array:', fruits);
fruits.push('Orange');
console.log('After push:', fruits);

// 2. Objects Demonstration
const student = {
    name: 'Ansh Tyagi',
    sapId: '590014867',
    age: 21,
    course: 'Backend Development'
};
console.log('\n--- Object Demonstration ---');
console.log('Student object:', student);
console.log('Student Name:', student.name);
console.log('SAP ID:', student.sapId);

// 3. Functions Demonstration
function greet(name) {
    return `Hello, ${name}! Welcome to Backend Development Lab.`;
}

console.log('\n--- Function Demonstration ---');
console.log(greet(student.name));

// Export for module reuse if needed
if (typeof module !== 'undefined') {
    module.exports = { fruits, student, greet };
}
