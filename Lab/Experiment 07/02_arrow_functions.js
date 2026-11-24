// Experiment 07 & 08: Part A - 3.2 Arrow Functions

// Traditional function
function addTraditional(a, b) {
    return a + b;
}
console.log("addTraditional(3, 4):", addTraditional(3, 4));

// Arrow function
const add = (a, b) => a + b;

// Single parameter — parentheses optional
const square = x => x * x;

// No parameters
const greet = () => "Hello!";

// Multi-line arrow function
const multiply = (a, b) => {
    const result = a * b;
    return result;
};

console.log("add(3, 4):", add(3, 4)); // 7
console.log("square(5):", square(5)); // 25
console.log("greet():", greet()); // "Hello!"
console.log("multiply(4, 5):", multiply(4, 5)); // 20
