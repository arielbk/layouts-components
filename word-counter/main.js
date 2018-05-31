/* Aim is to get some practice with array methods, particularly reduce,
as well as simply working with the DOM */

'use strict';

// define all selectors
const textInputField = document.querySelector('#text-input');
const submitBtn = document.querySelector('#submit');
const output = document.querySelector('#output');
const topNumber = document.querySelector('#top-number');
const outputTable = document.querySelector('#output-table');

// hide output table to start
outputTable.style.display = 'none';

// when the submit button is clicked
submitBtn.addEventListener('click', () => {
  let numWords = 0;
  const words = textInputField.value
    // this is where the magic happens: chained array methods
    .toLowerCase()
    .split(' ')
    // remove all non alpha characters and increment words counter on each pass
    .map(x => x.replace(/[^a-z]/gi, ''))
    // create an array of objects with the word and its frequency
    .reduce((totalWords, singleWord) => {
      if (totalWords.every(element => element['word'] != singleWord)) {
        let newElement = {word: singleWord, frequency: 1};
        totalWords.push(newElement);
        numWords++;
      } else {
        totalWords.forEach(element => {if (element.word == singleWord) element.frequency++});
        numWords++;
      }
      return totalWords;
    }, [])
    // sort the array from highest to lowest frequency
    .sort((a,b) => b.frequency-a.frequency);

  let content = '';
  // number of top words to display (user-defined)
  let n = topNumber.value;
  // build the table content
  for (let i=0; i<words.length && i<n; i++) {
    if (words[i].word)
      content += '<tr><td>'+(i+1)+'</td>';
      content += '<td>'+words[i].word+'</td>';
      content += '<td>'+words[i].frequency+'</td></tr>'
  }
  content += '<tfoot><tr><td colspan="3">Total words: '+numWords+' | Total unique words: '+words.length+'</td></tr></tfoot>';
  // display output
  output.innerHTML = content;
  outputTable.style.display = 'table';
});
