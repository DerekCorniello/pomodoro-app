let pomodoro = document.getElementById("pomodoro-timer");
let short = document.getElementById("short-timer");
let long = document.getElementById("long-timer");
let customized = document.getElementById("customized-timer");
let currentTimer = null;
let customDuration = null;
let tempCustomDuration = null; // to save the customized value
let flagCustomDuration = null;
let timerDuration = null;
let remainingTimeAfterStop = null;
let endTimestamp = null;
let saveCustomForm = customized.innerHTML;

document.getElementById("show-customized-timer-button").style.display = "none";
document.getElementById("stop-temp-button").style.display = "none";
document.getElementById("stop").style.display = "none";


function showDefaultTimer() {
    pomodoro.style.display = "block";
    short.style.display = "none";
    long.style.display = "none";
    customized.style.display = "none";
    currentTimer = pomodoro;
}

showDefaultTimer();

function hideAll() {
    let timers = document.querySelectorAll(".timer-display");
    timers.forEach((timer) => (timer.style.display = "none"));
    document.getElementById("show-customized-timer-button").style.display = "none";

}


document.getElementById("pomodoro-session")
.addEventListener("click", function () {
    hideAll();

    pomodoro.style.display = "block";
    currentTimer = pomodoro;
    flagCustomDuration = false;
});
document.getElementById("customized-session")
.addEventListener("click", function () {
    hideAll();
    document.getElementById("show-customized-timer-button").style.display = "inline";
    customized.style.display = "block";
    currentTimer = customized;
    flagCustomDuration = true;
});

document.getElementById("short-break")
.addEventListener("click", function () {
    hideAll();

    short.style.display = "block";
    currentTimer = short;
    flagCustomDuration = false;
});

document.getElementById("long-break")
.addEventListener("click", function () {
    hideAll();

    long.style.display = "block";
    currentTimer = long;
    flagCustomDuration = false;
});

// for customized session
function getCustomListener() {
    document.getElementById("timer-customized-button").onclick = function () {
            customDuration = document.getElementById("timer-customized-value").value.split(":")[0];
            tempCustomDuration = customDuration;
            console.log(typeof(timerDuration));
            console.log(timerDuration);
    };
}
// 
getCustomListener();
let myInterval = null;

function startTimer(timerdisplay) {
    if (myInterval) {
        clearInterval(myInterval);
    }
   // to check if customized is set
    if(!customDuration && !flagCustomDuration) {
        timerDuration = timerdisplay
            .getAttribute("data-duration")
            .split(":")[0];
        console.log(timerDuration);
        console.log(typeof(timerDuration));
    }else if(customDuration && tempCustomDuration){
        timerDuration = customDuration;
    } else {
        timerDuration = tempCustomDuration;
    }


    let durationinmiliseconds = null;
    let endTimestamp = null;
    let timeRemaining = null;
    if(remainingTimeAfterStop){
        endTimestamp = remainingTimeAfterStop;
        console.log(new Date(endTimestamp));
    } else { 
        durationinmiliseconds = timerDuration * 60 * 1000;
        endTimestamp = Date.now() + durationinmiliseconds;
    } 


    myInterval = setInterval(function () {
        console.log("this is endtimestamp from setInterval: " + endTimestamp);
        console.log("this is Date now from setInterval: " + new Date(Date.now()));
        timeRemaining = new Date(endTimestamp - Date.now());
        console.log("this is the time remaining: " + timeRemaining);
        if (timeRemaining <= 0) {

            clearInterval(myInterval);

            timerdisplay.textContent = "00:00";

            const alarm = new Audio(
                "../sound/alarmsound.mp3"
            );

            alarm.play();

        } else {

            const minutes = Math.floor(timeRemaining / 60000);
            const seconds = ((timeRemaining % 60000) / 1000).toFixed(0);
            const formattedTime = `${minutes}:${seconds
                .toString()
                .padStart(2, "0")}`;

        
            timerdisplay.textContent = formattedTime;
        }
        remainingTimeAfterStop = endTimestamp;
        console.log("this is time remaining after stop before assigning it:  "  + remainingTimeAfterStop);
        console.log("this is time remaining after stop before assigning it Date Object:  "  + new Date(remainingTimeAfterStop));
        

    }, 1000);
}

document.getElementById("start").addEventListener("click", function () {
    if (currentTimer) {
        const alarm = new Audio(
                "../sound/buttonsound.mp3"
            );
        alarm.play();
        startTimer(currentTimer);
        document.getElementById("timer-message").style.display = "none"; 
        document.getElementById("stop-temp-button").style.display = "inline";
        document.getElementById("stop").style.display = "inline";
    } else {
        document.getElementById("timer-message").style.display = "block";
    }
});

document.getElementById("stop").addEventListener("click", function () {
if (currentTimer) {
    const alarm = new Audio(
            "../sound/buttonsound.mp3"
    );
    alarm.play();
    clearInterval(myInterval);
    timerDuration = null;
    customDuration = null;
    remainingTimeAfterStop = null;
    
}
});

document.getElementById("stop-temp-button").addEventListener("click", function () {
if (currentTimer) {
    const alarm = new Audio(
            "../sound/buttonsound.mp3"
    );
    alarm.play();
    clearInterval(myInterval);
}
});


document.getElementById("show-customized-timer-button").addEventListener("click", function () {
    const alarm = new Audio(
            "../sound/buttonsound.mp3"
    );
    alarm.play();
    document.getElementById("show-customized-timer").style.display ="block";
    document.querySelector(".timer-display.customized").style.display = "block";
    document.getElementById("customized-timer").innerHTML = saveCustomForm;
    getCustomListener();
});
