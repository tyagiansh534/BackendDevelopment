// Task 1: Embedding vs Referencing in MongoDB

// Approach A: Embedded Document (1-to-Few relationship)
// Best when subdocuments are always accessed together with the parent
const userWithEmbeddedAddresses = {
    _id: "u101",
    name: "Ansh Tyagi",
    email: "tyagiansh534@gmail.com",
    addresses: [
        { type: "home", street: "Rajpur Road", city: "Dehradun", pincode: "248001" },
        { type: "work", street: "Knowledge Park", city: "Dehradun", pincode: "248007" }
    ]
};

// Approach B: Referenced Document (1-to-Many or Many-to-Many)
// Best when child documents grow indefinitely or need independent querying
const authorRef = { _id: "a1", name: "Robert C. Martin" };
const bookRef = { _id: "b1", title: "Clean Code", author_id: "a1" };
