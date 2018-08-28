window.addEventListener('load', init);

// available levels
const levels = {
  easy: 5,
  medium: 3,
  hard: 2
}
let currentLevel = levels.hard;

// global vars
let time = currentLevel,
    score = 5,
    isPlaying;

// DOM elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

const words = [
  'duck',
  'random',
  'colour',
  'totally',
  'notebook',
  'incredible',
  'initiation',
  'ceremonial',
  'development',
  'incredulous',
  'monstrosity',
];

// Initialise game
function init() {
  // show seconds in UI
  seconds.innerHTML = currentLevel;
  // load word from array
  showWord(words);
  // start matching word input
  wordInput.addEventListener('input', startMatch);
  // call countdown every second
  setInterval(countDown, 1000);
  // check game status
  setInterval(checkStatus, 50);
}

function showWord(words) {
  // generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  // output a random word
  currentWord.innerHTML = words[randIndex];
}

function countDown() {
  // check if time is completed
  if (time > 0) {
    // decrement
    time--;
  } else if (time === 0) {
    // game over
    isPlaying = false;
  }
  // show time
  timeDisplay.innerHTML = time;
}

function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = 'Game over';
    score = -1;
  }
}

function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = '';
    score++;
  }
  // if score is -1 then just display 0
  score < 0 
    ? scoreDisplay.innerHTML = 0 
    : scoreDisplay.innerHTML = score;
}

// match current word to word input
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'Correct!';
    return true;
  } else {
    message.innerHTML = '';
    return false;
  }
}