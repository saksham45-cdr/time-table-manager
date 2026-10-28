#ifndef SCHEDULER_H
#define SCHEDULER_H

#include "graph.h"

bool isValidSlot(
    int examIndex,
    int slot,
    int examCount,
    const int graph[][MAX_EXAMS],
    const ScheduleEntry schedule[]
);

int allocateRoom(
    int examIndex,
    int slot,
    const Exam exams[],
    int examCount,
    const Room rooms[],
    int roomCount,
    const ScheduleEntry schedule[]
);

bool greedySchedule(
    const Exam exams[],
    int examCount,
    const Room rooms[],
    int roomCount,
    const int graph[][MAX_EXAMS],
    ScheduleEntry schedule[],
    int slotCount
);

void displaySchedule(
    const Exam exams[],
    int examCount,
    const Room rooms[],
    const ScheduleEntry schedule[]
);

bool prioritySchedule(
    const Exam exams[],
    int examCount,
    const Room rooms[],
    int roomCount,
    const int graph[][MAX_EXAMS],
    ScheduleEntry schedule[],
    int slotCount
);
#endif
// this file contains all ther functions that help us determine if the deadlock conditions are 
// occured and to enforce some tasks like display schedule 

