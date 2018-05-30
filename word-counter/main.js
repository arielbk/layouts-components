/* Aim is to get some practice with array methods, particularly reduce,
as well as simply working with the DOM */

const textInputField = document.querySelector('#textInput');
const submitBtn = document.querySelector('#submit');
const output = document.querySelector('#output');

submitBtn.addEventListener('click', () => {
  const words = textInputField.value
    .split(' ')
    .reduce((allWords, word) => {
      if (word in allWords) {
        allWords[word]++;
      } else {
        allWords[word] = 1;
      }
      return allWords;
    }, []);
  let content = '';
  for (word in words) {
    content += '<li>'+word+' : '+words[word]+'</li>';
  }
  output.innerHTML = content;
});
