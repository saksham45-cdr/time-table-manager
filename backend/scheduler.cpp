#include "scheduler.h"
bool isValidSlot (
    int examIndex , int slot , int examCount , 
    const int graph[][MAX_EXAMS] , const ScheduleEntry schedule[]
) {
    for (int i=0 ; i<examCount ;i++){
        if (graph[examIndex][i] == 1 && schedule[i].scheduled && schedule[i].timeSlot == slot){
            return false ;
        }
    }
    return true ;
}
// this function checks three conditions , if any one of these is true , then the slot is invalid 
// and it returns false 
int allocateRoom(
    int examIndex,
    int slot,
    const Exam exams[],
    int examCount,
    const Room rooms[],
    int roomCount,
    const ScheduleEntry schedule[]
) {
    for (int r = 0; r < roomCount; r++) {

        // Check whether the room has enough seats
        if (rooms[r].capacity < exams[examIndex].studentCount) {
            continue;
        }

        bool roomOccupied = false;

        // Check whether this room is already booked in this slot
        for (int i = 0; i < examCount; i++) {

            if (schedule[i].scheduled &&
                schedule[i].timeSlot == slot &&
                schedule[i].roomIndex == r) {

                roomOccupied = true;
                break;
            }
        }

        // Return the first suitable room
        if (!roomOccupied) {
            return r;
        }
    }

    // No suitable room was found
    return -1;
}
// this function allocates the rooms to students based on their capacity by checking some conditions 
// and parameters 
// the conditions are : skipping an undersized room , check if it is already booked 
// and then report failure 

bool greedySchedule(
    const Exam exams[],
    int examCount,
    const Room rooms[],
    int roomCount,
    const int graph[][MAX_EXAMS],
    ScheduleEntry schedule[],
    int slotCount
) {
    // Step 1: Mark all exams as unscheduled
    for (int i = 0; i < examCount; i++) {
        schedule[i].examIndex = i;
        schedule[i].timeSlot = -1;
        schedule[i].roomIndex = -1;
        schedule[i].scheduled = false;
    }

    // Step 2: Schedule exams one by one
    for (int i = 0; i < examCount; i++) {

        // Try each available time slot
        for (int slot = 0; slot < slotCount; slot++) {

            // Check for student or invigilator conflicts
            if (!isValidSlot(
                    i, slot, examCount, graph, schedule)) {
                continue;
            }

            // Find a suitable room
            int room = allocateRoom(
                i, slot,
                exams, examCount,
                rooms, roomCount,
                schedule
            );

            // Assign the exam if a room is available
            if (room != -1) {
                schedule[i].timeSlot = slot;
                schedule[i].roomIndex = room;
                schedule[i].scheduled = true;

                break;
            }
        }
    }

    // Step 3: Check whether every exam was scheduled
    for (int i = 0; i < examCount; i++) {
        if (!schedule[i].scheduled) {
            return false;
        }
    }

    return true;
}
// this is a greedy algorithm that is helping tpo take care of the assignment of rooms to exam slots 
// the algorithm is as follows :
// start with first exam 
// try first available time slot 
// check conflicts using  isvalidslot function 
// find room using allocateroom function 
// assign the exam and proceed to next exam 

// why it is greedy ? because it chosses the first feasible assignment rather than expolring every possible combination like backtracking 

void displaySchedule(
    const Exam exams[],
    int examCount,
    const Room rooms[],
    const ScheduleEntry schedule[]
) {
    const char* slotNames[MAX_SLOTS] = {
        "9-10 AM",
        "10-11 AM",
        "11 AM-12 PM",
        "12-1 PM",
        "2-3 PM",
        "3-4 PM"
    };

    cout << "\n===== GENERATED TIMETABLE =====\n";

    for (int i = 0; i < examCount; i++) {
        cout << "\nCourse: " << exams[i].courseCode;

        if (schedule[i].scheduled) {
            cout << "\nTime: "
                 << slotNames[schedule[i].timeSlot];

            cout << "\nRoom: "
                 << rooms[schedule[i].roomIndex].name;
        }
        else {
            cout << "\nStatus: Unscheduled";
        }

        cout << "\n";
    }
}

static void heapifyDown(
    int heap[],
    int heapSize,
    int root,
    const int degree[]
) {
    int largest = root;
    int left = 2 * root + 1;
    int right = 2 * root + 2;

    if (left < heapSize &&
        degree[heap[left]] > degree[heap[largest]]) {
        largest = left;
    }

    if (right < heapSize &&
        degree[heap[right]] > degree[heap[largest]]) {
        largest = right;
    }

    if (largest != root) {
        int temp = heap[root];
        heap[root] = heap[largest];
        heap[largest] = temp;

        heapifyDown(heap, heapSize, largest, degree);
    }
}
static void buildMaxHeap(
    int heap[],
    int heapSize,
    const int degree[]
) {
    for (int i = heapSize / 2 - 1; i >= 0; i--) {
        heapifyDown(heap, heapSize, i, degree);
    }
}
// this functions is creating a max heap in which the parent must have priority at least as high as either childn 
// left child is placed on 2i +1 and right child at 2i+2 

static int extractMax(
    int heap[],
    int &heapSize,
    const int degree[]
) {
    // Check whether the heap is empty
    if (heapSize == 0) {
        return -1;
    }

    // The root contains the highest-priority exam
    int highestPriorityExam = heap[0];

    // Move the last element to the root
    heap[0] = heap[heapSize - 1];

    // Reduce the heap size
    heapSize--;

    // Restore the max-heap property
    if (heapSize > 0) {
        heapifyDown(heap, heapSize, 0, degree);
    }

    return highestPriorityExam;
}

// this function is like deleting an element from the heap , we can extract only 
// the root element and then we may re heapify the tree to get the order of priority 
// every time 

bool prioritySchedule(
    const Exam exams[],
    int examCount,
    const Room rooms[],
    int roomCount,
    const int graph[][MAX_EXAMS],
    ScheduleEntry schedule[],
    int slotCount
) {
    int heap[MAX_EXAMS];
    int degree[MAX_EXAMS] = {};

    // Initialise the schedule and calculate exam degrees
    for (int i = 0; i < examCount; i++) {
        schedule[i].examIndex = i;
        schedule[i].timeSlot = -1;
        schedule[i].roomIndex = -1;
        schedule[i].scheduled = false;

        heap[i] = i;

        for (int j = 0; j < examCount; j++) {
            if (graph[i][j] == 1) {
                degree[i]++;
            }
        }
    }

    // Arrange exams by descending conflict degree
    buildMaxHeap(heap, examCount, degree);

    int heapSize = examCount;
    bool allScheduled = true;

    // Process exams from highest to lowest priority
    while (heapSize > 0) {
        int examIndex = extractMax(heap, heapSize, degree);
        bool assigned = false;

        for (int slot = 0; slot < slotCount; slot++) {

            if (!isValidSlot(
                    examIndex, slot, examCount, graph, schedule)) {
                continue;
            }

            int room = allocateRoom(
                examIndex, slot,
                exams, examCount,
                rooms, roomCount,
                schedule
            );

            if (room != -1) {
                schedule[examIndex].timeSlot = slot;
                schedule[examIndex].roomIndex = room;
                schedule[examIndex].scheduled = true;

                assigned = true;
                break;
            }
        }

        if (!assigned) {
            allScheduled = false;
        }
    }

    return allScheduled;
}

// this function works in mainly 4 stages :
// 1. calculate conflict degrres 2. build the max heap  3. extract  schedule  4. report sucess 

