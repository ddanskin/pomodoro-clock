let firstSession = true;
let workTime = true;
let clockPaused = true;
let bTime = 5;
let wTime = 25;
let t = wTime;
let minutes = t;
let seconds = 0;
let counter;
let soundFile = new Audio("http://soundbible.com/mp3/Spit_Splat-Mike_Koenig-1170500447.mp3");

reset();

// takes button id as arguent and based on the name passed will update the appropriate timer
function setTimer(btn) {
    let b = btn;
    if (b == "bP"){
        bTime++;

        if (bTime == 2) {
            $("#bM").prop("disabled", false);
        }

        $("#breakCount").text(bTime);
   
    } else if (b == "wP") {
        wTime++;
        
        if (wTime == 2) {
            $("#wM").prop("disabled", false);
        }
        
        $("#workCount").text(wTime);
   
    } else if (b == "bM") {
        bTime--;
    
        if (bTime == 1) {
            $("#bM").prop("disabled", true);
        }
        
        $("#breakCount").text(bTime);
    
    } else if (b == "wM") {
        wTime--;
    
        if (wTime == 1) {
            $("#wM").prop("disabled", true);
        }
        $("#workCount").text(wTime);
    }
    
    if (clockPaused && workTime) {
        t = wTime;
        minutes = t;
        seconds = 0;
        updateDisplay();
    }
}

// resets timer to default settings
function reset() {
    workTime = true;
    clockPaused = true;
    firstSession = true;
    wTime = 25;
    bTime = 5;
    t = wTime;
    minutes = t;
    seconds = 0;
    updateDisplay();
}

// start countdown timer, if session ends, starts next session
function startTimer(x) {
    counter = x;
    updateDisplay();
    let interval = setInterval(() => {
    
        if (clockPaused) {
            clearInterval(interval);
        } else {
            counter--;
            minutes = Math.floor(counter / 60);
            seconds = Math.floor(counter % 60);
            $("#timer").text(addZero(minutes, 2) + ":" + addZero(seconds, 2));
            
            // if time ends, play sound and switch to other timer
            if (counter == 0) {
                soundFile.play();
                if (workTime) {
                    t = bTime;
                } else {
                    t = wTime;
                }
                // update counter
                $("#timer").text(addZero(minutes, 2) + ":" + addZero(seconds, 2));
                workTime = !workTime;
                clearInterval(interval);
                startTimer(t * 60);
            }
        }
    }, 1000);
}

// update the display with current timer status
function updateDisplay() {
    $("#workCount").text(wTime);
    $("#breakCount").text(bTime);
    $("#pause").text(clockPaused ? ">" : "||");
    $("#session").text(workTime ? "WORK" : "BREAK");
    let backgroundColor = workTime ? '#009900' : '#ff6347';
    let borderSetting =  workTime ? '4px solid #99f000' : '4px solid #cc0000';
    $("#countdown").css({"background-color": backgroundColor, "border": borderSetting});
    $("#timer").text(addZero(minutes, 2) + ":" + addZero(seconds, 2));
}

// add zeros to timer so it always as two places for seconds count
function addZero(x, n) {
    while (x.toString().length < n) {
        x = "0" + x;
    }
    return x;
}

// each setter (+ or - button) is given a click event that calls setTimer function with its id
$(".adjustBreak, .adjustWork").click(function() {
    setTimer(this.id);
});

// when the countdown timer is clicked, the timer is paused or unpaused
$("#countdown").click(function() {
    
    if (clockPaused && firstSession) {
        $("#pause").text("||");
        startTimer(t * 60);
        firstSession = false;
    
    } else if (clockPaused) {
        $("#pause").text("||");
        startTimer(counter);
    
    } else {
        $("#pause").text(">");
    
    }

    clockPaused = !clockPaused;
});

// when reset button is clicked the reset function is called
$("#reset").click(function() {
    reset(wTime);
});

