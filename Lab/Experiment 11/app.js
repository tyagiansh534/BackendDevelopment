let allStudents = [];
let activeSource = "JSON";

// Tab Navigation
document.querySelectorAll(".nav-tab").forEach(tab => {
    tab.addEventListener("click", () => {
        document.querySelectorAll(".nav-tab").forEach(t => t.classList.remove("active"));
        document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));
        tab.classList.add("active");
        document.getElementById(`tab-${tab.dataset.tab}`).classList.add("active");

        if (tab.dataset.tab === "courses" && document.getElementById("coursesGrid").children.length === 0) {
            loadCourses();
        }
    });
});

// Update Statistics Bar
function updateStats(students) {
    document.getElementById("statTotal").textContent = students.length;
    if (students.length === 0) {
        document.getElementById("statGpa").textContent = "0.0";
        document.getElementById("statActive").textContent = "0";
        return;
    }
    const avgGpa = (students.reduce((acc, s) => acc + parseFloat(s.gpa || 0), 0) / students.length).toFixed(2);
    const activeCount = students.filter(s => s.status === "Active").length;
    document.getElementById("statGpa").textContent = avgGpa;
    document.getElementById("statActive").textContent = activeCount;
}

// Render Table Rows
function renderTable(students) {
    const tbody = document.getElementById("studentTbody");
    tbody.replaceChildren();

    if (students.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:#94a3b8; padding:24px;">No matching records found.</td></tr>`;
        return;
    }

    students.forEach(s => {
        const tr = document.createElement("tr");

        const statusBadge = `<span class="badge ${s.status === 'Active' ? 'badge-active' : 'badge-grad'}">${s.status}</span>`;

        tr.innerHTML = `
            <td><strong>#${s.id}</strong></td>
            <td>${s.name}</td>
            <td>${s.course}</td>
            <td>${s.semester}</td>
            <td><strong>${s.gpa}</strong></td>
            <td>${s.email}</td>
            <td>${statusBadge}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Filter Logic
function applyFilters() {
    const query = document.getElementById("searchInput").value.toLowerCase().trim();
    const course = document.getElementById("courseFilter").value;

    const filtered = allStudents.filter(s => {
        const matchesQuery = s.name.toLowerCase().includes(query) ||
                             String(s.id).includes(query) ||
                             s.email.toLowerCase().includes(query);
        const matchesCourse = course === "ALL" || s.course === course;
        return matchesQuery && matchesCourse;
    });

    renderTable(filtered);
    updateStats(filtered);
}

document.getElementById("searchInput").addEventListener("input", applyFilters);
document.getElementById("courseFilter").addEventListener("change", applyFilters);

// Load JSON Students via AJAX
async function loadJsonStudents() {
    const alert = document.getElementById("statusAlert");
    alert.textContent = "Loading students asynchronously from students.json...";

    try {
        const res = await fetch("students.json");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        allStudents = data.students;
        activeSource = "JSON";
        applyFilters();
        alert.textContent = `Successfully loaded ${allStudents.length} records via AJAX JSON.`;
    } catch (err) {
        alert.textContent = `Error loading JSON: ${err.message}`;
    }
}

// Load XML Students via AJAX
async function loadXmlStudents() {
    const alert = document.getElementById("statusAlert");
    alert.textContent = "Loading students asynchronously from students.xml...";

    try {
        const res = await fetch("students.xml");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const xmlText = await res.text();
        const xmlDoc = new DOMParser().parseFromString(xmlText, "application/xml");

        allStudents = Array.from(xmlDoc.querySelectorAll("student")).map(s => ({
            id: s.getAttribute("id"),
            name: s.querySelector("name")?.textContent || "-",
            course: s.querySelector("course")?.textContent || "-",
            semester: s.querySelector("semester")?.textContent || "-",
            gpa: s.querySelector("gpa")?.textContent || "0.0",
            email: s.querySelector("email")?.textContent || "-",
            status: s.querySelector("status")?.textContent || "Active"
        }));

        activeSource = "XML";
        applyFilters();
        alert.textContent = `Successfully parsed ${allStudents.length} records via AJAX XML (DOMParser).`;
    } catch (err) {
        alert.textContent = `Error loading XML: ${err.message}`;
    }
}

// Source toggle listeners
document.getElementById("btnSrcJson").addEventListener("click", function () {
    document.getElementById("btnSrcJson").classList.add("active");
    document.getElementById("btnSrcXml").classList.remove("active");
    loadJsonStudents();
});

document.getElementById("btnSrcXml").addEventListener("click", function () {
    document.getElementById("btnSrcXml").classList.add("active");
    document.getElementById("btnSrcJson").classList.remove("active");
    loadXmlStudents();
});

document.getElementById("btnRefresh").addEventListener("click", () => {
    if (activeSource === "JSON") loadJsonStudents();
    else loadXmlStudents();
});

// Load Courses via AJAX
async function loadCourses() {
    const status = document.getElementById("courseStatus");
    const grid = document.getElementById("coursesGrid");
    status.textContent = "Fetching courses catalog asynchronously...";

    try {
        const res = await fetch("courses.json");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        grid.replaceChildren();
        data.courses.forEach(c => {
            const card = document.createElement("div");
            card.className = "course-card";
            card.innerHTML = `
                <h3>${c.title}</h3>
                <p><strong>Code:</strong> ${c.code} | <strong>Credits:</strong> ${c.credits}</p>
                <p><strong>Instructor:</strong> ${c.instructor}</p>
                <p><strong>Department:</strong> ${c.dept}</p>
            `;
            grid.appendChild(card);
        });

        status.textContent = `Catalog loaded (${data.courses.length} courses).`;
    } catch (err) {
        status.textContent = `Failed to load courses: ${err.message}`;
    }
}

document.getElementById("btnLoadCourses").addEventListener("click", loadCourses);

// Initial Load
document.addEventListener("DOMContentLoaded", () => {
    loadJsonStudents();
});
