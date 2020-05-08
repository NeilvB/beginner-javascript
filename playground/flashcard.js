const cardText = document.querySelector('.prompt');
const card = document.querySelector('.flashcard');

function flipCard(e) {
  const newText = cardText.dataset.details;

  cardText.dataset.details = cardText.innerText;
  cardText.innerText = newText;
}

card.addEventListener('click', flipCard);
