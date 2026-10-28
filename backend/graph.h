// creating a conflict graph , each student is a node and is mapped with A subject 
// in which he is enrolled , multiple mappings means conflict as a student cant give 2 exams on a same day 

#ifndef GRAPH_H 
#define GRAPH_H 
#include "data.h"

bool examsConflict (const Exam  &a , const Exam &b);
void buildConflictGraph (
    const Exam exams[],
    int examCount ,
    int  graph[][MAX_EXAMS]
);
void displayConflictGraph (
    const Exam exams[] , int examCount , const int graph[][MAX_EXAMS]
);
void depthFirstSearch (
    int current  , 
    int examCount ,
    const Exam exams [] , const int graph[][MAX_EXAMS], bool visited []
);

#endif