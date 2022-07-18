// https://digibrill.github.io/WorkDayScheduler-challenge5/
// https://github.com/digibrill/WorkDayScheduler-challenge5

var week = [];
/* Todays Time */
var todaysTimeEl = document.getElementById('todaysTime');
var currentMonthEl = document.getElementById('currentMonth');
var currentHour = moment().format('HH');
var hourArray = $( "#alldays div" ).toArray();
var hours = [['am9',9],['am10',10],['am11',11],['pm12',12],['pm1',13],['pm2',14],['pm3',15],['pm4',16],['pm5',17]];

function updateTime() {
    var currentTime = moment().format("[The current date and time is:] MMMM Do YYYY, hh:mm:ss a");
    //var currentMonth = moment().format("MMMM");
    todaysTimeEl.textContent = currentTime;
    //currentMonthEl.textContent = currentMonth;
};
setInterval(updateTime, 1000);

// Set checkbox click actions
var i = 0;
while(i < $(".setDateAndTime").length){
    $(".setDateAndTime")[i].addEventListener("click",getDay);
   i++;
}

// On clicking checkbox get day's events and send to saveDay()
function getDay(e){
    if(e.target.previousSibling.value !== ''){
        //console.log('test');
        saveDay(e.target.previousSibling.id, e.target.previousSibling.value);
    }else{
        //e.target.preventDefault();
    }
    //location.reload();
}

// Save day's events
function saveDay(sentId, sentValue){

    var saveDayObj = {
        day: sentId,
        eventName: sentValue
    }

    // get saved scores from localstorage, or if not any, set to empty array
    week = JSON.parse(window.localStorage.getItem("week")) || [];
    for(k = 0; k < week.length; k++){
        console.log(week[k]);
        if(week[k].day == saveDayObj.day){
            //saveDayObj.eventName = week[k].eventName;
           
            week.splice(k, 1); // How can I remove the prior value?
        }
    }
    //console.log(week.length);
    week.push(saveDayObj);
    window.localStorage.setItem("week", JSON.stringify(week));
}

// Load at startup
function loadWeek(){

    // load saved
    week = JSON.parse(window.localStorage.getItem("week")) || [];

    //load week
    if(week.length > 0){
    
        // loop week
        for(var i = 0; i < week.length; i++){

            // loop hours
            for(var j = 0; j < hours.length; j++){

                // Does hour id match week id
                if(week[i].day == hours[j][0]){
                    var day = document.getElementById(week[i].day);
                    day.value = week[i].eventName;

                    // Row bkgd colors
                    // now red
                    if(hours[j][1] == currentHour){
                        
                        document.getElementById(hours[j][0]).style.backgroundColor = "#f00";

                    // past blue
                    }else if(hours[j][1] < currentHour){

                        document.getElementById(hours[j][0]).style.backgroundColor = "#ddd";
                
                    // future green
                    }else if (hours[j][1] > currentHour){

                        document.getElementById(hours[j][0]).style.backgroundColor = "#0f0";

                    }else{
                        // time travel
                    }
                }
            }
        }
    }
}

// User leaves textarea
/*$('#alldays').delegate('textarea.edit','change',function() {
    location.reload();
});*/

loadWeek();
