// for practice and to test out the framework:
// list items are generated from an array
// the array changes as items are moved around...
// this works but order of individual lists is not implemented

const listOne = document.querySelector('.list-one');
const listTwo = document.querySelector('.list-two');

const listOneItems = ['lorem', 'ipsum dolor', 'sit amet', 'consectetur and some other stuff here for a longer list item'];
const listTwoItems = ['Second list item (originally, anyway... this could change, should change', 'And another one for demonstration']

function populateLists() {
  let listOneContent =
    listOneItems.map(item => {
      return `<li>${item}</li>`;
    })
    .join('');
  let listTwoContent = 
    listTwoItems.map(item => {
      return `<li>${item}</li>`;
    }).join('');
  listOne.innerHTML = listOneContent;
  listTwo.innerHTML = listTwoContent;
}

populateLists();

dragula([document.querySelector('.list-one'), document.querySelector('.list-two')])
  .on('drag', el => {
    console.log('from ' + el.parentNode.dataset.id)
  })
  .on('drop', el => {
    if (el.parentNode && el.parentNode.dataset.id === 'listOne') {
      listOneItems.push(el.innerText);
      populateLists();
    }
    if (el.parentNode && el.parentNode.dataset.id === 'listTwo') {
      listTwoItems.push(el.innerText);
      populateLists();
    }
  });