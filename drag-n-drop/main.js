// Tutorial by Traversy Media: https://www.youtube.com/watch?v=C22hQKE_32c&t=2s
// Weirdly this will not work on FireFox - there is an issue with HTML5 draggable
// This helped: http://mereskin.github.io/dnd/
// And most of all MDN's documentation on HTML drag n drop API https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API

const fill = document.querySelector('.fill');
const boxes = document.querySelectorAll('.empty');

// Fill listeners
fill.addEventListener('dragstart', function(e){
  e.dataTransfer.setData('text/plain', e.target.id);
});
fill.addEventListener('dragend', dragEnd);

// Loop empties and call drag events
for(const box of boxes) {
  box.addEventListener('dragover', dragOver);
  box.addEventListener('dragenter', dragEnter);
  box.addEventListener('dragleave', dragLeave);
  box.addEventListener('drop', dragDrop);
}

// Drag functions
function dragStart() {
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
  e.preventDefault();
  this.className += ' hovered';
}

function dragLeave() {
  this.className = 'empty';
}

function dragDrop() {
  this.className = 'empty ';
  this.append(fill);
}
