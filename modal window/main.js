var modal = document.getElementById('simple-modal');
var modalBtn = document.getElementById('modal-btn');
var closeBtn = document.getElementById('btn-close');

modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

function openModal() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

function outsideClick (e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}
