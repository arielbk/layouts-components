/* Aim is to get some practice with array methods, particularly reduce,
as well as simply working with the DOM */

'use strict';

const textInputField = document.querySelector('#textInput');
const submitBtn = document.querySelector('#submit');
const output = document.querySelector('#output');

submitBtn.addEventListener('click', () => {
  const words = textInputField.value
    .toLowerCase()
    .split(' ')
    .reduce((totalWords, singleWord, i) => {
      if (totalWords.length==0) {
        totalWords[0] = {word: singleWord, frequency: 1};
      } else if (totalWords.every(element => element['word'] != singleWord)) {
        let newElement = {word: singleWord, frequency: 1};
        totalWords[i] = newElement;
      } else {
        totalWords.forEach(element => {if (element['word'] == singleWord) element['frequency']++});
      }
      return totalWords;
    }, [])
    .sort((a,b) => b['frequency']-a['frequency']);

  // let content = '';
  // for (var word in words) {
  //   content += '<li>'+word+' - '+words[word]+'</li>';
  // }
  // output.innerHTML = content;
  console.log(words);
});
