// Experiment 07 & 08: Part A - 3.3 Template Literals

const name = "Alice";
const age = 25;

// Old way
const msg1 = "Hello, " + name + "! You are " + age + " years old.";
console.log("Old way:", msg1);

// Template literal
const msg2 = `Hello, ${name}! You are ${age} years old.`;
console.log("Template literal:", msg2);

// Multi-line strings
const html = `
    <div>
        <h1>${name}</h1>
        <p>Age: ${age}</p>
    </div>
`;
console.log("Multi-line HTML:", html);

// Expressions inside ${}
console.log(`Sum: ${5 + 3}`);       // Sum: 8
console.log(`Upper: ${name.toUpperCase()}`); // Upper: ALICE
