// Here in this file we are dumping the related data to be processed by our algorithm and return the output , 
// it is not user - input based for now as itr is a algorotihm and concept testing 
// and not an end product 

#include "data.h"

void loadSampleData(
    Exam exams[], int &examCount,
    Faculty faculty[], int &facultyCount,
    Room rooms[], int &roomCount
) {
    examCount = 4;
    facultyCount = 3;
    roomCount = 2;

    // Exam 1
    exams[0] = {
        101, "CS101", "Programming Basics",
        1, 3, {1, 2, 3}
    };

    // Exam 2
    exams[1] = {
        102, "MA101", "Discrete Mathematics",
        2, 3, {2, 4, 5}
    };

    // Exam 3
    exams[2] = {
        103, "CS201", "Data Structures",
        1, 3, {6, 7, 8}
    };

    // Exam 4
    exams[3] = {
        104, "PH101", "Physics",
        3, 2, {9, 10}
    };

    // Faculty records
    faculty[0] = {1, "Dr. Sharma"};
    faculty[1] = {2, "Dr. Verma"};
    faculty[2] = {3, "Dr. Gupta"};

    // Room records
    rooms[0] = {1, "Room A", 3};
    rooms[1] = {2, "Room B", 5};
}

void displayData(
    const Exam exams[], int examCount,
    const Faculty faculty[], int facultyCount,
    const Room rooms[], int roomCount
) {
    cout << "\n===== EXAMINATION DATA =====\n";

    for (int i = 0; i < examCount; i++) {
        cout << "\nExam ID: " << exams[i].id;
        cout << "\nCourse: " << exams[i].courseCode;
        cout << " - " << exams[i].courseName;
        cout << "\nInvigilator ID: "
             << exams[i].invigilatorId;

        cout << "\nStudents: ";

        for (int j = 0; j < exams[i].studentCount; j++) {
            cout << exams[i].studentIds[j] << " ";
        }

        cout << "\n";
    }

    cout << "\n===== FACULTY =====\n";

    for (int i = 0; i < facultyCount; i++) {
        cout << faculty[i].id << " - "
             << faculty[i].name << "\n";
    }

    cout << "\n===== ROOMS =====\n";

    for (int i = 0; i < roomCount; i++) {
        cout << rooms[i].name
             << " | Capacity: "
             << rooms[i].capacity << "\n";
    }
}