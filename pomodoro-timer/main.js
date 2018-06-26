// Next up:
//
// Make it look cool! Circular and graphic
//

// target all required elements
const container = document.querySelector('.main');
const startButton = document.querySelector('.countdown');
const inputTimeWork = document.querySelector('.input-time-work');
const inputTimeBreak = document.querySelector('.input-time-break');
const reset = document.querySelector('.reset');
const displayTime = document.querySelector('.display-time');

// timer object with data for both the work and break timer
const timerObj = {
  // boolean - is the break timer currently active?
  break: true,

  work: {
    length: 15, // 25*60 --- 25 minutes is default
    timeRemaining: 15,
    timing: false, // a flag for start/pause
    started: false,
  },
  break: {
    length: 300,
    timeRemaining: 300,
    timing: false,
    started: false,  
  }
}

// timer function called every second while timer is on
function timerFunc(timer) { // timer passed in is EITHER the work or break timer object
  // if there is time remaining in the timer, display current time and decrement time by 1
  if (timer.timeRemaining > 0) {
    const minsRemaining = Math.floor((timer.timeRemaining % (60*60)) / 60);
    const secsRemaining = Math.floor((timer.timeRemaining % 60));
    displayTime.innerText = `${minsRemaining} minutes`;
    if (secsRemaining) displayTime.innerText += ` ${secsRemaining} seconds`;

    timer.timeRemaining--;
  } else { // otherwise toggle work/break and display option to user
    displayTime.innerText = 'Complete';
    timerObj.break ? startButton.innerText = 'Start Work' : startButton.innerText = 'Start Break';
  }
}

let intervalID;
function startPause(timerObj) {
  if (timerObj.break) {
    timer = timerObj.break;
    displayTime.style.color = 'rgb(0, 120, 0)';
  } else {
    timer = timerObj.work;
    displayTime.style.color = 'rgb(143,0,0';
  }
  timer.started = true;
  timer.timing = !timer.timing;
  if (timer.timing) { // if the timer is now running (after click)
    intervalID = setInterval(() => timerFunc(timer), 1000);
    startButton.innerText = 'Pause';
  } else {
    clearInterval(intervalID);
    startButton.innerText = 'Continue';
    return;
  }
}

function setTimerLength() {
  timerObj.length = this.value * 60;
  if (timerObj.started === false) timerObj.timeRemaining = timerObj.length;
}

function resetTimer() {
  timerObj.break ? timer = timerObj.break : timer = timerObj.work;

  
  if (timer.timing) startPause(timerObj);
  timer.started = false;
  startButton.innerText = 'Start';

  // reset all values
  timerObj.work.length = inputTimeWork.value * 60;
  timerObj.work.timeRemaining = timerObj.work.length;
  timerObj.break.length = inputTimeBreak.value * 60;
  timerObj.break.timeRemaining = timerObj.break.length;

  timerObj.break = false;

  displayTime.innerText = '';
}

startButton.addEventListener('click', () => startPause(timerObj));
inputTimeWork.addEventListener('change', setTimerLength);
inputTimeBreak.addEventListener('change', setTimerLength);
reset.addEventListener('click', resetTimer);