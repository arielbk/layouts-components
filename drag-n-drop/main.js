// Inspired by a tutorial from Traversy Media: https://www.youtube.com/watch?v=C22hQKE_32c&t=2s
// This helped with FireFox implementation: http://mereskin.github.io/dnd/
// And most of all MDN's documentation on HTML drag n drop API https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API

const fill = document.querySelector('.fill');
const boxes = document.querySelectorAll('.empty');

// Fill listeners
fill.addEventListener('dragstart', dragStart);
fill.addEventListener('dragend', dragEnd);

// Loop empties and call drag events
for(const box of boxes) {
  box.addEventListener('dragover', dragOver);
  box.addEventListener('dragenter', dragEnter);
  box.addEventListener('dragleave', dragLeave);
  box.addEventListener('drop', dragDrop);
}

// Drag functions
function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.id);
  this.className += ' hold';
  setTimeout(() => (this.className = 'invisible'), 0);
}

function dragEnd() {
  this.className = 'fill'
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  this.className += ' hovered';
  console.log(this.classList);
}

function dragLeave() {
  this.className = 'empty';
}

function dragDrop() {
  this.className = 'empty ';
  this.append(fill);
}
