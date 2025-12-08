// assignment class
class Assignment {
  constructor(assignmentName) {
    this.assignmentName = assignmentName;
    this.status = "released";
    this._grade = null;
  }

  setGrade(grade) {
    this._grade = grade;


// ppass/fail logic 
    if (grade > 50) {
      this.status = "pass";
    } else {
      this.status = "fail";
    }
  }

  _getGradeInternal() {
    return this._grade;
  }
}

// observer class
class Observer {
  notify(student, assignmentName, status) {
    var studentName = student.fullName;
    var message;

    if (status === "released") {
      message = studentName + ", " + assignmentName + " has been released.";
    } else if (status === "working") {
      message = studentName + " is working on " + assignmentName + ".";
    } else if (status === "submitted") {
      message = studentName + " has submitted " + assignmentName + ".";
    } else if (status === "pass") {
      message = studentName + " has passed " + assignmentName;
    } else if (status === "fail") {
      message = studentName + " has failed " + assignmentName;
    } else if (status === "final reminder") {
      message = studentName + ", " + assignmentName + " final reminder sent.";
    } else {
      message =
        studentName +
        ", " +
        assignmentName +
        " status updated to " +
        status +
        ".";
    }

    console.log("Observer \u2192 " + message);
  }
}

// student class
class Student {
  constructor(fullName, email, observer) {
    this.fullName = fullName;
    this.email = email;
    this.assignmentStatuses = [];
    this.overallGrade = 0;
    this._observer = observer;


    this._workTimers = {};
    this._gradeTimers = {};
  }

  setFullName(fullName) {
    this.fullName = fullName;
  }

  setEmail(email) {
    this.email = email;
  }

  _findAssignment(assignmentName) {
    for (var i = 0; i < this.assignmentStatuses.length; i++) {
      if (this.assignmentStatuses[i].assignmentName === assignmentName) {
        return this.assignmentStatuses[i];
      }
    }
    return null;
  }

  _createAssignmentIfNeeded(assignmentName) {
    var assignment = this._findAssignment(assignmentName);
    if (!assignment) {
      assignment = new Assignment(assignmentName);
      this.assignmentStatuses.push(assignment);
    }
    return assignment;
  }

  _notifyStatus(assignmentName, status) {
    if (this._observer) {
      this._observer.notify(this, assignmentName, status);
    }
  }

  _recalculateOverallGrade() {
    var total = 0;
    var count = 0;

    for (var i = 0; i < this.assignmentStatuses.length; i++) {
      var g = this.assignmentStatuses[i]._getGradeInternal();
      if (g !== null && g !== undefined) {
        total += g;
        count++;
      }
    }

    if (count === 0) {
      this.overallGrade = 0;
    } else {
      this.overallGrade = total / count;
    }
  }

  updateAssignmentStatus(name, grade) {
    var assignment = this._createAssignmentIfNeeded(name);

    if (grade === undefined || grade === null) {
      assignment.status = "released";
      this._notifyStatus(name, "released");
    } else {
      assignment.setGrade(grade);
      this._recalculateOverallGrade();
      if (assignment.status === "pass") {
        this._notifyStatus(name, "pass");
      } else {
        this._notifyStatus(name, "fail");
      }
    }
  }

  getAssignmentStatus(name) {
    var assignment = this._findAssignment(name);
    if (!assignment) {
      return "Hasn't been assigned";
    }

    var grade = assignment._getGradeInternal();
    if (grade === null || grade === undefined) {
      return assignment.status;
    }

    if (grade > 50) {
      assignment.status = "Pass";
      return "Pass";
    } else {
      assignment.status = "Fail";
      return "Fail";
    }
  }

  getGrade() {
    this._recalculateOverallGrade();
    return this.overallGrade;
  }

  startWorking(assignmentName) {
    var assignment = this._createAssignmentIfNeeded(assignmentName);

    if (
      assignment.status === "submitted" ||
      assignment.status === "pass" ||
      assignment.status === "fail"
    ) {
      return;
    }

    assignment.status = "working";
    this._notifyStatus(assignmentName, "working");

    if (this._workTimers[assignmentName]) {
      clearTimeout(this._workTimers[assignmentName]);
    }

    var self = this;
    var timerId = setTimeout(function () {
      var current = self._findAssignment(assignmentName);
      if (!current) {
        return;
      }

      if (
        current.status === "submitted" ||
        current.status === "pass" ||
        current.status === "fail"
      ) {
        return;
      }

      self.submitAssignment(assignmentName);
    }, 500);

    this._workTimers[assignmentName] = timerId;
  }

