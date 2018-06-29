// PROBLEM OCCURRING WHEN TIMER FINISHES AND USER RESETS... SOMETIMES IT DOES NOT RESPOND -- TROUBLESHOOTING REQUIRED
// FIRST TO GET IT WORKING AND THEN TO MAKE IT LOOK NICE

// TARGET ELEMENTS
const container = document.querySelector('.main');
const startButton = document.querySelector('.countdown');
const inputTimeWork = document.querySelector('.input-time-work');
const inputTimeBreak = document.querySelector('.input-time-break');
const reset = document.querySelector('.reset');
const displayTime = document.querySelector('.display-time');
const progressBar = document.querySelector('.progress-bar')


// TIMER OBJECT WITH WORK AND BREAK SUB-OBJECTS
const timerObj = {

  // boolean - is the break timer currently active?
  breakTime: false,

  work: {
    length: 5, // 25*60 --- 25 minutes is default
    timeRemaining: 5,
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
  // if timer ends, pass along to another function
  if (timer.timeRemaining == 0) {
    resetTimer();

    displayTime.innerText = 'Complete';
    timerObj.breakTime ? startButton.innerText = 'Start Work' : startButton.innerText = 'Start Break';

    // toggle whether it is breaktime or not
    timerObj.breakTime = !timerObj.breakTime;
  };

  // display current time and decrement time by 1
    const minsRemaining = 
      (Math.floor((timer.timeRemaining % (60*60)) / 60))
      // https://stackoverflow.com/questions/8043026/how-to-format-numbers-by-prepending-0-to-single-digit-numbers
      .toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    const secsRemaining = 
      (Math.floor((timer.timeRemaining % 60)))
      .toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    displayTime.innerText = `${minsRemaining}:${secsRemaining}`;
    timer.timeRemaining--;
    progressBar.style.width = `${500 - (timer.timeRemaining / timer.length) * 500}px`;
    timerObj.breakTime ? progressBar.style.backgroundColor = 'rgb(0, 120, 0)' : progressBar.style.backgroundColor = 'rgb(143, 0, 0)';
}

// when reset button is pushed or after time runs out
function resetTimer() {
  progressBar.style.width = 0;

  // so that timer does not continue to run in bg
  if (timerObj.work.timing || timerObj.break.timing) startPause(timerObj);

  // reset all values
  timerObj.work.length = inputTimeWork.value * 60;
  timerObj.work.timeRemaining = timerObj.work.length;
  timerObj.work.started = false;
  timerObj.work.timing = false;
  timerObj.break.length = inputTimeBreak.value * 60;
  timerObj.break.timeRemaining = timerObj.break.length;
  timerObj.break.started = false;
  timerObj.break.timing = false;

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
reset.addEventListener('click', () => {
  resetTimer();
  // other UI changes!!
});