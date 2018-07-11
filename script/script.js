var tasks = {};
var element = {};
var tasksList;
var index;
Date.shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function short_months(dt) {
    return Date.shortMonths[dt.getMonth()];
}

function taskList() {

    var today = new Date();
    var full_date = short_months(today) + " " + today.getDate() + " " + today.getYear();

    element["title"] = document.getElementById('new-task').value;
    element["status"] = false;
    element["date"] = full_date;

    var oldItems = JSON.parse(localStorage.getItem('tasksAll')) || [];
    oldItems.push(element);
    localStorage.setItem('tasksAll', JSON.stringify(oldItems));
    var retrievedData = localStorage.getItem("tasksAll");
    tasksList = JSON.parse(retrievedData);
    document.getElementById('new-task').value = '';
    updateData();
}

function updateData() {

    var htmlNotDone = "";
    var htmlDone = "";
    var falseCount = 0;
    if (tasksList != null) {
        for (index = 0; index < tasksList.length; index++) {
            if (tasksList[index].status == false) {
                falseCount++;

                htmlNotDone += '<div class="task-element">';
                htmlNotDone += '<div class="task-left-element"><p>' + tasksList[index].date + '</p><h4>' + tasksList[index].title + '</h4></div>';
                htmlNotDone += '<div class="task-right-element">';
                htmlNotDone += '<a href="javascript:void(0);" onclick="changeStatus(' + index + ');"><span class="check-mark">&#10003;</span></a>';
                htmlNotDone += '</div>';
                htmlNotDone += '</div>';

            } else {
                htmlDone += '<h4>' + tasksList[index].title + '</h4>';
            }
        }
    }
    //tasks list
    if (htmlNotDone === "") {
        document.getElementById("task-list").innerHTML = "<p>Neatliktu uzduociu nera</p>";
    } else {
        document.getElementById("task-list").innerHTML = htmlNotDone;
    }
    if (htmlDone === "") {
        document.getElementById("done-task-list").innerHTML = "<p>Atliktu uzduociu nera</p>";
    } else {
        document.getElementById("done-task-list").innerHTML = htmlDone;
    }
    //tasks count
    if (tasksList != null) {
        document.getElementById("task-count").innerHTML = "- " + falseCount + "/" + tasksList.length + " (" + (falseCount * 100 / tasksList.length).toFixed(2) + "%)";
        document.getElementById("done-task-count").innerHTML = "- " + (tasksList.length - falseCount) + "/" + tasksList.length + " (" + ((tasksList.length - falseCount) * 100 / tasksList.length).toFixed(2) + "%)";
    }
}

function changeStatus(index) {
    tasksList[index].status = true;
    localStorage.setItem("tasksAll", JSON.stringify(tasksList));
    updateData();
}
var retrievedData = localStorage.getItem("tasksAll");
tasksList = JSON.parse(retrievedData);
updateData();