// New file added to connect the backend to the frontend.
// It only *writes out* data that main.cpp already computed — it does not
// implement or change any scheduling/graph logic in data.cpp, graph.cpp or
// scheduler.cpp.
#ifndef EXPORT_H
#define EXPORT_H

#include "data.h"
#include <string>

// Figures out whether this program is running with its working directory at
// the project root or inside backend/ (both happen in practice — e.g. a
// prebuilt .exe left at the project root vs. compiling and running from
// inside backend/ as the README instructs) and returns the right relative
// path to backend_data.js so it always lands next to index.html.
string resolveBackendDataPath();

// Writes every exam/room/faculty/conflict/schedule result the frontend needs
// into a plain JavaScript file ("backend_data.js") as `const backendData = {...};`.
// index.html loads that file with a <script> tag, so script.js can read
// `backendData` directly (no server / fetch() required).
void exportResultsToJS(
    const char* filePath,
    const Exam exams[],
    int examCount,
    const Faculty faculty[],
    int facultyCount,
    const Room rooms[],
    int roomCount,
    const int conflictGraph[][MAX_EXAMS],
    const ScheduleEntry greedySchedule[],
    bool greedySuccess,
    double greedyTimeMs,
    const ScheduleEntry prioritySchedule[],
    bool prioritySuccess,
    double priorityTimeMs
);

#endif
