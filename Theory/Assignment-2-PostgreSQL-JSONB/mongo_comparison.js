// ============================================================================
// Assignment 2: MongoDB (mongosh) Comparison Script
// Course: Backend Development (Theory)
// Author: Ansh Tyagi | SAP ID: 590014867
// ============================================================================

// Connect to / create assignment database
use assignment2_catalog;

// Drop collection if exists
db.products.drop();

// Task 2 Equivalent: Insert 5 products across multiple categories
db.products.insertMany([
  {
    name: "Clean Code",
    category: "book",
    price: 499.00,
    attributes: {
      author: "Robert C. Martin",
      pages: 464,
      genre: "Software Engineering",
      publisher: "Prentice Hall"
    }
  },
  {
    name: "Design Patterns",
    category: "book",
    price: 650.00,
    attributes: {
      author: "Gang of Four",
      pages: 395,
      genre: "Computer Science",
      publisher: "Addison-Wesley"
    }
  },
  {
    name: "MacBook Pro 16",
    category: "laptop",
    price: 249999.00,
    attributes: {
      cpu: "Apple M3 Max",
      ram_gb: 36,
      storage_gb: 1000,
      gpu: "30-core",
      weight_kg: 2.14
    }
  },
  {
    name: "Dell XPS 15",
    category: "laptop",
    price: 174990.00,
    attributes: {
      cpu: "Intel Core i7-13700H",
      ram_gb: 16,
      storage_gb: 512,
      gpu: "RTX 4050",
      weight_kg: 1.92
    }
  },
  {
    name: "Logitech MX Master 3S",
    category: "accessory",
    price: 8995.00,
    attributes: {
      color: "Graphite",
      wireless: true,
      battery_hours: 70,
      connectivity: "Bluetooth/USB"
    }
  },
  {
    name: "Google Pixel 9 Pro",
    category: "smartphone",
    price: 109999.00,
    attributes: {
      screen_inch: 6.3,
      camera_mp: 50,
      os: "Android 15",
      supports_5g: true
    }
  }
]);

// Task 3 Equivalent: Query by category-specific attributes
// 1. Laptop RAM >= 16 GB
db.products.find(
  { category: "laptop", "attributes.ram_gb": { $gte: 16 } },
  { name: 1, price: 1, "attributes.cpu": 1, "attributes.ram_gb": 1 }
);

// 2. Books by author
db.products.find(
  { category: "book", "attributes.author": "Robert C. Martin" }
);

// Task 4 Equivalent: Containment query
db.products.find(
  { "attributes.wireless": true }
);

// Task 5 Equivalent: Update without altering schema
db.products.updateOne(
  { name: "Logitech MX Master 3S" },
  { $set: { "attributes.discount_pct": 10, "attributes.in_stock": true } }
);

// Task 6 Equivalent: Compound and Multikey Indexing
db.products.createIndex({ "attributes.wireless": 1 });
db.products.createIndex({ "attributes.ram_gb": 1 });

// Explain query execution
db.products.find({ "attributes.wireless": true }).explain("executionStats");
