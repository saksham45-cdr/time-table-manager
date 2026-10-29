// ============================================================
// DATA LAYER
// Demo data below is shown until the C++ backend has produced
// backend_data.js (see backend/export.cpp). index.html loads
// backend_data.js, if present, before this file — when it defines
// `backendData`, we transform it into the same shapes the demo
// data uses below, so every render function works unchanged.
// The data structures here mirror the structs in backend/data.h.
// ============================================================

// Whether backend/main.cpp has actually run and produced output.
const usingRealData = (typeof backendData !== 'undefined');

// Available time slot labels (must match keys used in scheduleData below)
const TIME_SLOTS = usingRealData ? backendData.slotLabels : [
    '9-10 AM',
    '10-11 AM',
    '11 AM-12 PM',
    '12-1 PM',
    '2-3 PM',
    '3-4 PM'
];

// Day column labels
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// ---- Demo data (used only when backendData is not present) ----

const demoCourses = [
    { id: 'CS301', name: 'Data Structures',     facultyId: 'F01', students: 60 },
    { id: 'CS302', name: 'Operating Systems',   facultyId: 'F02', students: 58 },
    { id: 'CS303', name: 'Computer Networks',   facultyId: 'F03', students: 55 },
    { id: 'MA301', name: 'Mathematics III',     facultyId: 'F04', students: 65 },
    { id: 'PH301', name: 'Engineering Physics', facultyId: 'F05', students: 62 },
    { id: 'EE301', name: 'Digital Electronics', facultyId: 'F06', students: 50 },
];

const demoFaculty = [
    { id: 'F01', name: 'Dr. R. Sharma', dept: 'CSE',         course: 'CS301' },
    { id: 'F02', name: 'Dr. S. Mehta',  dept: 'CSE',         course: 'CS302' },
    { id: 'F03', name: 'Dr. A. Kumar',  dept: 'CSE',         course: 'CS303' },
    { id: 'F04', name: 'Dr. P. Gupta',  dept: 'Mathematics', course: 'MA301' },
    { id: 'F05', name: 'Dr. N. Verma',  dept: 'Physics',     course: 'PH301' },
    { id: 'F06', name: 'Dr. K. Patel',  dept: 'ECE',         course: 'EE301' },
];

const demoRooms = [
    { id: 'A101', name: 'Lab A-101',  capacity: 60 },
    { id: 'A102', name: 'Room A-102', capacity: 70 },
    { id: 'B201', name: 'Room B-201', capacity: 65 },
    { id: 'B202', name: 'Lab B-202',  capacity: 55 },
    { id: 'C301', name: 'Room C-301', capacity: 80 },
];

const demoScheduleData = {
    'Monday': {
        '9-10 AM':    { course: 'Data Structures',     faculty: 'Dr. R. Sharma', room: 'A101', color: '#dbeafe' },
        '10-11 AM':   { course: 'Mathematics III',     faculty: 'Dr. P. Gupta',  room: 'A102', color: '#dcfce7' },
        '2-3 PM':     { course: 'Digital Electronics', faculty: 'Dr. K. Patel',  room: 'B201', color: '#ede9fe' },
    },
    'Tuesday': {
        '9-10 AM':      { course: 'Computer Networks',   faculty: 'Dr. A. Kumar',  room: 'B202', color: '#fef9c3' },
        '11 AM-12 PM':  { course: 'Operating Systems',   faculty: 'Dr. S. Mehta',  room: 'C301', color: '#ffe4e6' },
        '3-4 PM':       { course: 'Mathematics III',     faculty: 'Dr. P. Gupta',  room: 'A102', color: '#dcfce7' },
    },
    'Wednesday': {
        '10-11 AM':   { course: 'Data Structures',     faculty: 'Dr. R. Sharma', room: 'A101', color: '#dbeafe' },
        '12-1 PM':    { course: 'Engineering Physics', faculty: 'Dr. N. Verma',  room: 'B201', color: '#fef3c7' },
        '2-3 PM':     { course: 'Computer Networks',   faculty: 'Dr. A. Kumar',  room: 'B202', color: '#fef9c3' },
    },
    'Thursday': {
        '9-10 AM':      { course: 'Operating Systems',   faculty: 'Dr. S. Mehta',  room: 'C301', color: '#ffe4e6' },
        '11 AM-12 PM':  { course: 'Digital Electronics', faculty: 'Dr. K. Patel',  room: 'B201', color: '#ede9fe' },
        '3-4 PM':       { course: 'Data Structures',     faculty: 'Dr. R. Sharma', room: 'A101', color: '#dbeafe' },
    },
    'Friday': {
        '10-11 AM':  { course: 'Engineering Physics', faculty: 'Dr. N. Verma',  room: 'B202', color: '#fef3c7' },
        '12-1 PM':   { course: 'Mathematics III',     faculty: 'Dr. P. Gupta',  room: 'A102', color: '#dcfce7' },
        '2-3 PM':    { course: 'Operating Systems',   faculty: 'Dr. S. Mehta',  room: 'C301', color: '#ffe4e6' },
    },
    'Saturday': {
        '9-10 AM':     { course: 'Digital Electronics', faculty: 'Dr. K. Patel',  room: 'B201', color: '#ede9fe' },
        '11 AM-12 PM': { course: 'Computer Networks',   faculty: 'Dr. A. Kumar',  room: 'B202', color: '#fef9c3' },
    },
};

