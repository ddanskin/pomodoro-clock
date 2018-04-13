var first_session = true;
var workTime = true;
var clock_paused = true;
var bTime = 5;
var wTime = 25;
var t = wTime;
var minutes = t;
var seconds = 0;
var counter;
var sound_file = new Audio("http://soundbible.com/mp3/Spit_Splat-Mike_Koenig-1170500447.mp3");
reset();
function setTimer(btn){
  var b = btn;
  if(b == "bP"){
    bTime++;
    if(bTime == 2) {
      document.getElementById("bM").disabled = false;
    }
    document.getElementById("breakT").innerHTML = bTime;
  } else if(b == "wP"){
    wTime++;
    if(wTime == 2) {
      document.getElementById("wM").disabled = false;
    }
    document.getElementById("workT").innerHTML = wTime;
  } else if(b == "bM") {
    bTime--;
  if(bTime == 1) {
      document.getElementById("bM").disabled = true;
  }
  document.getElementById("breakT").innerHTML = bTime;
  } else if(b == "wM") {
    wTime--;
    if(wTime == 1) {
      document.getElementById("wM").disabled = true;
    }
    document.getElementById("workT").innerHTML = wTime;
  }
  if(clock_paused && workTime){
    t = wTime;
    minutes = t;
    seconds = 0;
    updateDisplay();
  }
}
document.getElementById("countdown").addEventListener("click", function() {
  if (clock_paused && first_session){
    document.getElementById("pause").innerHTML = "||";
    startTimer(t*60);
    first_session = false;
  }else if(clock_paused){
    document.getElementById("pause").innerHTML = "||";
    startTimer(counter);
  } else {
    document.getElementById("pause").innerHTML = ">";
  }
  clock_paused = !clock_paused;
  
});
document.getElementById("reset").addEventListener("click", function() {
  reset(wTime);
});
function reset(){
  workTime = true;
  clock_paused = true;
  first_session = true;
  wTime = 25;
  bTime = 5;
  t = wTime;
  minutes = t;
  seconds = 0;
  updateDisplay();
}
function startTimer(x){
  counter = x;
  updateDisplay();
  var interval = setInterval(() => {
    if(clock_paused) {
      clearInterval(interval);
    } else {
      counter--;
      minutes = Math.floor(counter/60);
      seconds = Math.floor(counter % 60);
      document.getElementById("timer").innerHTML = addZero(minutes, 2) + ":" + addZero(seconds, 2);
      if (counter == 0) {
        sound_file.play();
        if (workTime) {
          t = bTime;
        } else {
          t = wTime;
        }
        document.getElementById("timer").innerHTML = addZero(minutes, 2) + ":" + addZero(seconds, 2);
        workTime = !workTime;
        clearInterval(interval);
        startTimer(t*60);
      }
    };
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
function addZero(x, n){
  while (x.toString().length < n) {
    x = "0" + x;
  }
  return x;
}
