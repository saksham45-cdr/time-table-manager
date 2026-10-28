// in this file we are declaring all the structs required thorughout the project as
// we are not using any database for this project to store fields we have to describe fields as struct 


#ifndef DATA_H
#define DATA_H
#include <iostream>
#include <string>

using namespace std ;

const int MAX_EXAMS = 10 ;
const int MAX_FACULTY = 10 ;
const int MAX_ROOMS = 5 ;
const int MAX_STUDENTS_PER_EXAM = 20 ;
const int MAX_SLOTS = 6 ;

struct Exam {
    int id ;
    string courseCode ;
    string courseName ;
    int invigilatorId ;
    int studentCount ;
    int studentIds[MAX_STUDENTS_PER_EXAM];
};
struct Faculty {
    int id ;
    string name ;
};
struct Room {
    int id ;

    string name ;
    int capacity;
};
struct ScheduleEntry {
    int examIndex ;
    int timeSlot ;
    int roomIndex ;
    bool scheduled ;
};
void loadSampleData (
    Exam exam [] , int &examCount ,  Faculty faculty[] , 
    int &facultyCount , Room rooms[] , int &roomCount 
);
void displayData(
    const Exam exams[] , int examCount ,  const Faculty faculty[] , int facultyCount ,
    const Room rooms[] , int roomCount 
);
#endif 