// Sample conflicts for the conflict panel.
// These are fabricated for demonstration only.
// backend/graph.cpp's buildConflictGraph() detects the real conflicts below.
const demoConflicts = [
    {
        type: 'Student Overlap',
        desc: 'CS301 (Data Structures) and MA301 (Mathematics III) share common students — both appear in the Monday 9-10 AM slot.',
        severity: 'high'
    },
    {
        type: 'Room Conflict',
        desc: 'Room B-201 is double-booked: CS303 (Computer Networks) and EE301 (Digital Electronics) are both assigned to Thursday 11 AM-12 PM.',
        severity: 'high'
    },
    {
        type: 'Invigilator Conflict',
        desc: 'Dr. R. Sharma is assigned to two exams at the same time: CS301 and CS302 on Wednesday 10-11 AM.',
        severity: 'medium'
    },
];

// ---- Real data (used only when backendData is present) ----
// Transforms backend/export.cpp's output into the same shapes as the
// demo data above, so every render function below works unchanged.

// A small fixed palette so each course gets a stable colour in the grid.
const REAL_COURSE_COLORS = ['#dbeafe', '#dcfce7', '#ede9fe', '#fef9c3', '#ffe4e6', '#fef3c7'];

function buildRealCourses() {
    return backendData.exams.map(function (e) {
        return { id: e.courseCode, name: e.courseName, facultyId: e.invigilatorId, students: e.studentCount };
    });
}

function buildRealFaculty() {
    return backendData.faculty.map(function (f) {
        const taught = backendData.exams
            .filter(function (e) { return e.invigilatorId === f.id; })
            .map(function (e) { return e.courseCode; })
            .join(', ');
        return { id: f.id, name: f.name, dept: '—', course: taught || '—' };
    });
}

function buildRealRooms() {
    return backendData.rooms.map(function (r) {
        return { id: r.name, name: r.name, capacity: r.capacity };
    });
}

// The backend schedules into time slots only (no day-of-week concept), so
// the real schedule is shown on a single day column. We use the Greedy
// result here; both algorithms' stats appear in the comparison cards below.
// Because different exams can share a slot in different rooms, each cell
// holds an ARRAY of sessions (unlike the demo data, which has one per cell).
function buildRealScheduleData() {
    const data = { 'Monday': {} };

    backendData.greedy.schedule.forEach(function (entry) {
        if (!entry.scheduled) return;

        const exam = backendData.exams[entry.examIndex];
        const room = backendData.rooms[entry.roomIndex];
        const facultyMember = backendData.faculty.find(function (f) { return f.id === exam.invigilatorId; });
        const slotLabel = backendData.slotLabels[entry.timeSlot];

        if (!data['Monday'][slotLabel]) {
            data['Monday'][slotLabel] = [];
        }

        data['Monday'][slotLabel].push({
            course: exam.courseName,
            faculty: facultyMember ? facultyMember.name : 'Unknown',
            room: room ? room.name : 'Unknown',
            color: REAL_COURSE_COLORS[entry.examIndex % REAL_COURSE_COLORS.length]
        });
    });

    return data;
}

