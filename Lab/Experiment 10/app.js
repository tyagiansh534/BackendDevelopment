$(document).ready(function () {
    // ==========================================
    // PROGRAM 1: jQuery DOM Manipulation & Effects
    // ==========================================
    const $box = $("#targetBox");
    const $p1Feedback = $("#p1Feedback");

    $("#btnToggleClass").on("click", function () {
        $box.toggleClass("highlight");
        $p1Feedback.text("Toggled 'highlight' class using .toggleClass().");
    });

    $("#btnFade").on("click", function () {
        $box.fadeToggle(400, function () {
            $p1Feedback.text("Executed .fadeToggle() animation.");
        });
    });

    $("#btnSlide").on("click", function () {
        $box.slideToggle(350, function () {
            $p1Feedback.text("Executed .slideToggle() animation.");
        });
    });

    $("#btnChangeText").on("click", function () {
        const timestamp = new Date().toLocaleTimeString();
        $("#boxText").text(`Updated at ${timestamp}`);
        $p1Feedback.text("Modified inner text via .text().");
    });

    $("#btnAppend").on("click", function () {
        $box.append(" <small>★</small>");
        $p1Feedback.text("Appended element node via .append().");
    });

    $("#btnResetBox").on("click", function () {
        $box.show().removeClass("highlight").html('<span id="boxText">Interactive Box</span>');
        $p1Feedback.text("Reset box to default state.");
    });

    // ==========================================
    // PROGRAM 2: jQuery AJAX ($.ajax & $.getJSON)
    // ==========================================
    const $tbody = $("#studentTableBody");
    const $ajaxStatus = $("#ajaxStatus");

    function renderTable(students, method) {
        $tbody.empty();
        $.each(students, function (index, student) {
            const row = `<tr>
                <td>${student.id}</td>
                <td><strong>${student.name}</strong></td>
                <td>${student.course}</td>
                <td>${student.marks}</td>
                <td>${student.city}</td>
            </tr>`;
            $tbody.append(row);
        });

        $ajaxStatus.removeClass("error loading").addClass("success")
            .text(`Loaded ${students.length} students via jQuery ${method}.`);
    }

    // 1. $.ajax() implementation
    $("#btnLoadAjax").on("click", function () {
        $ajaxStatus.removeClass("error success").addClass("loading")
            .text("Sending asynchronous HTTP GET request via $.ajax()...");

        $.ajax({
            url: "students.json",
            method: "GET",
            dataType: "json",
            success: function (data) {
                renderTable(data.students, "$.ajax()");
            },
            error: function (xhr, status, error) {
                $ajaxStatus.removeClass("loading success").addClass("error")
                    .text(`$.ajax() failed: ${error || status} (HTTP ${xhr.status})`);
            }
        });
    });

    // 2. $.getJSON() shorthand implementation
    $("#btnLoadGetJson").on("click", function () {
        $ajaxStatus.removeClass("error success").addClass("loading")
            .text("Sending asynchronous request via $.getJSON() shorthand...");

        $.getJSON("students.json")
            .done(function (data) {
                renderTable(data.students, "$.getJSON()");
            })
            .fail(function (xhr, status, error) {
                $ajaxStatus.removeClass("loading success").addClass("error")
                    .text(`$.getJSON() failed: ${error || status}`);
            });
    });

    // 3. Error handling demo
    $("#btnTriggerError").on("click", function () {
        $ajaxStatus.removeClass("error success").addClass("loading")
            .text("Requesting non-existent file to test error callback...");

        $.ajax({
            url: "non_existent_file.json",
            method: "GET",
            dataType: "json",
            error: function (xhr, status, error) {
                $ajaxStatus.removeClass("loading success").addClass("error")
                    .text(`Error callback successfully caught: HTTP ${xhr.status} ${xhr.statusText}`);
            }
        });
    });

    $("#btnClearTable").on("click", function () {
        $tbody.html('<tr><td colspan="5" style="text-align:center; color:#94a3b8;">Table cleared.</td></tr>');
        $ajaxStatus.removeClass("error success loading").text("Table cleared.");
    });
});
