// Experiment 07 & 08: Part A - 3.9 Promises and Async/Await

// Promise
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve("Data loaded"), 1000);
    });
};

fetchData().then(data => console.log("Promise .then() ->", data));

// Async/Await
async function loadData() {
    try {
        const data = await fetchData();
        console.log("Async/Await ->", data);
    } catch (error) {
        console.error("Error:", error);
    }
}
loadData();
