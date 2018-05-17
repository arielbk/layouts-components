// Important lession: load js file at the end of the body tag
// It took me a little while to figure out why querySelector was returning empty NodeLists...

// start by 'cutting the mustard'.. see: https://justmarkup.com/log/2015/02/cut-the-mustard-revisited/
if ('querySelector' in document &&
    'localStorage' in window &&
    'addEventListener' in window) {
  // modern browser scripts

  var toggleButtons = document.querySelectorAll('.toggle-content');
  var fullTextWrappers = document.querySelectorAll('.fulltext');
  var fullText;
  var toggleButtonText;

  [].forEach.call(fullTextWrappers, function(fullTextWrapper) {
    // hide all full text on load
    fullTextWrapper.setAttribute('hidden', true);
  });

  [].forEach.call(toggleButtons, function(toggleButton) {
    // show toggle more buttons
    toggleButton.removeAttribute('hidden');

    // add event listener for each button
    toggleButton.addEventListener('click', function() {

      fullTextWrapper = this.parentElement.querySelector('.fulltext');
      toggleButtonText = this.querySelector('.text');

      // change attributes if full text is shown or hidden
      if (fullTextWrapper.hasAttribute('hidden')) {
        toggleButtonText.innerText = 'Show less';
        fullTextWrapper.removeAttribute('hidden');
        toggleButton.setAttribute('aria-expanded', true);
      } else {
        toggleButtonText.innerText = 'Show more';
        fullTextWrapper.setAttribute('hidden', true);
        toggleButton.setAttribute('aria-expanded', false);
      }
    });
  });
}
