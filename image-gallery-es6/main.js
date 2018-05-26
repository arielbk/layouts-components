// this is me following along with a tutorial by Traversy Media: https://www.youtube.com/watch?v=afoxd5b0bJo
const current = document.querySelector('#current');
const images = document.querySelectorAll('.images img')
const opacity = 0.6;

// set first image opacity
images[0].style.opacity = opacity;

images.forEach(img => img.addEventListener('click', imgClick));

function imgClick(e) {
  // reset opacity of all images
  images.forEach(img => (img.style.opacity = 1));

  // change current img src to src of clicked image
  current.src = e.target.src;

  // add fade-in class
  current.classList.add('fade-in');

  // remove fade-in class after .5s
  setTimeout(() => current.classList.remove('fade-in'), 500);

  // change opacity to opacity var
  e.target.style.opacity = opacity;
}
