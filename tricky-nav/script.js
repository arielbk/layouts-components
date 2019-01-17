// debounce function -- figure this out!
function debounce(func, wait = 20, immediate = true) {
  return function() {
    let timeout;
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeOut = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  }
}

const nav = document.querySelector('.nav');
const navBurger = document.querySelector('.nav__burger');
const container = document.querySelector('.container');
const navList = document.querySelector('.nav__list');

const showScroll = {
  transform: 'translate(0, -100px',
  position: 'fixed',
  top: 0,
}

let scrollPosition;
const navbarToggle = () => {
  if (window.scrollY > scrollPosition) {
    container.style.marginTop = 0;
    nav.classList.remove('sticky');
  };
  if (scrollPosition > window.scrollY && window.scrollY > nav.scrollHeight * 2) {
    container.style.marginTop = nav.scrollHeight + 'px';
    nav.classList.add('sticky');
  };
  console.log(nav.style);
  scrollPosition = window.scrollY;
};

function navburgerToggle() {
  if (navList.classList.contains('fullscreen')) {
    navList.classList.remove('fullscreen');
  } else {
    console.log('adding fullscreen');
    navList.classList.add('fullscreen');
  }
}

document.addEventListener('scroll', debounce(navbarToggle));
navBurger.addEventListener('click', navburgerToggle);