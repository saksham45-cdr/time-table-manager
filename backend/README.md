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

---

## How to Compile

Open a terminal inside the `backend/` directory.

### Linux / macOS
```bash
g++ -std=c++17 -o scheduler main.cpp data.cpp graph.cpp scheduler.cpp
./scheduler
```

### Windows (MinGW / Git Bash)
```cmd
g++ -std=c++17 -o scheduler.exe main.cpp data.cpp graph.cpp scheduler.cpp
scheduler.exe
```

### Windows (MSVC via Developer Command Prompt)
```cmd
cl /std:c++17 /EHsc main.cpp data.cpp graph.cpp scheduler.cpp /Fe:scheduler.exe
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

1. Run the C++ program and choose option 3 or 4.
2. Note the schedule output printed to the terminal.
3. Open `script.js` in the project root.
4. Update the `scheduleData` object at the top of the file with the real results.
5. Reload `index.html` in the browser to see the real schedule.

The frontend `scheduleData` format is:
```js
scheduleData['Monday']['9-10 AM'] = {
    course:  'Data Structures',
    faculty: 'Dr. R. Sharma',
    room:    'A101',
    color:   '#dbeafe'
};
```

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
