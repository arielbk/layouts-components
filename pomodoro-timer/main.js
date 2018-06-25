const container = document.querySelector('.main');
const startButton = document.querySelector('.countdown');
const displayTime = document.querySelector('.display-time')

const timerObj = {
  length: 5, // 5 seconds for testing
  timeRemaining: 5, // this should be dynamic.. setNewTime will be function where this and timer.length are set
  timing: false, // a flag for start/pause
}

function timerFunc() {
  if (timerObj.timeRemaining > 0) {
    displayTime.innerText = timerObj.timeRemaining;
    timerObj.timeRemaining--;
  } else {
    displayTime.innerText = 'ding';
  }
}

let intervalID;
function startPause(timer) {
  timer.timing = !timer.timing;
  if (timer.timing) { // if the timer is now running (after click)
    intervalID = setInterval(timerFunc, 1000);
    startButton.innerText = 'Pause timer';
  } else {
    console.log('clearing the interval!');
    clearInterval(intervalID);
    startButton.innerText = 'Continue timer';
    return;
  }
}

startButton.addEventListener('click', () => startPause(timerObj));