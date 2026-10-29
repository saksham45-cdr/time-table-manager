// in this file we are using our created functions [ refering from data.cpp file ] 
//and using our structs in main function

#include "data.h"
#include "graph.h"
#include "scheduler.h"
#include "export.h"
#include <chrono>

int main(){
    Exam exams [MAX_EXAMS] {};
    Faculty faculty [MAX_FACULTY]{};
    Room rooms [MAX_ROOMS]{};
    int examCount = 0 ;
    int facultyCount = 0 ;
    int roomCount = 0 ;

    loadSampleData (exams , examCount , faculty , facultyCount , rooms , roomCount);
    displayData (exams , examCount , faculty , facultyCount , rooms , roomCount);
    int conflictGraph[MAX_EXAMS][MAX_EXAMS] = {};

buildConflictGraph(exams, examCount, conflictGraph);

displayConflictGraph(
    exams, examCount, conflictGraph
);

bool visited[MAX_EXAMS] = {};

cout << "\nDFS Traversal: ";

for (int i = 0; i < examCount; i++) {
    if (!visited[i]) {
        depthFirstSearch(
            i, examCount, exams, conflictGraph, visited
        );
    }
}

cout << "\n";


cout << "\n===== GREEDY SCHEDULING =====\n";

ScheduleEntry schedule[MAX_EXAMS]{};

auto greedyStart = chrono::high_resolution_clock::now();
bool success = greedySchedule(
    exams,
    examCount,
    rooms,
    roomCount,
    conflictGraph,
    schedule,
    MAX_SLOTS
);
auto greedyEnd = chrono::high_resolution_clock::now();
double greedyTimeMs = chrono::duration<double, milli>(greedyEnd - greedyStart).count();

if (success) {
    cout << "All exams scheduled successfully.\n";
}
else {
    cout << "Some exams could not be scheduled.\n";
}

displaySchedule(
    exams,
    examCount,
    rooms,
    schedule
);
cout << "\n===== PRIORITY-BASED SCHEDULING =====\n";

ScheduleEntry priorityResult[MAX_EXAMS]{};

auto priorityStart = chrono::high_resolution_clock::now();
bool prioritySuccess = prioritySchedule(
    exams,
    examCount,
    rooms,
    roomCount,
    conflictGraph,
    priorityResult,
    MAX_SLOTS
);
auto priorityEnd = chrono::high_resolution_clock::now();
double priorityTimeMs = chrono::duration<double, milli>(priorityEnd - priorityStart).count();

if (prioritySuccess) {
    cout << "All exams scheduled successfully.\n";
}
else {
    cout << "Some exams could not be scheduled.\n";
}

displaySchedule(
    exams,
    examCount,
    rooms,
    priorityResult
);

    exportResultsToJS(
        resolveBackendDataPath().c_str(),
        exams, examCount,
        faculty, facultyCount,
        rooms, roomCount,
        conflictGraph,
        schedule, success, greedyTimeMs,
        priorityResult, prioritySuccess, priorityTimeMs
    );

    return 0 ;
}