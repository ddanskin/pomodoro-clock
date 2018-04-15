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

function setTimer(btn) {
    let b = btn;
    
    if (b == "bP"){
        bTime++;

        if (bTime == 2) {
            document.getElementById("bM").disabled = false;
        }

        document.getElementById("breakT").innerHTML = bTime;
   
    } else if (b == "wP") {
        wTime++;
        
        if (wTime == 2) {
            document.getElementById("wM").disabled = false;
        }
        
        document.getElementById("workT").innerHTML = wTime;
   
    } else if (b == "bM") {
        bTime--;
    
        if (bTime == 1) {
            document.getElementById("bM").disabled = true;
        }
        
        document.getElementById("breakT").innerHTML = bTime;
    
    } else if (b == "wM") {
        wTime--;
    
        if (wTime == 1) {
            document.getElementById("wM").disabled = true;
        }
        document.getElementById("workT").innerHTML = wTime;
    }
    
    if (clockPaused && workTime) {
        t = wTime;
        minutes = t;
        seconds = 0;
        updateDisplay();
    }
}

let setterElements = document.getElementsByClassName("adjustBreak, adjustWork");
Array.from(setterElements, setter => setter.addEventListener('click', function(){
    setTimer(setter.id);
});

document.getElementById("countdown").addEventListener("click", function() {
    
    if (clockPaused && firstSession) {
        document.getElementById("pause").innerHTML = "||";
        startTimer(t * 60);
        firstSession = false;
    
    } else if (clockPaused) {
        document.getElementById("pause").innerHTML = "||";
        startTimer(counter);
    
    } else {
        document.getElementById("pause").innerHTML = ">";
    
    }

    clockPaused = !clockPaused;
});

document.getElementById("reset").addEventListener("click", function() {
    reset(wTime);
});

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
            document.getElementById("timer").innerHTML = addZero(minutes, 2) + ":" + addZero(seconds, 2);
            
            if (counter == 0) {
                soundFile.play();
                
                if (workTime) {
                    t = bTime;
                } else {
                    t = wTime;
                }
                document.getElementById("timer").innerHTML = addZero(minutes, 2) + ":" + addZero(seconds, 2);
                workTime = !workTime;
                clearInterval(interval);
                startTimer(t * 60);
            }
        }
    }, 1000);
}

function updateDisplay() {
    document.getElementById("workT").innerHTML = wTime;
    document.getElementById("breakT").innerHTML = bTime;
    document.getElementById("pause").innerHTML = clock_paused ? ">" : "||";
    document.getElementById("session").innerHTML = workTime ? "WORK" : "BREAK";
    document.getElementById("countdown").style.background = workTime ? '#009900' : '#ff6347';
    document.getElementById("countdown").style.border = workTime ? '4px solid #99f000' : '4px solid #cc0000';
    document.getElementById("timer").innerHTML = addZero(minutes, 2) + ":" + addZero(seconds, 2);
}

function addZero(x, n) {
    while (x.toString().length < n) {
        x = "0" + x;
    }
    return x;
}
