// ============================================================================
// Lab Experiment 05 - PBL Activity: Library Management Utility
// Course: Backend Development Laboratory (CSFS3008P)
// Author: Ansh Tyagi | SAP ID: 590014867
// ============================================================================

// 1. Define Library Array
const library = [
    { title: "Clean Code", author: "Robert C. Martin", available: true },
    { title: "Design Patterns", author: "Erich Gamma et al.", available: true }
];

// 2. Add Book Function
function addBook(title, author) {
    if (!title || !author) {
        console.log("Error: Title and Author are required to add a book.");
        return false;
    }
    const newBook = {
        title: title.trim(),
        author: author.trim(),
        available: true,
        addedAt: new Date().toLocaleDateString()
    };
    library.push(newBook);
    console.log(`✓ Added: "${newBook.title}" by ${newBook.author}`);
    return newBook;
}

// 3. Find Book Function (Case-insensitive)
function findBook(title) {
    const query = title.trim().toLowerCase();
    const found = library.find(b => b.title.toLowerCase() === query);
    if (found) {
        console.log(`✓ Found: "${found.title}" by ${found.author} (Status: ${found.available ? 'Available' : 'Borrowed'})`);
        return found;
    } else {
        console.log(`✗ Book with title "${title}" not found in library.`);
        return null;
    }
}

// 4. Display Complete Library
function displayLibrary() {
    console.log("\n--- Current Library Catalog ---");
    library.forEach((book, index) => {
        console.log(`${index + 1}. "${book.title}" by ${book.author} [${book.available ? 'Available' : 'Issued'}]`);
    });
    console.log(`Total Books: ${library.length}\n`);
}

// 5. Test Operations
console.log("=== Testing Library Management Utility ===");
addBook("The Pragmatic Programmer", "David Thomas & Andrew Hunt");
addBook("Refactoring", "Martin Fowler");

displayLibrary();

findBook("Clean Code");
findBook("Introduction to Algorithms");

if (typeof module !== 'undefined') {
    module.exports = { library, addBook, findBook, displayLibrary };
}
