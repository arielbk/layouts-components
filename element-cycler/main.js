const array = ['jedan', 'dva', 'tri', 'ćetri', 'pet', 'šest', 'sedam', 'ossam', 'devet', 'deset'];
const shownItem = document.querySelector('.shown-item');
const prevArrow = document.querySelector('.prev-arrow');
const nextArrow = document.querySelector('.next-arrow');

let index = 0;

document.addEventListener('DOMContentLoaded', () => {
  cycleArray(0);
});

function cycleArray(index) {
  shownItem.innerText = array[index];

}

function changeItem(e) {
  if (e.target.classList.contains('prev-arrow')) {
    if (index === 0) index = array.length;
    index--;
  }
  if (e.target.classList.contains('next-arrow')) {
    index++;
  }

  cycleArray(index % (array.length));
}

prevArrow.addEventListener('click', changeItem)
nextArrow.addEventListener('click', changeItem)