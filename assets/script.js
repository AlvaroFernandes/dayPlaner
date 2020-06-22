//Get current day
const currentDay = moment().format("dddd, MMMM Do");

$("#currentDay").text(currentDay);

//check if theres any task on the localstorage.
let dayTasks = [];

dayTasks = JSON.parse(localStorage.getItem("dayTasks"));

if (!dayTasks) {
    dayTasks = [];
}

//create planner table
const tbody = $("tbody");

const startWork = 9;
const finishWork = 17;


for (let i = startWork; i <= finishWork; i++) {

    const tr = $("<tr>");
    const tdHour = $("<td class='hour'>");
    const tdTask = $("<td class='task'>");
    const inputTask = $("<input>");
    const iconSave = $("<i class='icon-save'>");
    const tdSave = $("<td class='saveBtn'></td>");

    if (i >= 9 || i <= 11) {
        tdHour.text(i + "am");
    }
    switch (i) {
        case 12:
            tdHour.text(i + "pm");
            break;
        case 13:
            tdHour.text("1pm");
            break;
        case 14:
            tdHour.text("2pm");
            break;
        case 15:
            tdHour.text("3pm");
            break;
        case 16:
            tdHour.text("4pm");
            break;
        case 17:
            tdHour.text("5pm");
            break;
    }

    inputTask.attr("data-hour", i);
    tdTask.append(inputTask);

    tdSave.append(iconSave);
    tdSave.attr("data-save", i);

    tr.append(tdHour, tdTask, tdSave);

    tbody.append(tr);

}


//function to save tasks.
$(".saveBtn").on("click", function() {

    let btnClicked = $(this).data('save');

    let inputSave = $("input[data-hour='" + btnClicked + "']");

    dayTasks.push({ "hour": btnClicked, "task": inputSave.val() });

    localStorage.setItem("dayTasks", JSON.stringify(dayTasks));

});

//show current tasks when load.
if (dayTasks) {
    $.each(dayTasks, function(idx, val) {
        let ctrl = $("[data-hour=" + val.hour + "]");
        console.log(ctrl);

        let task9Pm = $("input[data-hour='9']");

        task9Pm.val(dayTasks[0].task);

    })

}