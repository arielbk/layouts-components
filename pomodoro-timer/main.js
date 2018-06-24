const container = document.querySelector('.main');
const startButton = document.querySelector('.countdown');
const displayTime = document.querySelector('.display-time')

const timer = {
  length: 5, // 5 seconds for testing
  timeRemaining: 5, // this should be dynamic.. setNewTime will be function where this and timer.length are set
  timing: false, // a flag for start/pause
}

function startPause(timer) {
  timer.timing = !timer.timing;

  if (timer.timing) { // if the timer is now running (after click)
    startButton.innerText = 'Pause timer';

    const timerInterval = setInterval(() => {
      if (timer.timeRemaining) { 
        displayTime.innerText = timer.timeRemaining;
        timer.timeRemaining--;
      } else {
        displayTime.innerText = 'ding!';
        clearInterval(timerInterval);
      }
    }, 1000);
  }
  // } else {
  //   clearInterval(timerInterval);
  //   startButton.innerText = 'Continue timer';
  //   return;
  // }
}

startButton.addEventListener('click', () => startPause(timer));