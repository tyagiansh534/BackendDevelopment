// Experiment 07 & 08: Part A - 3.5 Spread and Rest Operators (...)

// Spread — expand array/object
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log("combined:", combined); // [1, 2, 3, 4, 5, 6]

// Copy array
const copy = [...arr1];
console.log("copy:", copy);

// Spread in objects
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };
console.log("obj2:", obj2); // { a: 1, b: 2, c: 3 }

// Rest — collect remaining arguments
function sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
}
console.log("sum(1, 2, 3, 4):", sum(1, 2, 3, 4)); // 10

// Rest in destructuring
const [head, ...tail] = [10, 20, 30, 40];
console.log("head:", head); // 10
console.log("tail:", tail); // [20, 30, 40]
