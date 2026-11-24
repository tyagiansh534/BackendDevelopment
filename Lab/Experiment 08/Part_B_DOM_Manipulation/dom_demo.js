// Experiment 07 & 08: Part B - DOM Manipulation Demo Scripts

// Helper to log both to console and on-screen log element
function log(msg, targetId = 'console-output') {
    console.log(msg);
    const box = document.getElementById(targetId);
    if (box) {
        box.textContent += (box.textContent ? "\n" : "") + msg;
    }
}

function clearLog(targetId = 'console-output') {
    const box = document.getElementById(targetId);
    if (box) box.textContent = "";
}

// 4.2 Selecting Elements
function demoSelectingElements() {
    clearLog('log-4-2');
    
    // getElementById
    const container = document.getElementById("container");
    log(`getElementById("container"): found element with id='${container.id}'`, 'log-4-2');

    // getElementsByClassName
    const paragraphs = document.getElementsByClassName("text");
    log(`getElementsByClassName("text").length: ${paragraphs.length}`, 'log-4-2');

    // querySelector — returns first match
    const firstPara = document.querySelector(".text");
    log(`querySelector(".text"): "${firstPara.textContent}"`, 'log-4-2');

    // querySelectorAll — returns all matches
    const allParas = document.querySelectorAll(".text");
    allParas.forEach((p, idx) => log(`querySelectorAll[${idx}]: "${p.textContent}"`, 'log-4-2'));
}

// 4.3 Modifying Content
function demoModifyingContent(mode) {
    const heading = document.querySelector("#demoHeading");
    
    if (mode === 'textContent') {
        // textContent — plain text only
        heading.textContent = "New Heading (textContent)";
    } else if (mode === 'innerHTML') {
        // innerHTML — parses HTML tags
        heading.innerHTML = "<em>Italic Heading (innerHTML)</em>";
    } else if (mode === 'innerText') {
        // innerText — respects CSS styling (visible text)
        heading.innerText = "Visible Text (innerText)";
    }
}

// 4.4 Modifying Attributes
function demoModifyingAttributes() {
    clearLog('log-4-4');
    const link = document.querySelector("#demoLink");

    // Get attribute
    log(`Initial getAttribute("href"): ${link.getAttribute("href")}`, 'log-4-4');

    // Set attribute
    link.setAttribute("href", "https://example.com");
    link.setAttribute("target", "_blank");
    log(`After setAttribute: href="${link.getAttribute("href")}", target="${link.getAttribute("target")}"`, 'log-4-4');

    // Direct property access
    link.href = "https://example.com";
    log(`Direct property access link.href: ${link.href}`, 'log-4-4');
}

function demoRemoveAttribute() {
    clearLog('log-4-4');
    const link = document.querySelector("#demoLink");
    
    // Remove attribute
    link.removeAttribute("target");
    log(`Removed target attribute. Current target: ${link.getAttribute("target")}`, 'log-4-4');
}

// 4.5 Modifying Styles
function demoInlineStyles() {
    const box = document.querySelector(".box");

    // Inline styles (camelCase for CSS properties)
    box.style.backgroundColor = "blue";
    box.style.fontSize = "20px";
    box.style.marginTop = "10px";
    box.style.color = "white";
}

function demoClassList(action) {
    clearLog('log-4-5');
    const box = document.querySelector(".box");

    if (action === 'add') {
        // Adding CSS classes
        box.classList.add("highlight");
        log(`classList.add("highlight") executed.`, 'log-4-5');
    } else if (action === 'remove') {
        // Removing CSS classes
        box.classList.remove("highlight");
        log(`classList.remove("highlight") executed.`, 'log-4-5');
    } else if (action === 'toggle') {
        // Toggle CSS class
        box.classList.toggle("active");
        log(`classList.toggle("active"). Has active? ${box.classList.contains("active")}`, 'log-4-5');
    }
    
    // Check contains
    log(`box.classList.contains("active"): ${box.classList.contains("active")}`, 'log-4-5');
}

// 4.6 Creating and Adding Elements
let elementCounter = 1;

function demoCreateAndAppend() {
    // Create element
    const newDiv = document.createElement("div");
    newDiv.textContent = `I am new! (#${elementCounter++})`;
    newDiv.classList.add("card");

    // Append to parent
    const container = document.getElementById("cardContainer");
    container.appendChild(newDiv);
}

function demoInsertBefore() {
    const newDiv = document.createElement("div");
    newDiv.textContent = `Inserted Before First Child (#${elementCounter++})`;
    newDiv.classList.add("card");

    const container = document.getElementById("cardContainer");
    const firstChild = container.firstElementChild;
    if (firstChild) {
        container.insertBefore(newDiv, firstChild);
    } else {
        container.appendChild(newDiv);
    }
}

function demoModernInsertion(method) {
    const newDiv = document.createElement("div");
    newDiv.textContent = `Inserted with .${method}() (#${elementCounter++})`;
    newDiv.classList.add("card");

    const container = document.getElementById("cardContainer");
    const firstChild = container.firstElementChild;

    if (method === 'append') {
        container.append(newDiv);
    } else if (method === 'prepend') {
        container.prepend(newDiv);
    } else if (method === 'before' && firstChild) {
        firstChild.before(newDiv);
    } else if (method === 'after' && firstChild) {
        firstChild.after(newDiv);
    } else {
        container.append(newDiv);
    }
}

// 4.7 Removing Elements
function demoRemoveChild() {
    const container = document.getElementById("cardContainer");
    const last = container.lastElementChild;
    if (last) {
        // Old way: parentNode.removeChild
        last.parentNode.removeChild(last);
    }
}

function demoElementRemove() {
    const element = document.querySelector(".remove-me");
    if (element) {
        // Modern way: element.remove()
        element.remove();
    } else {
        const anyCard = document.querySelector("#cardContainer .card");
        if (anyCard) anyCard.remove();
    }
}

// 4.8 Traversing the DOM
function demoTraverse() {
    clearLog('log-4-8');
    const item = document.querySelector("#middleItem");

    // Parent
    log(`Parent Element: <${item.parentElement.tagName.toLowerCase()} id="${item.parentElement.id}">`, 'log-4-8');

    // Children of parent list
    const parentList = item.parentElement;
    log(`Parent's children count: ${parentList.children.length}`, 'log-4-8');
    log(`Parent's firstElementChild: "${parentList.firstElementChild.textContent.trim()}"`, 'log-4-8');
    log(`Parent's lastElementChild: "${parentList.lastElementChild.textContent.trim()}"`, 'log-4-8');

    // Siblings
    log(`Previous Element Sibling: "${item.previousElementSibling ? item.previousElementSibling.textContent.trim() : 'none'}"`, 'log-4-8');
    log(`Next Element Sibling: "${item.nextElementSibling ? item.nextElementSibling.textContent.trim() : 'none'}"`, 'log-4-8');
}
