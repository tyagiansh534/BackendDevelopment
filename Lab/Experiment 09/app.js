const tableBody = document.querySelector("#studentTable");
const statusMessage = document.querySelector("#status");
const htmlContainer = document.querySelector("#htmlNoticeContainer");

// Display tabular records
function displayStudents(students, format) {
    tableBody.replaceChildren();
    htmlContainer.style.display = "none";
    document.querySelector("#studentTableContainer").style.display = "table";

    students.forEach(student => {
        const row = document.createElement("tr");

        [student.id, student.name, student.course, student.semester, student.email].forEach(val => {
            const cell = document.createElement("td");
            cell.textContent = val;
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });

    statusMessage.className = "status success";
    statusMessage.textContent = `Successfully loaded ${students.length} records using ${format}.`;
}

// 1. Fetch JSON Data
document.querySelector("#loadJsonBtn").addEventListener("click", async () => {
    statusMessage.className = "status loading";
    statusMessage.textContent = "Requesting students.json via AJAX Fetch...";

    try {
        const response = await fetch("students.json");
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        const data = await response.json();
        displayStudents(data.students, "JSON");
    } catch (err) {
        statusMessage.className = "status error";
        statusMessage.textContent = `Failed to load JSON: ${err.message}`;
    }
});

// 2. Fetch XML Data
document.querySelector("#loadXmlBtn").addEventListener("click", async () => {
    statusMessage.className = "status loading";
    statusMessage.textContent = "Requesting students.xml via AJAX Fetch...";

    try {
        const response = await fetch("students.xml");
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        const xmlText = await response.text();
        const xmlDoc = new DOMParser().parseFromString(xmlText, "application/xml");

        if (xmlDoc.querySelector("parsererror")) {
            throw new Error("Invalid XML document returned from server.");
        }

        const students = Array.from(xmlDoc.querySelectorAll("student")).map(s => ({
            id: s.getAttribute("id"),
            name: s.querySelector("name")?.textContent || "-",
            course: s.querySelector("course")?.textContent || "-",
            semester: s.querySelector("semester")?.textContent || "-",
            email: s.querySelector("email")?.textContent || "-"
        }));

        displayStudents(students, "XML (DOMParser)");
    } catch (err) {
        statusMessage.className = "status error";
        statusMessage.textContent = `Failed to load XML: ${err.message}`;
    }
});

// 3. Fetch HTML Fragment
document.querySelector("#loadHtmlBtn").addEventListener("click", async () => {
    statusMessage.className = "status loading";
    statusMessage.textContent = "Requesting notice.html via AJAX Fetch...";

    try {
        const response = await fetch("notice.html");
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        const html = await response.text();
        document.querySelector("#studentTableContainer").style.display = "none";
        htmlContainer.innerHTML = html;
        htmlContainer.style.display = "block";

        statusMessage.className = "status success";
        statusMessage.textContent = "HTML fragment loaded successfully via AJAX.";
    } catch (err) {
        statusMessage.className = "status error";
        statusMessage.textContent = `Failed to load HTML: ${err.message}`;
    }
});
