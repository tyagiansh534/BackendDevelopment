// Experiment 07 & 08: Part C - Event Handling Demo Scripts

function logTo(boxId, msg) {
    console.log(msg);
    const box = document.getElementById(boxId);
    if (box) {
        box.textContent += (box.textContent ? "\n" : "") + msg;
    }
}

function clearBox(boxId) {
    const box = document.getElementById(boxId);
    if (box) box.textContent = "";
}

// 5.2 Method 2: DOM Property
const domPropBtn = document.getElementById("domPropBtn");
if (domPropBtn) {
    domPropBtn.onclick = function() {
        alert("Clicked! (Attached via DOM Property: btn.onclick)");
        logTo('log-5-2', "Clicked via DOM Property (btn.onclick)");
    };
}

// 5.2 Method 3: addEventListener()
const addEventBtn = document.getElementById("addEventBtn");
if (addEventBtn) {
    // First listener
    addEventBtn.addEventListener("click", function() {
        alert("Clicked! (Handler 1 via addEventListener)");
        logTo('log-5-2', "Handler 1 executed (addEventListener)");
    });

    // Second listener (Multiple listeners supported!)
    addEventBtn.addEventListener("click", () => {
        logTo('log-5-2', "Handler 2 executed: 'Second handler' logged to console");
    });
}

// 5.4 The Event Object
const eventObjBtn = document.getElementById("eventObjBtn");
if (eventObjBtn) {
    eventObjBtn.addEventListener("click", function(event) {
        clearBox('log-5-4');
        logTo('log-5-4', `event.type: ${event.type}`);
        logTo('log-5-4', `event.target: <${event.target.tagName.toLowerCase()} id="${event.target.id}">`);
        logTo('log-5-4', `event.clientX: ${event.clientX}`);
        logTo('log-5-4', `event.clientY: ${event.clientY}`);
        logTo('log-5-4', `event.timeStamp: ${event.timeStamp.toFixed(2)} ms`);
    });
}

// 5.5 Keyboard Events
const keyInput = document.getElementById("keyInput");
if (keyInput) {
    keyInput.addEventListener("keydown", (event) => {
        clearBox('log-5-5');
        logTo('log-5-5', `Key pressed: ${event.key}`);
        logTo('log-5-5', `Code: ${event.code}`);
        logTo('log-5-5', `Ctrl pressed: ${event.ctrlKey}`);
        logTo('log-5-5', `Shift pressed: ${event.shiftKey}`);
    });
}

// 5.6 Form Events
const form = document.getElementById("myForm");
const usernameInput = document.getElementById("username");

if (form && usernameInput) {
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevents page reload
        const username = usernameInput.value;
        logTo('log-5-6', `Form submitted! Prevented reload. Value: "${username}"`);
    });

    // Input event — fires on every keystroke
    usernameInput.addEventListener("input", (e) => {
        const liveVal = e.target.value;
        const liveBox = document.getElementById('liveInputPreview');
        if (liveBox) liveBox.textContent = `Current value: "${liveVal}"`;
        console.log(`Current value: ${liveVal}`);
    });
}

// 5.7 Event Bubbling Demonstration
const outer = document.getElementById("outer");
const inner = document.getElementById("inner");

if (outer && inner) {
    outer.addEventListener("click", () => {
        logTo('log-5-7', "Outer clicked (Bubbled up to outer)");
    });

    inner.addEventListener("click", () => {
        logTo('log-5-7', "Inner clicked");
    });
}

// 5.8 stopPropagation() and preventDefault()
const outerStop = document.getElementById("outerStop");
const innerStop = document.getElementById("innerStop");

if (outerStop && innerStop) {
    outerStop.addEventListener("click", () => {
        logTo('log-5-8', "Outer clicked");
    });

    innerStop.addEventListener("click", (event) => {
        event.stopPropagation(); // Stops bubbling to outer
        logTo('log-5-8', "Inner clicked (event.stopPropagation() prevented outer handler)");
    });
}

const preventLink = document.getElementById("preventLink");
if (preventLink) {
    preventLink.addEventListener("click", (event) => {
        event.preventDefault(); // Prevents navigation
        logTo('log-5-8', "Link clicked but not followed (event.preventDefault())");
    });
}

// 5.9 Event Delegation
const taskList = document.getElementById("taskList");
if (taskList) {
    taskList.addEventListener("click", (event) => {
        if (event.target.tagName === "LI") {
            event.target.classList.toggle("done");
            logTo('log-5-9', `Clicked item via Delegation: "${event.target.textContent}" (toggled .done)`);
        }
    });
}

function addDelegatedTask() {
    const list = document.getElementById("taskList");
    const count = list.children.length + 1;
    const li = document.createElement("li");
    li.textContent = `Dynamically Added Task ${count}`;
    list.appendChild(li);
    logTo('log-5-9', `Added "Task ${count}". Note: it automatically inherits click handling via delegation!`);
}
