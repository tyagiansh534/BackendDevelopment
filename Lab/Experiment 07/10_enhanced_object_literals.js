// Experiment 07 & 08: Part A - 3.10 Enhanced Object Literals

const name = "Alice";
const age = 25;

// Shorthand property
const person = { name, age };
console.log("person:", person);

// Shorthand method
const calculator = {
    add(a, b) { return a + b; },
    subtract(a, b) { return a - b; }
};
console.log("calculator.add(5, 3):", calculator.add(5, 3));
console.log("calculator.subtract(5, 3):", calculator.subtract(5, 3));

// Computed property names
const key = "dynamicKey";
const obj = { [key]: "value" };
console.log("obj.dynamicKey:", obj.dynamicKey); // "value"
