//// Current Day and Time in header ////

let currentDayEl = $('#currentTime')
currentDayEl.text(moment().format('MM/DD/YYYY'))
let timeEventEl = $('#timeBlocks')
var currentHour = parseInt(moment().format("H"));

//// Setting values for times in an object array ////

var times = [
    {time: "9 AM", value: '9'},
    {time: "10 AM", value: '10'},
    {time: "11 AM", value: '11'},
    {time: "12 PM", value: '12'},
    {time: "1 PM", value: '13'},
    {time: "2 PM", value: '14'},
    {time: "3 PM", value: '15'},
    {time: "4 PM", value: '16'},
    {time: "5 PM", value: '17'},
]

//// for loop generating actual times and events ////

for (var i=0; i<times.length; i++) {
    savedText = localStorage.getItem(i) || ""

    //// Appending div classes for the hour, text and save button ////
    timeEventEl.append(`<div class="container"><div class="row time-block">
    <div class="col-sm-1 hour">${times[i].time}</div>
    <textarea class="col-sm-10" id="${i}" data-value="${times[i].value}">${savedText}</textarea>
    <div class="col-sm-1 saveBtn justify-content-center"><i class ="fas fa-save fa-2x"></i></div>
    </div></div>`)
}

//// Click event for the save button to save event text entered to the local storage ////


$('.saveBtn').click(function() {
    var text = $(this).parent().find("textarea").val()
    var hourDisplay = $(this).parent().find("textarea").attr("id")
    localStorage.setItem(hourDisplay, text)

    $(this).parent().find("textarea").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
})

//// Creating a function to change the color of the text div based on whether it is past, present or yet to take place ////

function colorizeHours() {
    var hourDiv = $('.col-sm-10')
    for (var i = 0; i < hourDiv.length; i++) {
        let currentHourDiv = $(hourDiv[i]);
        if (currentHourDiv.attr('data-value') < currentHour) {
            currentHourDiv.addClass('past')
        } else if (currentHourDiv.attr('data-value') > currentHour){ 
            currentHourDiv.addClass('future')
        } else { currentHourDiv.addClass('present') }
    }
}
colorizeHours()
setInterval(function(){ colorizeHours() }, 60 * 1000)