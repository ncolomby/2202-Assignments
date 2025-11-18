function Assignment(title, dueDate) {
    this.title = title;
    this.dueDate = dueDate;
}

Assignment.prototype.printAssignment = function () {
    console.log(' Title: ' + this.title + ' | Due Date: ' + this.dueDate)
};

function Course(courseName, instructor, creditHours, assignments) {
    this.course = courseName;
    this.instructor = instructor;
    this.creditHours = creditHours;
    this.assignments = assignments
}

Course.prototype.courseInfo = function () {
    console.log('Course: ' + this.course + ' | Instructor: ' + this.instructor + ' | Credit Hours: ' + this.creditHours);
    
    console.log('Assignments >>>')
    for (var i = 0; i < this.assignments.length; i++) {
        this.assignments[i].printAssignment();
    }
};

let a1 = new Assignment('Project Proposal', 'Jan 15');
let a2 = new Assignment('Midterm Report', 'Feb 20');
let a3 = new Assignment('Final Report', 'Mar 30');
let a4 = new Assignment('Presentation', 'Apr 10');


let c1 = new Course('Software Engineering', 'Dr. Pepper', 3, [a1, a2]);
let c2 = new Course('Date Science', 'Dr. Evil', 6, [a3, a4]);

c1.courseInfo();
c2.courseInfo();

