// this is inspired by a tutorial by Traversy Media: https://www.youtube.com/watch?v=afoxd5b0bJo
// edited to implement event delegation and aesthetics
// user can press 1-8 on their keyboard to choose the corresponding image
// as well as use left and right arrows to cycle through

const current = document.querySelector('#current');
const imagesAll = document.querySelector('.images');
const singleImage = document.querySelectorAll('.images img');

currentId = 0;

// set first image opacity
singleImage[0].classList.add('selected');

// listen if images grid is clicked (event delegation)
imagesAll.addEventListener('click', imagesClick);

// listen if keys are pressed
// modern solution - transpiler would be necessary for older browsers
document.addEventListener('keydown', imageCycle);

// this just passes on the image changing
function imagesClick(e) {
  imageChanger(e.target);
}

function imageCycle(e) {
  if (e.key > 0 && e.key < 9) {
    imageChanger(singleImage[e.key-1]);
  }

  // cycle images if left or right arrow are pressed
  if (e.key == 'ArrowLeft') {
    var nextId = currentId - 1;
    // if the next image is negative, then cycle back to the end
    nextId = nextId >= 0 ? nextId : singleImage.length - 1;
    imageChanger(singleImage[nextId]);
  } else if (e.key == 'ArrowRight') {
    // if the next image does not exist, cycle back to the start
    var nextId = (currentId + 1) % (singleImage.length);
    imageChanger(singleImage[nextId]);
  }
}

// function that actually changes the image
function imageChanger(chosenImage) {
  // reset opacity of every single image
  singleImage.forEach(img => (img.classList.remove('selected')));

  // set current img src to src of chosen image
  current.src = chosenImage.src;

  // assign the current image id, so that cycling the images will work
  currentId = Number(chosenImage.id);

  // add fade in class
  current.classList.add('fade-in');

  // remove fade in class after 0.4 seconds
  setTimeout(() => current.classList.remove('fade-in'), 400);

  // set thumb opacity to const opacity
  chosenImage.classList.add('selected');
}
