// ============================================================================
// Lab Experiment 05 - Task 2: Advanced JavaScript Methods
// Course: Backend Development Laboratory (CSFS3008P)
// Author: Ansh Tyagi | SAP ID: 590014867
// ============================================================================

// --- String Methods ---
const str = "Backend Development Laboratory";
console.log("--- String Methods ---");
console.log("Original string:", str);
console.log("Upper Case (toUpperCase):", str.toUpperCase());
console.log("Lower Case (toLowerCase):", str.toLowerCase());

// split(): Splits string into array by delimiter
const words = str.split(" ");
console.log("Split by space into array:", words);

// --- Array Methods (Add, Read, Update, Delete) ---
console.log("\n--- Array Methods ---");
let items = ['Node', 'Express'];
console.log("Initial array:", items);

// Add: push() adds element to end of array
items.push('MongoDB');
console.log("After Adding (push):", items);

// Read: Accessing element by index
console.log("First Item (Index 0):", items[0]);
console.log("Second Item (Index 1):", items[1]);

// Update: Modifying an element by index
items[0] = 'Node.js';
console.log("After Updating Index 0:", items);

// Delete/Remove: pop() removes the last element
const removed = items.pop();
console.log(`Removed element (${removed}), Array now:`, items);

// --- Object Methods (Add, Read, Update) ---
console.log("\n--- Object Methods ---");
let user = { name: "Ansh Tyagi", role: "Backend Developer" };
console.log("Initial user object:", user);

// Add: Adding a new key-value pair
user.age = 21;
user.framework = "Express.js";
console.log("After Adding Keys:", user);

// Read: Accessing value using dot notation and bracket notation
console.log("User Name (Dot notation):", user.name);
console.log("Role (Bracket notation):", user["role"]);

// Update: Modifying an existing value
user.role = "Lead Backend Engineer";
console.log("After Updating Role:", user);

if (typeof module !== 'undefined') {
    module.exports = { str, items, user };
}
