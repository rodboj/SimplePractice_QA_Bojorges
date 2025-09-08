# Tasks Checklist (Happy Path Scenarios)

## Pre-requisites
- Login to the application with valid user credentials  
- On the Application, go to the **Tasks** section  


## Test Scenarios

| Section | Test Scenario (Happy Path) | Expected Outcome |
|-------------------|----------------------------|------------------|
| Verify   | Open the Task page if there are no incomplete tasks | The Task page loads successfully and displays the: Header, buttons, filters and the good work banner. |
| Verify   | Open the Task page and verify it loads correctly with incompleted tasks data | The Task page loads successfully and displays the: Header, default task list, buttons and dropdowns and an extra quick task button. |
| Create   | Create a task with valid title and description | The task is saved and appears in the pending tasks list. |
| Create   | Create a task with valid due date and time | The task displays the assigned due date correctly. |
| Create   | Create a task assigned to an existing client | The task is correctly associated with the client. |
| Create   | Create a task assigned to an employee | The task is correctly assigned to an employee. |
| Create   | Create a task with attachments | The task is saved and has correctly the attached file. |
| Complete | Mark a task as completed | The task appears in the completed tasks view. |
| Complete | Complete multiple tasks in sequence | All selected tasks change status to 'Completed'. |
| View     | Filter tasks by status 'Incomplete' | Only pending tasks are displayed. |
| View     | Filter tasks by status 'Completed' | Only completed tasks are displayed. |
| View     | Filter tasks by status 'All' | All the tasks are correctly displayed. |
| View     | Sort tasks by Priority | Tasks are sorted in order by Critical, High, Medium, Low and with no status. |
| View     | Sort tasks by Date created | Tasks are ordered from earliest to latest creation date. |
| View     | Sort tasks by Due date | Tasks are ordered from earliest to latest due date. |
| Edit     | Edit the title and description of an existing task | The changes are saved and visible in the task list. (Edit only applies for incompleted tasks; tasks can have a duplicated name) |
| Edit     | Reassign the due date of a task | The new due date is correctly updated. (Edit only applies for incompleted tasks) |
| Edit     | Edit all other Task Fields | The changes are saved and visible in the task list. (Edit only applies for incompleted tasks) |
| Delete   | Delete an existing task | The task disappears from the list and is no longer accessible. |