function buildRealConflicts() {
    return backendData.conflicts.map(function (c) {
        const examA = backendData.exams[c.examA];
        const examB = backendData.exams[c.examB];
        return {
            type: c.reason,
            desc: examA.courseCode + ' (' + examA.courseName + ') and ' +
                  examB.courseCode + ' (' + examB.courseName + '): ' + c.reason + '.',
            severity: c.reason.indexOf('invigilator') !== -1 ? 'high' : 'medium'
        };
    });
}

// ---- Final data used by the app: real data when available, demo otherwise ----
const courses = usingRealData ? buildRealCourses() : demoCourses;
const faculty = usingRealData ? buildRealFaculty() : demoFaculty;
const rooms = usingRealData ? buildRealRooms() : demoRooms;
const scheduleData = usingRealData ? buildRealScheduleData() : demoScheduleData;
const sampleConflicts = usingRealData ? buildRealConflicts() : demoConflicts;

// ============================================================
// TIMETABLE RENDERING
// Builds the <tbody> rows of the timetable table using
// TIME_SLOTS and DAYS defined above.
// ============================================================

function renderTimetable() {
    const tbody = document.getElementById('timetable-body');
    tbody.innerHTML = '';

    for (const slot of TIME_SLOTS) {
        const row = document.createElement('tr');

        // First cell: time label
        const timeCell = document.createElement('td');
        timeCell.classList.add('time-col');
        timeCell.textContent = slot;
        row.appendChild(timeCell);

        // One cell per day
        for (const day of DAYS) {
            const cell = document.createElement('td');

            // Check if there is a scheduled session for this day + slot.
            // Demo data has one entry per cell; real data can have several
            // (different exams, different rooms, same time slot), so always
            // work with an array here.
            const raw = scheduleData[day] && scheduleData[day][slot];
            const entries = Array.isArray(raw) ? raw : (raw ? [raw] : []);

            if (entries.length > 0) {
                for (const entry of entries) {
                    // Render a coloured course card
                    const card = document.createElement('div');
                    card.classList.add('course-card');
                    card.style.backgroundColor = entry.color;

                    card.innerHTML =
                        '<div class="course-name">' + entry.course + '</div>' +
                        '<div class="course-meta">' + entry.faculty + '</div>' +
                        '<div class="course-meta">Room: ' + entry.room + '</div>';

                    cell.appendChild(card);
                }
            } else {
                // Empty cell marker
                const empty = document.createElement('div');
                empty.classList.add('empty-cell');
                empty.textContent = '-';
                cell.appendChild(empty);
            }

            row.appendChild(cell);
        }

        tbody.appendChild(row);
    }
}

// ============================================================
// SUMMARY CARDS
// Values are calculated from the current sample data.
// ============================================================

// Count total scheduled sessions across all days
function countScheduledSessions() {
    let total = 0;
    for (const day of DAYS) {
        if (scheduleData[day]) {
            for (const slot of Object.keys(scheduleData[day])) {
                const raw = scheduleData[day][slot];
                total += Array.isArray(raw) ? raw.length : 1;
            }
        }
    }
    return total;
}

// Count how many distinct time slots have at least one session
function countUsedSlots() {
    const usedSlots = new Set();
    for (const day of DAYS) {
        if (scheduleData[day]) {
            for (const slot of Object.keys(scheduleData[day])) {
                usedSlots.add(slot);
            }
        }
    }
    return usedSlots.size;
}

function renderSummaryCards() {
    const container = document.getElementById('summary-cards');

    const cardData = [
        { label: 'Total Courses',       value: courses.length },
        { label: 'Sessions Scheduled',  value: countScheduledSessions() },
        { label: 'Time Slots Used',     value: countUsedSlots() + ' / ' + TIME_SLOTS.length },
        { label: usingRealData ? 'Conflicts Detected' : 'Sample Conflicts', value: sampleConflicts.length },
    ];

    container.innerHTML = '';

    for (const item of cardData) {
        const card = document.createElement('div');
        card.classList.add('summary-card');
        card.innerHTML =
            '<div class="card-value">' + item.value + '</div>' +
            '<div class="card-label">' + item.label + '</div>';
        container.appendChild(card);
    }
}

// ============================================================
// SIDEBAR NAVIGATION
// Clicking a nav item highlights it and shows the matching view.
// ============================================================

