// https://www.youtube.com/watch?v=POX3dT-pB4E

// const TypeWriter = function (txtElement, words, wait = 3000) {
//   this.txtElement = txtElement;
//   this.words = words;
//   this.txt = '';
//   this.wordIndex = 0;
//   this.wait = parseInt(wait, 10);
//   this.type();
//   this.isDeleting = false;
// }

// // Type method
// TypeWriter.prototype.type = function() {
//   // current index of word
//   const current = this.wordIndex % this.words.length;
//   // get full text of current word
//   const fullTxt = this.words[current];

//   // check if deleting
//   if (this.isDeleting) {
//     // remove char
//     this.txt = fullTxt.substring(0, this.txt.length - 1);
//   } else {
//     // add char
//     this.txt = fullTxt.substring(0, this.txt.length + 1);
//   }

//   // insert txt into element
//   this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
  
//   // initial type speed
//   let typeSpeed = 300;
  
//   if (this.isDeleting) {
//     typeSpeed /= 2;
//   }

//   // has word been completed
//   if (!this.isDeleting && this.txt === fullTxt) {
//     // pause at the end
//     typeSpeed = this.wait;
//     // set delete to true
//     this.isDeleting = true;
//   } else if (this.isDeleting && this.txt === '') {
//     this.isDeleting = false;
//     // move to next wor
//     this.wordIndex++;
//     // pause before start typing
//     typeSpeed = 500;
//   }

//   setTimeout(() => this.type(), 500);
// }


// Init on DOM load
document.addEventListener('DOMContentLoaded', init);

// Init app
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init typewriter
  new TypeWriter(txtElement, words, wait);
}


// ES6 Class
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // current index of word
    const current = this.wordIndex % this.words.length;
    // get full text of current word
    const fullTxt = this.words[current];
  
    // check if deleting
    if (this.isDeleting) {
      // remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
  
    // insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
    
    // initial type speed
    let typeSpeed = 300;
    
    if (this.isDeleting) {
      typeSpeed /= 2;
    }
  
    // has word been completed
    if (!this.isDeleting && this.txt === fullTxt) {
      // pause at the end
      typeSpeed = this.wait;
      // set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // move to next wor
      this.wordIndex++;
      // pause before start typing
      typeSpeed = 500;
    }
  
    setTimeout(() => this.type(), typeSpeed);
  }
}