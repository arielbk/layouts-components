const container = document.querySelector('.main');
const startButton = document.querySelector('.countdown');
const displayTime = document.querySelector('.display-time');
const inputTime = document.querySelector('#input-time');
const reset = document.querySelector('.reset');

const timerObj = {
  length: 1500, // 25*60 --- 5 minutes is default
  timeRemaining: 1500, // this should be dynamic.. setNewTime will be function where this and timer.length are set
  timing: false, // a flag for start/pause
  started: false,
}

function timerFunc() {
  if (timerObj.timeRemaining > 0) {
    const minsRemaining = Math.floor((timerObj.timeRemaining % (60*60)) / 60);
    const secsRemaining = Math.floor((timerObj.timeRemaining % 60));
    displayTime.innerText = `Time remaining: ${minsRemaining} minutes and ${secsRemaining} seconds`;
    timerObj.timeRemaining--;
  } else {
    displayTime.innerText = 'ding';
  }
}

let intervalID;
function startPause(timer) {
  timer.started = true;
  timer.timing = !timer.timing;
  if (timer.timing) { // if the timer is now running (after click)
    intervalID = setInterval(timerFunc, 1000);
    startButton.innerText = 'Pause';
  } else {
    console.log('clearing the interval!');
    clearInterval(intervalID);
    startButton.innerText = 'Continue';
    return;
  }
}

function setTimerLength() {
  timerObj.length = this.value * 60;
  if (timerObj.started === false) timerObj.timeRemaining = timerObj.length;
}

// issue here when user has timer running and presses reset then sets a new time and starts timer...
function resetTimer() {
  if (timerObj.timing) startPause(timerObj);
  timerObj.started = false;
  startButton.innerText = 'Start';
  timerObj.length = inputTime.value * 60;
  timerObj.timeRemaining = timerObj.length;
  displayTime.innerText = '';
}

startButton.addEventListener('click', () => startPause(timerObj));
inputTime.addEventListener('change', setTimerLength);
reset.addEventListener('click', resetTimer);