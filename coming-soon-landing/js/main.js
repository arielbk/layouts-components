const countdown = document.querySelector('.countdown');

// set launch date (ms)
const launchDate = new Date('Jan 1, 2019 13:00:00').getTime();

// update launch date every second
const interval = setInterval(() => {
  // get todays date and time (ms)1
  const now = new Date().getTime();

  // distance from now to launch date
  const distance = launchDate - now;

  // time calculations
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((distance % (1000 * 60)) / (1000));

  // display result
  countdown.innerHTML = `
  <div>${days} <span>Days</span></div>
  <div>${hours} <span>Hours</span></div>
  <div>${mins} <span>Minutes</span></div>
  <div>${secs} <span>Seconds</span></div>
  `;

  // launch date passed already?
  if (distance < 0) {
    // stop countdown
    clearInterval(interval);
    // style and output text
    countdown.style.color = '#17a2b8';
    countdown.innerHTML = 'Launched';
  }
}, 1000)