  submitAssignment(assignmentName) {
    var assignment = this._createAssignmentIfNeeded(assignmentName);

    if (assignment.status === "pass" || assignment.status === "fail") {
      return;
    }

    if (this._workTimers[assignmentName]) {
      clearTimeout(this._workTimers[assignmentName]);
      delete this._workTimers[assignmentName];
    }

    assignment.status = "submitted";
    this._notifyStatus(assignmentName, "submitted");

    if (this._gradeTimers[assignmentName]) {
      clearTimeout(this._gradeTimers[assignmentName]);
    }

    var self = this;
    var gradeTimerId = setTimeout(function () {
      var grade = Math.floor(Math.random() * 101);
      assignment.setGrade(grade);
      self._recalculateOverallGrade();

      if (assignment.status === "pass") {
        self._notifyStatus(assignmentName, "pass");
      } else {
        self._notifyStatus(assignmentName, "fail");
      }
    }, 500);

    this._gradeTimers[assignmentName] = gradeTimerId;
  }

  handleFinalReminder(assignmentName) {
    var assignment = this._createAssignmentIfNeeded(assignmentName);

    if (assignment.status === "pass" || assignment.status === "fail") {
      return;
    }

    assignment.status = "final reminder";
    this._notifyStatus(assignmentName, "final reminder");

    this.submitAssignment(assignmentName);
  }
}

// class list class
class ClassList {
  constructor(observer) {
    this.students = [];
    this._observer = observer;
  }

  addStudent(student) {
    this.students.push(student);
    console.log(student.fullName + " has been added to the classlist.");
  }

  removeStudent(studentOrName) {
    var name =
      typeof studentOrName === "string"
        ? studentOrName
        : studentOrName.fullName;

    var newList = [];
    for (var i = 0; i < this.students.length; i++) {
      if (this.students[i].fullName !== name) {
        newList.push(this.students[i]);
      }
    }
    this.students = newList;
  }

  findStudentByName(name) {
    for (var i = 0; i < this.students.length; i++) {
      if (this.students[i].fullName === name) {
        return this.students[i];
      }
    }
    return null;
  }

  findOutstandingAssignments(assignmentName) {
    var result = [];
    var i, j;

    if (assignmentName === undefined || assignmentName === null) {
      for (i = 0; i < this.students.length; i++) {
        var student = this.students[i];
        var hasOutstanding = false;

        for (j = 0; j < student.assignmentStatuses.length; j++) {
          var a = student.assignmentStatuses[j];
          if (
            a.status === "released" ||
            a.status === "working" ||
            a.status === "final reminder"
          ) {
            hasOutstanding = true;
            break;
          }
        }

        if (hasOutstanding) {
          result.push(student.fullName);
        }
      }
      return result;
    }

    for (i = 0; i < this.students.length; i++) {
      var s = this.students[i];
      var assignment = s._findAssignment(assignmentName);

      if (!assignment) {
        result.push(s.fullName);
      } else if (
        assignment.status !== "submitted" &&
        assignment.status !== "pass" &&
        assignment.status !== "fail"
      ) {
        result.push(s.fullName);
      }
    }

    return result;
  }

  releaseAssignmentsParallel(assignmentNames) {
    var allPromises = [];
    var i, j;

    for (i = 0; i < assignmentNames.length; i++) {
      (function (assignmentName) {
        var p = new Promise(function (resolve) {
          setTimeout(
            function () {
              for (j = 0; j < this.students.length; j++) {
                this.students[j].updateAssignmentStatus(assignmentName);
              }
              resolve();
            }.bind(this),
            0
          );
        }.bind(this));

        allPromises.push(p);
      }.call(this, assignmentNames[i]));
    }

    return Promise.all(allPromises);
  }

  sendReminder(assignmentName) {
    for (var i = 0; i < this.students.length; i++) {
      var student = this.students[i];
      var assignment = student._findAssignment(assignmentName);

      var completed =
        assignment &&
        (assignment.status === "pass" || assignment.status === "fail");

      if (!completed) {
        student.handleFinalReminder(assignmentName);
      }
    }
  }
}

// === Example Usage ===
// copied example test case from instructions, can be uncommented to test

/* const observer = new Observer();
const classList = new ClassList(observer);

const s1 = new Student("Alice Smith", "alice@example.com", observer);
const s2 = new Student("Bob Jones", "bob@example.com", observer);

classList.addStudent(s1);
classList.addStudent(s2);

classList.releaseAssignmentsParallel(["A1", "A2"]).then(() => {
  s1.startWorking("A1");
  s2.startWorking("A2");

  setTimeout(() => classList.sendReminder("A1"), 200);
}); 
 */