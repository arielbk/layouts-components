// PROBLEM OCCURRING WHEN TIMER FINISHES AND USER RESETS... SOMETIMES IT DOES NOT RESPOND -- TROUBLESHOOTING REQUIRED

// TARGET ELEMENTS
const container = document.querySelector('.main');
const startButton = document.querySelector('.countdown');
const inputTimeWork = document.querySelector('.input-time-work');
const inputTimeBreak = document.querySelector('.input-time-break');
const reset = document.querySelector('.reset');
const displayTime = document.querySelector('.display-time');


// TIMER OBJECT WITH WORK AND BREAK SUB OBJECTS
const timerObj = {
  // boolean - is the break timer currently active?
  breakTime: false,

  work: {
    length: 15, // 25*60 --- 25 minutes is default
    timeRemaining: 15,
    timing: false, // a flag for start/pause
    started: false,
  },
  break: {
    length: 300,
    timeRemaining: 300,
    timing: false, // timing controlled by start/stop
    started: false, // controls whether choosing a new time will take effect
  }
}


// FUNCTIONS

// timer function called every second while timer is on
function timerFunc(timer) { // timer passed in is EITHER the work or break timer object
  // if there is time remaining in the timer, display current time and decrement time by 1
  if (timer.timeRemaining > 0) {
    const minsRemaining = Math.floor((timer.timeRemaining % (60*60)) / 60);
    const secsRemaining = Math.floor((timer.timeRemaining % 60));
    displayTime.innerText = `${minsRemaining} minutes`;
    if (secsRemaining) displayTime.innerText += ` ${secsRemaining} seconds`;

    timer.timeRemaining--;
  } else { // similar to reset timer but with some necessary differences
    clearInterval(intervalID);
    displayTime.innerText = 'Complete';
    timerObj.breakTime ? startButton.innerText = 'Start Work' : startButton.innerText = 'Start Break';

    // toggle whether it is breaktime or not
    timerObj.breakTime = !timerObj.breakTime;

    // reset all values
    timerObj.work.length = inputTimeWork.value * 60;
    timerObj.work.timeRemaining = timerObj.work.length;
    timerObj.break.length = inputTimeBreak.value * 60;
    timerObj.break.timeRemaining = timerObj.break.length;
  }
}

// when reset button is pushed or after time runs out
function resetTimer() {
  timerObj.breakTime ? timer = timerObj.break : timer = timerObj.work;

  if (timer.timing) startPause(timerObj); // so that timer does not continue to run in bg
  timer.started = false;
  startButton.innerText = 'Start';

  // reset all values
  timerObj.work.length = inputTimeWork.value * 60;
  timerObj.work.timeRemaining = timerObj.work.length;
  timerObj.break.length = inputTimeBreak.value * 60;
  timerObj.break.timeRemaining = timerObj.break.length;

  // never break time after a reset
  timerObj.breakTime = false;

  displayTime.innerText = '';
}

// this function takes care of running timer function and displaying time and timer.timing
let intervalID;
function startPause(timerObj) {

  // break or work?
  if (timerObj.breakTime) {
    timer = timerObj.break;
    displayTime.style.color = 'rgb(0, 120, 0)';
  } else {
    timer = timerObj.work;
    displayTime.style.color = 'rgb(143,0,0';
  }

  timer.started = true; // hmm is this always right? calling it from other functions?
  timer.timing = !timer.timing; // toggle whether timing with start and pause

  if (timer.timing) { // if the timer is now running (after click)
    intervalID = setInterval(() => timerFunc(timer), 1000);
    startButton.innerText = 'Pause'; // begin timer and display green pause button
  } else {
    clearInterval(intervalID);
    startButton.innerText = 'Continue'; // i.e. timer is paused
  }
}

function setTimerLength(timer) {
  timer.length = this.value * 60;
  if (!timer.started) timerObj.timeRemaining = timerObj.length;
}


// EVENT LISTENERS
startButton.addEventListener('click', () => startPause(timerObj));
inputTimeWork.addEventListener('change', () => setTimerLength(timerObj.work));
inputTimeBreak.addEventListener('change', () => setTimerLength(timerObj.break));
reset.addEventListener('click', resetTimer);