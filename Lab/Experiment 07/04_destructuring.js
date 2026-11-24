// Experiment 07 & 08: Part A - 3.4 Destructuring

// Array destructuring
const colors = ["red", "green", "blue"];
const [first, second, third] = colors;
console.log("first:", first);   // "red"
console.log("second:", second); // "green"
console.log("third:", third);   // "blue"

// Skip elements
const [, , thirdColor] = colors;
console.log("thirdColor:", thirdColor); // "blue"

// Object destructuring
const person = { name: "Bob", age: 30, city: "Mumbai" };
const { name, age } = person;
console.log("name:", name); // "Bob"
console.log("age:", age);   // 30

// Renaming
const { name: fullName } = person;
console.log("fullName:", fullName); // "Bob"

// Default values
const { country = "India" } = person;
console.log("country:", country); // "India"
