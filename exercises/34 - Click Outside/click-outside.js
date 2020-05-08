const cardButtons = document.querySelectorAll('.card button');
const modalOuter = document.querySelector('.modal-outer');
const modalInner = document.querySelector('.modal-inner');

function handleCardButtonClick(event) {
  // Make the modal window appear by setting a class

  const button = event.target;
  const card = button.closest('.card');

  const imageSrc = card.querySelector('img').src;
  const desc = card.dataset.description;

  modalInner.innerHTML = `
    <img src="${imageSrc}">
    <p>${desc}</p>
  `;

  modalOuter.classList.add('open');
}

cardButtons.forEach(button =>
  button.addEventListener('click', handleCardButtonClick)
);

function closeModal() {
  modalOuter.classList.remove('open');
}

modalOuter.addEventListener('click', function(event) {
  // if (event.target === modalOuter) {
  //   // this is a bit aggressive as it means it's difficult to add external things to click on e.g. buttons in the outside
  //   closeModal();
  // }
  // Make the modal window disappear by setting a class

  const isOutside = !event.target.closest('.modal-inner');
  if (isOutside) {
    closeModal();
  }
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
  }
});
