// PROBLEM OCCURRING WHEN TIMER FINISHES AND USER RESETS... SOMETIMES IT DOES NOT RESPOND -- TROUBLESHOOTING REQUIRED
// FIRST TO GET IT WORKING AND THEN TO MAKE IT LOOK NICE


/*_____________________________________________________________________________________
                                     TARGET ELEMENTS
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/

const container = document.querySelector('.main');
const startButton = document.querySelector('.countdown');
const inputTimeWork = document.querySelector('.input-time-work');
const inputTimeBreak = document.querySelector('.input-time-break');
const reset = document.querySelector('.reset');
const displayTime = document.querySelector('.display-time');
const progressBar = document.querySelector('.progress-bar')


/*_____________________________________________________________________________________
                                     TIMER OBJECT
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/

const timerObj = {

  // boolean - is the break timer currently active?
  breakTime: false,

  // WORK TIMER
  work: {
    length: 1500, // 25*60 --- 25 minutes is default
    timeRemaining: 1500,
    timing: false, // a flag for start/pause
    started: false,
  },

  // BREAK TIMER
  break: {
    length: 300,
    timeRemaining: 300,
    timing: false, // timing controlled by start/stop
    started: false, // controls whether choosing a new time will take effect
  }
}


/*_____________________________________________________________________________________
                                     FUNCTIONS
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/

// timer function called every second while timer is on
function timerFunc(timer) { // timer passed in is EITHER the work or break timer object
  // if timer ends, pass along to another function
  if (timer.timeRemaining < 1) {
    resetTimer();

    displayTime.innerText = 'Finished!';

    // toggle whether it is breaktime or not
    timerObj.breakTime = !timerObj.breakTime;

    // UI changes -- after breaktime toggle!
    if (timerObj.breakTime) {
      displayTime.style.color = 'rgb(0,120,0)';
      startButton.innerText = 'Start Break';
      progressBar.style.backgroundColor = 'rgb(0, 120, 0)';
    } else {
      displayTime.style.color = 'rgb(143,0,0)';
      startButton.innerText = 'Start Work';
      progressBar.style.backgroundColor = 'rgb(143, 0, 0)';
    }

    return; // and break out of the function
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
}

// when reset button is pushed or after time runs out
function resetTimer() {

  clearInterval(intervalID);
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

  displayTime.innerText = '';
}

// this function takes care of running timer function and displaying time and timer.timing
let intervalID;
function startPause(timerObj) {

  // break or work?
  timerObj.breakTime ? timer = timerObj.break : timer = timerObj.work;

  // if this is a fresh timer, set its remaining time to input value
  if (!timer.started) {
    timerObj.breakTime 
      ? timer.length = inputTimeBreak.value * 60
      : timer.length = inputTimeWork.value * 60;
    timer.timeRemaining = timer.length;
  }

  timer.started = true;
  timer.timing = !timer.timing; // toggle whether timing with start and pause

  if (timer.timing) { // if the timer is now running (after click)
    intervalID = setInterval(() => timerFunc(timer), 1000);
    startButton.innerText = 'Pause'; // begin timer and display green pause button
  } else {
    clearInterval(intervalID);
    startButton.innerText = 'Continue'; // i.e. timer is paused
  }
}


/*_____________________________________________________________________________________
                                     EVENT LISTENERS
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/

startButton.addEventListener('click', () => startPause(timerObj));
reset.addEventListener('click', () => {
  resetTimer();
  timerObj.breakTime = false;
  progressBar.style.background = 'rgb(143,0,0)';
  displayTime.style.color = 'rgba(143,0,0)';
  displayTime.innerText = 'Pomodoro'
});


// rgb(143, 0, 0);
// rgb(0, 120, 0);