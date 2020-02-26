

//this should happen when create btn is clicked
function generateNewTaskMarkup() {
    const title = document.getElementById("taskTitleInput").value;
    //get the current date when task is created
    const date = moment().format('LLL');
    const description = document.getElementById("taskDescrInput").value;
    //get the priority level from fieldset. use it to apply a class to "card" div, used to style color
    const priorityLvl;
    //plug the above values into the template, render to taskList.
    const taskCardTemplate = ` 
<div class="cell small-12">
    <div class="card ${priorityLvl}" style="width: 100%;">
        <div class="card-divider">
            <h5 class="text-center" id="taskTitle"> ${title} </h5>
        </div>
        <div class="card-section">
            <p id="taskStartDate"> ${date} </p>
        </div>
        <div class="card-section">
            <p id="taskDesc"> ${description} </p>
        </div>
        <div class="card-section">
            <button class="button large" id="setTaskActive">Set As Active</button>
            <button class="button large" id="markTaskCompl">Mark Complete</button>
        </div>
    </div>
</div>
`
return taskCardTemplate
};