function switchView(viewId) {
    // Hide every view
    const allViews = document.querySelectorAll('.view');
    for (const v of allViews) {
        v.classList.remove('active');
    }

    // Show the requested view
    const target = document.getElementById('view-' + viewId);
    if (target) {
        target.classList.add('active');
    }
}

function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');

    for (const item of navItems) {
        item.addEventListener('click', function () {
            // Remove active class from all items
            for (const other of navItems) {
                other.classList.remove('active');
            }
            // Highlight clicked item
            this.classList.add('active');
            // Switch the content view
            const viewId = this.getAttribute('data-view');
            switchView(viewId);
        });
    }
}

// ============================================================
// COURSES VIEW
// Renders the courses table; handles the Add Course form.
// ============================================================

function renderCoursesTable() {
    const tbody = document.getElementById('courses-body');
    tbody.innerHTML = '';

    for (const c of courses) {
        const row = document.createElement('tr');
        row.innerHTML =
            '<td>' + c.id + '</td>' +
            '<td>' + c.name + '</td>' +
            '<td>' + c.facultyId + '</td>' +
            '<td>' + c.students + '</td>';
        tbody.appendChild(row);
    }
}

function initAddCourse() {
    document.getElementById('add-course-btn').addEventListener('click', function () {
        const id       = document.getElementById('new-course-id').value.trim();
        const name     = document.getElementById('new-course-name').value.trim();
        const facId    = document.getElementById('new-faculty-id').value.trim();
        const students = parseInt(document.getElementById('new-student-count').value, 10);

        if (!id || !name || !facId || isNaN(students) || students <= 0) {
            alert('Please fill in all fields with valid values.');
            return;
        }

        // Add to the in-memory list and re-render
        courses.push({ id: id, name: name, facultyId: facId, students: students });
        renderCoursesTable();
        renderSummaryCards();

        // Clear the form inputs
        document.getElementById('new-course-id').value = '';
        document.getElementById('new-course-name').value = '';
        document.getElementById('new-faculty-id').value = '';
        document.getElementById('new-student-count').value = '';
    });
}

// ============================================================
// FACULTY VIEW
// Read-only table. Edit the faculty array in this file to update.
// ============================================================

function renderFacultyTable() {
    const tbody = document.getElementById('faculty-body');
    tbody.innerHTML = '';

    for (const f of faculty) {
        const row = document.createElement('tr');
        row.innerHTML =
            '<td>' + f.id + '</td>' +
            '<td>' + f.name + '</td>' +
            '<td>' + f.dept + '</td>' +
            '<td>' + f.course + '</td>';
        tbody.appendChild(row);
    }
}

// ============================================================
// ROOMS VIEW
// Renders the rooms table; handles the Add Room form.
// ============================================================

function renderRoomsTable() {
    const tbody = document.getElementById('rooms-body');
    tbody.innerHTML = '';

    for (const r of rooms) {
        const row = document.createElement('tr');
        row.innerHTML =
            '<td>' + r.id + '</td>' +
            '<td>' + r.name + '</td>' +
            '<td>' + r.capacity + '</td>';
        tbody.appendChild(row);
    }
}

function initAddRoom() {
    document.getElementById('add-room-btn').addEventListener('click', function () {
        const id       = document.getElementById('new-room-id').value.trim();
        const name     = document.getElementById('new-room-name').value.trim();
        const capacity = parseInt(document.getElementById('new-room-capacity').value, 10);

        if (!id || !name || isNaN(capacity) || capacity <= 0) {
            alert('Please fill in all fields with valid values.');
            return;
        }

        rooms.push({ id: id, name: name, capacity: capacity });
        renderRoomsTable();

        document.getElementById('new-room-id').value = '';
        document.getElementById('new-room-name').value = '';
        document.getElementById('new-room-capacity').value = '';
    });
}

// ============================================================
// CONFLICT PANEL
// Displays sampleConflicts when Check Conflicts is clicked.
// ============================================================

function renderConflictPanel() {
    const list = document.getElementById('conflict-list');
    list.innerHTML = '';

    for (const c of sampleConflicts) {
        const item = document.createElement('li');
        item.innerHTML =
            '<span class="severity-' + c.severity + '">[' + c.type + ']</span> ' + c.desc;
        list.appendChild(item);
    }

    document.getElementById('conflict-count').textContent =
        sampleConflicts.length + ' conflict(s) found in ' + (usingRealData ? 'the real conflict graph.' : 'demonstration data.');
}

