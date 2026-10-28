// implementing examconflict function to be used in graph.h 
#include "graph.h"
bool examsConflict (const Exam &a , const Exam &b){
    if (a.invigilatorId == b.invigilatorId){
        return true ;
    }
    // two exams can't have same invigilator present at once 

    for (int i =0 ; i<a.studentCount ;i++){
        for (int j=0 ; j<b.studentCount ;j++){
            if (a.studentIds[i] == b.studentIds[j]){
                return true ;
            }
        }
    }
    // one  student can't have two different exams at a same time 
    return false ;
}

void buildConflictGraph(
    const Exam exams[] , int examCount , int graph[][MAX_EXAMS]
){
    // n o conflicts in starting point 
    for (int i =0 ; i<MAX_EXAMS ;i++){
        for (int j=0 ;j<MAX_EXAMS ;j++){
            graph[i][j]=0;
        } 
    }
    // check every pair of exam 
    for (int i=0 ;i<examCount ;i++){
        for (int j=i+1 ; j<examCount ;j++){
            if (examsConflict(exams[i], exams[j])){
                graph[i][j]=1;
                graph[j][i]=1 ;
            }
        }
    }
}
// here in last function create conflict graph we started j = i+1 becauise we dpont an element to be compared tro itself 

void displayConflictGraph (
    const Exam exams [] , int examCount , const int graph[][MAX_EXAMS]
){
    cout << "\n------CONFLICT GRAPH-----------\n";
    cout << "\t";
    for (int i=0 ; i<examCount ;i++){
        cout << exams[i].courseCode << "\t";

    }
    cout << "\n";
    for (int i=0 ;i<examCount  ;i++){
        cout << exams[i].courseCode << "\t";
        for (int j=0 ; j<examCount ;j++){
            cout << graph[i][j] << "\t";
        }
        cout << "\n";
    }

}

// implementing a function that performs dfs on the prepared graph 

void depthFirstSearch(
    int current,
    int examCount,
    const Exam exams[],
    const int graph[][MAX_EXAMS],
    bool visited[]
) {
    visited[current] = true;

    cout << exams[current].courseCode << " ";

    for (int i = 0; i < examCount; i++) {
        if (graph[current][i] == 1 && !visited[i]) {
            depthFirstSearch(
                i, examCount, exams, graph, visited
            );
        }
    }
}
// what does dfs does : print current exam visited , visit each connected exam 
// and print them too .
