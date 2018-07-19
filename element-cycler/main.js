"use strict";

const array = ['jedan', 'dva', 'tri', 'ćetri', 'pet', 'šest', 'sedam', 'ossam', 'devet', 'deset'];
const display = document.querySelector('.display');
const progress = document.querySelector('.progress');

const prevArrow = document.querySelector('.prev-arrow');
const nextArrow = document.querySelector('.next-arrow');

let index = 0;
let elements;

document.addEventListener('DOMContentLoaded', () => {
  let content = array.map(currentValue => {
    return `<li class='hidden'>${currentValue}</li>`;
  }).join('');
  display.innerHTML = content;

  elements = display.querySelectorAll('li');
  elements[index].classList.remove('hidden');

  progress.innerHTML = array.map((element, i) => {
    return `<div class="progress-tab progress-${i}"></div>`
  }).join('');
  progress.querySelector(`.progress-${index}`).classList.add('progress-current');
});

function cycleItem(direction) {
  let otherDirection;
  let newIndex = index;
  if (direction === 'left') otherDirection = 'right';
  if (direction === 'right') otherDirection = 'left';

  // REMOVE THE OLD ELEMENT
  elements[index].classList.add(`fade-${direction}`);

  setTimeout(() => {
    elements[index].classList.remove(`fade-${direction}`);
    elements[index].classList.add('hidden');

    index = newIndex;
  }, 300);

  progress.querySelector(`.progress-${index}`).classList.remove('progress-current');

  // ADD THE NEW ELEMENT
  // account for special cases
  if (index < 1 && direction === 'right') { newIndex = array.length-1; }
  else if (index === array.length - 1 && direction === 'left') { newIndex = 0; }
  else if (direction === 'left') { newIndex++ }
  else if (direction === 'right') { newIndex-- }

  elements[newIndex].classList.add(`fade-${otherDirection}`);
  elements[newIndex].classList.remove('hidden');
  setTimeout(() => elements[newIndex].classList.remove(`fade-${otherDirection}`), 300);

  progress.querySelector(`.progress-${newIndex}`).classList.add('progress-current');
}

prevArrow.addEventListener('click', (e) => {
  let direction;
  if (e.target.classList.contains('prev-arrow')) direction = 'right';
  if (e.target.classList.contains('next-arrow')) direction = 'left';
  cycleItem(direction);
});
nextArrow.addEventListener('click', (e) => {
  let direction;
  if (e.target.classList.contains('prev-arrow')) direction = 'right';
  if (e.target.classList.contains('next-arrow')) direction = 'left';
  cycleItem(direction);
});