function initConflictButton() {
    document.getElementById('conflict-btn').addEventListener('click', function () {
        // Make sure the timetable view is visible
        switchView('timetable');
        for (const item of document.querySelectorAll('.nav-item')) {
            item.classList.remove('active');
        }
        document.querySelector('.nav-item[data-view="timetable"]').classList.add('active');

        // Show and populate the conflict panel
        const panel = document.getElementById('conflict-panel');
        panel.style.display = 'block';
        renderConflictPanel();

        // Scroll the panel into view smoothly
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    document.getElementById('close-conflict-btn').addEventListener('click', function () {
        document.getElementById('conflict-panel').style.display = 'none';
    });
}

// ============================================================
// GENERATE TIMETABLE BUTTON
// Shows a modal explaining that generation is done by the C++ backend.
// ============================================================

function initGenerateButton() {
    document.getElementById('generate-btn').addEventListener('click', function () {
        document.getElementById('generate-modal').style.display = 'flex';
    });

    document.getElementById('close-generate-btn').addEventListener('click', function () {
        document.getElementById('generate-modal').style.display = 'none';
        // Dismiss to the timetable view
        switchView('timetable');
    });

    // Clicking the dark overlay also closes the modal
    document.getElementById('generate-modal').addEventListener('click', function (event) {
        if (event.target === this) {
            this.style.display = 'none';
        }
    });
}

// ============================================================
// DATA SOURCE UI
// Swaps notice text and "Demo Data" badges depending on whether
// backend_data.js (real backend output) was loaded.
// ============================================================

function renderDataSourceUI() {
    const notice = document.getElementById('data-source-notice');
    const algoBadge = document.getElementById('algo-badge');
    const algoNote = document.getElementById('algo-note-text');
    const conflictBadge = document.getElementById('conflict-badge');
    const conflictNote = document.getElementById('conflict-note-text');
    const generateModalStatus = document.getElementById('generate-modal-status');

    if (usingRealData) {
        notice.textContent = 'Showing real output from backend/main.cpp (Monday column = backend time slots).';
        algoBadge.textContent = 'Live Backend Data';
        algoNote.textContent = 'These values come directly from backend_data.js, generated the last time backend/main.cpp was run.';
        conflictBadge.textContent = 'Live Backend Data';
        conflictNote.textContent = 'These conflicts were detected by backend/graph.cpp\'s buildConflictGraph().';
        generateModalStatus.textContent = 'The timetable above is live backend output. Re-run backend/main.cpp and reload the page to refresh it.';
    } else {
        notice.textContent = 'Showing demonstration data. Compile and run backend/main.cpp to generate backend_data.js with real results.';
    }
}

// ============================================================
// ALGORITHM COMPARISON CARDS
// Filled in with real numbers once backend_data.js is loaded.
// ============================================================

function renderAlgoComparison() {
    if (!usingRealData) return;

    function fill(prefix, result) {
        const scheduledCount = result.schedule.filter(function (s) { return s.scheduled; }).length;
        const slotsUsed = new Set(
            result.schedule.filter(function (s) { return s.scheduled; }).map(function (s) { return s.timeSlot; })
        ).size;

        document.getElementById(prefix + '-scheduled').textContent = scheduledCount + ' / ' + result.schedule.length;
        document.getElementById(prefix + '-slots').textContent = slotsUsed + ' / ' + backendData.slotLabels.length;
        document.getElementById(prefix + '-conflicts').textContent = backendData.conflicts.length;
        document.getElementById(prefix + '-time').textContent = result.executionTimeMs.toFixed(4) + ' ms';
    }

    fill('greedy', backendData.greedy);
    fill('improved', backendData.priority);
}

// ============================================================
// INITIALISE
// Called once when the page finishes loading.
// ============================================================

function init() {
    renderDataSourceUI();
    renderTimetable();
    renderSummaryCards();
    renderAlgoComparison();
    renderCoursesTable();
    renderFacultyTable();
    renderRoomsTable();
    initNavigation();
    initAddCourse();
    initAddRoom();
    initConflictButton();
    initGenerateButton();
}

document.addEventListener('DOMContentLoaded', init);
