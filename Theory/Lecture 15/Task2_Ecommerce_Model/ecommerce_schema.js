// Task 2: E-Commerce Data Model (Hybrid Pattern)

const categorySchema = {
    _id: "cat_laptops",
    name: "Laptops & Notebooks",
    slug: "laptops"
};

const productDocument = {
    _id: "prod_macbook16",
    title: "MacBook Pro 16",
    price: 249999.00,
    category_id: "cat_laptops", // Referenced relationship
    specs: { // Embedded key-value specs
        cpu: "Apple M3 Max",
        ram_gb: 36,
        storage_gb: 1000
    },
    reviews: [ // Embedded recent reviews
        { user: "Aarav", rating: 5, comment: "Incredible performance!", date: new Date() }
    ],
    review_count: 1,
    average_rating: 5.0
};
