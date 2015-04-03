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
      localStorage.attendance = JSON.stringify(addRecords());
    } else {
      getRecords();
    }
  },
  addRecords: function(){
    var attendance = {};
    this.students.forEach(function (name) {
      attendance[name] = [];
      for (var i = 0; i < 11; i++) {
        attendance[name].push(model.getRandom())
      }
    })
    return attendance;
  },
  getRecords: function(){
    return localStorage.attedance;
  },
  getRandom: function() {
    return (Math.random() >= 0.5);
  },
  students: ['Slappy the Frog', 'Lilly the Lizard', 'Paulrus the Walrus	', 'Gregory the Goat', 'Adam the Anaconda']
  
}
console.log(model.addRecords())
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
