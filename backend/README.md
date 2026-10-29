# C++ Backend — University Exam Scheduler

## File Descriptions

| File            | Purpose                                                              |
|-----------------|----------------------------------------------------------------------|
| `main.cpp`      | Entry point. Menu-driven program to run and test each feature.       |
| `data.h`        | Struct definitions: Course, Faculty, Room, Exam, ExamSchedule.       |
| `data.cpp`      | Sample data initialisation and display utilities.                    |
| `graph.h`       | ConflictGraph struct and function declarations.                      |
| `graph.cpp`     | Conflict graph construction (TODO) and DFS traversal (TODO).         |
| `scheduler.h`   | Declarations for all scheduling algorithm functions.                 |
| `scheduler.cpp` | Scheduling algorithm stubs — greedy, heap, backtracking (all TODO).  |
| `export.h` / `export.cpp` | Writes the computed results to `../backend_data.js` for the frontend. Does not implement or change any algorithm. |

---

## How to Compile

Open a terminal inside the `backend/` directory.

### Linux / macOS
```bash
g++ -std=c++17 -o scheduler main.cpp data.cpp graph.cpp scheduler.cpp export.cpp
./scheduler
```

### Windows (MinGW / Git Bash)
```cmd
g++ -std=c++17 -o scheduler.exe main.cpp data.cpp graph.cpp scheduler.cpp export.cpp
scheduler.exe
```

### Windows (MSVC via Developer Command Prompt)
```cmd
cl /std:c++17 /EHsc main.cpp data.cpp graph.cpp scheduler.cpp export.cpp /Fe:scheduler.exe
scheduler.exe
```

The program compiles and runs now even though the algorithms are not implemented.
Unimplemented functions print a "[not yet implemented]" message and return safely.

---

## Functions You Must Implement

The following functions have `// TODO` comments explaining what to do.
**Do not use AI-generated code — implement these yourself.**

### `graph.cpp`

| Function             | What it does                                                     |
|----------------------|------------------------------------------------------------------|
| `buildConflictGraph` | Loops over all exam pairs; adds an edge if they share students.  |
| `dfsTraversal`       | Marks the current node visited and recursively visits neighbours.|

### `scheduler.cpp`

| Function             | What it does                                                            |
|----------------------|-------------------------------------------------------------------------|
| `isSlotValid`        | Returns false if any conflicting exam already occupies the given slot.  |
| `allocateRoom`       | Returns the index of a free room with sufficient capacity.              |
| `greedySchedule`     | Assigns each exam to its first valid slot in order (0 to n-1).         |
| `heapSchedule`       | Builds a max-heap by conflict degree; schedules highest-degree exams first.|
| `backtrackSchedule`  | Recursively assigns slots; undoes the last assignment on conflict.      |

---

## Expected Input and Output

**Input** (set up in `initSampleData` in `data.cpp`):
- `courses` — 6 courses with IDs, names, and student counts.
- `rooms` — 5 rooms with IDs, names, and capacities.
- `exams` — one exam per course (2-hour duration).
- `enrollment` — which students are in which exam (built in `main.cpp`).

**Output** (returned by scheduling functions):
- A `vector<ExamSchedule>`, one entry per exam, containing:
  - `courseId` — which exam this entry is for.
  - `timeSlot` — 0-based index (0 = first slot, 1 = second, ..., 5 = last).
  - `roomId` — the room assigned to this exam.

---

## Connecting the Backend to the Frontend

This is now automatic — `main.cpp` calls `exportResultsToJS()` (in `export.cpp`)
after it runs both scheduling algorithms, which writes `../backend_data.js`
(the project root, next to `index.html`).

1. From inside `backend/`, compile and run the program (see above) —
   this (re)generates `backend_data.js` with your current sample data
   and schedule results.
2. Open or reload `index.html` in the browser.
3. `index.html` loads `backend_data.js` before `script.js`. When present,
   `script.js` replaces every demo table/timetable/conflict list with the
   real backend output automatically — no manual copy-pasting needed.

`export.cpp` only *writes* the data that `main.cpp` already computed; it does
not implement or change any algorithm in `data.cpp`, `graph.cpp` or
`scheduler.cpp`.

Slot index to label mapping:
| Index | Label         |
|-------|---------------|
| 0     | 9-10 AM       |
| 1     | 10-11 AM      |
| 2     | 11 AM-12 PM   |
| 3     | 12-1 PM       |
| 4     | 2-3 PM        |
| 5     | 3-4 PM        |

---

## DAA Concepts Used in This Project

| Concept                  | Where                          |
|--------------------------|--------------------------------|
| Graph representation     | `ConflictGraph` in `graph.h`   |
| DFS traversal            | `dfsTraversal` in `graph.cpp`  |
| Greedy algorithm         | `greedySchedule`               |
| Heap / priority queue    | `heapSchedule`                 |
| Backtracking             | `backtrackSchedule`            |
| Constraint validation    | `isSlotValid`, `allocateRoom`  |
| Time measurement         | `chrono` in `main.cpp`         |
