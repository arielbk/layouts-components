const container = document.querySelector('.main');
const startButton = document.querySelector('.countdown');
const displayTime = document.querySelector('.display-time')

startButton.addEventListener('click', beginTimer);

let time = 25;
let timing = false;
function beginTimer() {
  timing = !timing;


  if (timing) {
    startButton.innerText = 'Pause timer';
    const timer = setInterval(() => {
      if (time) { 
        displayTime.innerText = time;
        time--;
      } else {
        displayTime.innerText = 'ding!';
        clearInterval(timer);
      }
    }, 1000);
  }

  if (!timing) {
    clearInterval(timer);
    startButton.innerText = 'Continue timer';
    return;
  }
}
