Udacity Attendance Tracker
==================

Originally the application was a bit of spaghetti code - data was handled and updated from the view, with no separation of controllers. 

Initially I tried to refactor the code in place, but decided to start fresh - but did re-use logic that is now seen within **model.init** and **model.addRecords**

In my refactor I followed an MVC pattern - 

Functions that update/change data directly are in the Model, 

Functions that read from the Model and pipe data into View are placed in the Control. 

However, I'm not sure whether control.setRecord() belongs in the Model or Control. I ended up placing setRecord in Control, as I am calling this function from the View.

View is strictly for rendering logic, where I am dynamically creating a table that will change depending on names and days within model.attendance.

