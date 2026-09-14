# Experiment 12B: State Management in Node.js

This repository contains the implementation of **Experiment 12B**, focusing on understanding and implementing **State Management** in Node.js using both Cookies and Sessions.

Since HTTP is a stateless protocol, each request is independent. This project demonstrates two methods to persist user data across multiple requests:
1. **Server-Side Sessions** (using `express-session`)
2. **Client-Side Cookies** (using `cookie-parser`)

---

## 🛠️ Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.
- A web browser to test the endpoints.

---

## 📦 Installation
1. Clone this repository or download the source code.
2. Open your terminal and navigate to the project folder.
3. Install the required dependencies by running:
   ```bash
   npm install
   ```
   *(This will install `express`, `express-session`, and `cookie-parser`)*

---

## 🚀 Usage

Because there are two separate examples, they must be run one at a time on port 3000.

### 1. Testing Session Management
This script demonstrates how to track user data (like a page view counter) securely on the server side, and how to safely destroy that data (like logging out).

1. Start the session server:
   ```bash
   node session-example.js
   ```
2. Open your browser and go to `http://localhost:3000/`. Refresh the page multiple times to see your session view counter increase.
3. To destroy your session, go to `http://localhost:3000/destroy`.
4. Stop the server in your terminal by pressing `Ctrl + C`.

### 2. Testing Cookie Management
This script demonstrates how a server can send a cookie to be stored in the user's browser, and how the browser automatically sends that cookie back to the server on subsequent requests.

1. Start the cookie server:
   ```bash
   node cookie-example.js
   ```
2. Open your browser and go to `http://localhost:3000/set-cookie`. The server will instruct your browser to save a cookie (`username=JohnDoe`).
3. Next, go to `http://localhost:3000/get-cookie`. The browser will send the cookie back to the server, and the server will display it on the screen.
4. Stop the server in your terminal by pressing `Ctrl + C`.

### 3. Testing To-Do List Manager (Session & Cookie)
This script demonstrates combining both concepts to create a fully functional session-based To-Do list, complete with a dark mode toggle stored in a cookie.

1. Start the To-Do server:
   ```bash
   node todo-app.js
   ```
2. Open your browser and go to `http://localhost:3000/`. 
3. Try adding and deleting some To-Dos. You can also try changing the Theme!
4. Stop the server in your terminal by pressing `Ctrl + C`.

---

## 📂 File Structure
- `package.json` - Project metadata and dependencies.
- `session-example.js` - Code demonstrating `express-session`.
- `cookie-example.js` - Code demonstrating `cookie-parser`.
- `todo-app.js` - Lab Exercise: To-Do List Manager.
