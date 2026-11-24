// Experiment 07 & 08: Part A - 3.1 let and const

// var — function-scoped, can be redeclared
var x = 10;
var x = 20; // allowed
console.log("var x:", x);

// let — block-scoped, cannot be redeclared in same scope
let y = 10;
// let y = 20; // Error: Identifier 'y' has already been declared
console.log("let y:", y);

// const — block-scoped, cannot be reassigned
const z = 30;
// z = 40; // Error: Assignment to constant variable
console.log("const z:", z);

// Block scope demonstration
if (true) {
    let blockVar = "inside";
    var funcVar = "outside";
    console.log("Inside block, blockVar:", blockVar);
}
// console.log(blockVar); // ReferenceError: blockVar is not defined
console.log("funcVar:", funcVar); // "outside"
