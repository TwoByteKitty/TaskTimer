function setActiveTask(event) {
    console.log(event);
    $.ajax({ method: "PUT", url: `/tasks/api/setactive/${event.currentTarget.dataset.taskId}` })
        .done((task) => {
            console.log(task);
            $(".markActiveBtn").removeAttr("disabled");
            $(event.currentTarget).attr("disabled", true);
            $(".activeTitleDisp").text(task.title);

        })
};

function completeTask(event) {
    console.log(event);
    $.ajax({ method: "PUT", url: `/tasks/api/complete/${event.currentTarget.dataset.taskId}?dateCompleted=${moment().format('LLLL')}` })
        .done((task) => {
            console.log(task);
            $(`#${event.currentTarget.dataset.taskId}`).addClass("hide")
        })
};

export function initTaskList() {
    $(".markActiveBtn").on("click", setActiveTask)
    $(".markComplBtn").on("click", completeTask)
};

export function initTaskCreate() {
    document.getElementById("dateTaskCreated").value = moment().format('LLLL');
};

