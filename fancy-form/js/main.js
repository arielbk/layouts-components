// Coding along with a tutorial by Traversy Media
// https://www.youtube.com/watch?v=AiTdhLc8JCo

// Questions Array
const questions = [
  { question: 'First Name'},
  { question: 'Last Name'},
  { question: 'Email', pattern: /\S+@\S+\.\S+/ },
  { question: 'Password', type: 'password'},
];

// Transition Times
const shakeTime = 100; // Shake transition time
const switchTime = 200; // Transition between questions

// Init position at first question
let position = 0;

// Init DOM elements
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');

// EVENTS

// Get question on DOM load
document.addEventListener('DOMContentLoaded', getQuestion);
// Next button clicked
nextBtn.addEventListener('click', validate);
// Prev button clicked
// ...
// Input field: enter click
inputField.addEventListener('keyup', e => {
  if (e.keyCode == 13) {
    validate();
  }
})

// FUNCTIONS

// Get question from array and add to markup
function getQuestion() {
  // get current question
  inputLabel.innerHTML = questions[position].question;
  // get current type
  inputField.type = questions[position].type || 'text';
  // get current answer
  inputField.value = questions[position].answer || '';
  // focus on current element
  inputField.focus();

  // set progress bar width - relative to questions array length
  progress.style.width = (position * 100) / questions.length + '%';

  // add user icon or left arrow depending on question
  prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';

  showQuestion();
}

// Display question to user
function showQuestion() {
  inputGroup.style.opacity = '1';
  // inputProgress.style.transition = ''; why this line anyway?
  inputProgress.style.width = '100%';
}

// Hide question from user
function hideQuestion() {
  inputGroup.style.opacity = 0;
  inputLabel.style.marginLeft = 0;
  inputProgress.style.width = 0;
  inputProgress.style.transition = '';
  inputGroup.style.border = null;
}

// Validate field
function validate() {
  // make sure pattern matches if applicable
  if (!inputField.value.match(questions[position].pattern || /.+/)) {
    inputFail();
  } else {
    inputPass();
  }
}

// Transform to create shake motion
function transform(x, y) {
  formBox.style.transform = `translate(${x}px, ${y}px)`;
}

// Field input failed
function inputFail() {
  console.log('input failed');
  formBox.className = 'error';
  // Repeat shake motion
  for (let i = 0; i < 6; i++) {
    // cool little calculation that will pass the 'back and forth' x val
    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
    inputField.focus();
  }
  // why call this every time the loop runs? better outside...
  setTimeout(transform, shakeTime * 6, 0, 0);
}

// Field input failed
function inputPass() {
  formBox.className = '';
  setTimeout(transform, 0, 0, 10);
  setTimeout(transform, shakeTime, 0, 0);

  // Store answer in the array
  questions[position].answer = inputField.value;

  // Increment position
  position++;

  // If new question, hide current and display next
  if (questions[position]) {
    hideQuestion();
    getQuestion();
  } else { // no more questions
    hideQuestion();
    formBox.className = 'close';
    progress.style.width = '100%';

    // form complete
    formComplete();
  }
}

// All fields complete - show h1 end
function formComplete() {
  const h1 = document.createElement('h1');
  h1.classList.add('end');
  h1.appendChild(document.createTextNode(`Thanks, ${questions[0].answer}, you are registered and will receive an email shortly`));
  setTimeout(() => {
    formBox.parentElement.appendChild(h1);
    setTimeout(() => h1.style.opacity = 1, 50);
  }, 1000);
}