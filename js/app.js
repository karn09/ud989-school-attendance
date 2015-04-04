/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */

/**
 * Student attendance MODEL
 */
var model = {
  init: function(){
    if (!localStorage.attendance) {
      console.log('Creating attendance records...');
      localStorage.attendance = JSON.stringify(model.addRecords());
    } else {
      console.log('Records already available.')
    }
  },
  addRecords: function(){
    var attendance = {};
    this.students.forEach(function (name) {
      attendance[name] = [];
      for (var i = 0; i < model.days; i++) {
        attendance[name].push(model.getRandom())
      }
    })
    return attendance;
  },
  getRandom: function() {
    return (Math.random() >= 0.5);
  },
  students: ['Slappy the Frog', 'Lilly the Lizard', 'Paulrus the Walrus', 'Gregory the Goat', 'Adam the Anaconda'],
  days: 12,
  attendance: JSON.parse(localStorage.attendance),
  saveRecords: function() {
    localStorage.attendance = JSON.stringify(model.attendance);
  }
};

var control = {
  init: function() {
    model.init();
    view.init();
  },
  getStudents: function() {
    return model.students;
  },
  getDays: function() {
    return model.days;
  },
  setDays: function(num) {
    model.days = num;
  },
  getRecords: function(){
    return model.attendance;
  },
  setRecord: function(name, bool, day) {
    model.attendance[name][day] = bool;
    model.saveRecords();
    view.renderMissingDays();
  },
  countDaysMissing: function(name) {
    var records = this.getRecords();
    var days = this.getDays();
    var count = 0;
    
    for (var i = 0; i < days; i++) {
      if (records[name][i] === false) {
        count++;
      }
    }
    return count;
  },
  handleClickEvent: function(element, name, day) {
    element.addEventListener('click', function() {
      control.setRecord(name, this.checked, day);
    })
  }
}

var view = {
  init: function() {
    this.nameColElement = document.getElementsByClassName('name-col')

    this.render();
  }, 
  render: function() {
    this.renderHeaderRow();
    this.renderColumns();
    this.renderMissingDays();
  },
  renderHeaderRow: function() {
    var missedColElement = document.getElementById('missed-col')
    var parentNode = missedColElement.parentNode;
    
    for (var i = 1; i <= model.days; i++) {
      var day = document.createElement('th');
      var th = parentNode.insertBefore(day, missedColElement);
      th.innerHTML = i
    }    
  },
  renderColumns: function() {
    var records = control.getRecords();
    var students = control.getStudents();
    
    var studentsElement = document.getElementById('students');
    
    for (var j = 0; j < students.length; j++) {
      var table = document.createElement('tr')
      studentsElement.appendChild(table);
      var name = document.createElement('td');
      name.innerHTML = students[j];
      table.appendChild(name)
      for (var i = 0; i < model.days; i++) {
        var attend = document.createElement('td');
        var input = document.createElement('input')
        input.type = 'checkbox';
        input.checked = records[students[j]][i];
        control.handleClickEvent(input, students[j], i);
        attend = table.appendChild(attend);
        attend.appendChild(input);
        
      }
      var missingCol = document.createElement('td');
      missingCol.className = 'missed-col';
      table.appendChild(missingCol)
    }
  },
  renderMissingDays: function(){
    var missingDayElem = document.getElementsByClassName('missed-col');
    var students = control.getStudents();
    
    for (var i = 0; i < students.length; i++) {
      missingDayElem[i].innerHTML = control.countDaysMissing(students[i]);    
    }
  }
  
}
control.init();

//console.log(model.addRecords())
// (function() {
//     if (!localStorage.attendance) {
//         console.log('Creating attendance records...');
//         function getRandom() {
//             return (Math.random() >= 0.5);
//         }

//         var nameColumns = $('tbody .name-col'),
//             attendance = {};

//         nameColumns.each(function() {
//             var name = this.innerText;
//             attendance[name] = [];

//             for (var i = 0; i <= 11; i++) {
//                 attendance[name].push(getRandom());
//             }
//         });

//         localStorage.attendance = JSON.stringify(attendance);
//     }
// }());


// /* STUDENT APPLICATION */
// $(function() {
//     var attendance = JSON.parse(localStorage.attendance),
//         $allMissed = $('tbody .missed-col'),
//         $allCheckboxes = $('tbody input');

//     // Count a student's missed days
//     function countMissing() {
//         $allMissed.each(function() {
//             var studentRow = $(this).parent('tr'),
//                 dayChecks = $(studentRow).children('td').children('input'),
//                 numMissed = 0;

//             dayChecks.each(function() {
//                 if (!$(this).prop('checked')) {
//                     numMissed++;
//                 }
//             });

//             $(this).text(numMissed);
//         });
//     }

//     // Check boxes, based on attendace records
//     $.each(attendance, function(name, days) {
//         var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
//             dayChecks = $(studentRow).children('.attend-col').children('input');

//         dayChecks.each(function(i) {
//             $(this).prop('checked', days[i]);
//         });
//     });

//     // When a checkbox is clicked, update localStorage
//     $allCheckboxes.on('click', function() {
//         var studentRows = $('tbody .student'),
//             newAttendance = {};

//         studentRows.each(function() {
//             var name = $(this).children('.name-col').text(),
//                 $allCheckboxes = $(this).children('td').children('input');

//             newAttendance[name] = [];

//             $allCheckboxes.each(function() {
//                 newAttendance[name].push($(this).prop('checked'));
//             });
//         });

//         countMissing();
//         localStorage.attendance = JSON.stringify(newAttendance);
//     });

//     countMissing();
// }());
