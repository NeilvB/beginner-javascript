import { buttonText as buttonTexts } from './button_text.js';
import { button, waitingIndicator, jokeContainer } from './elements.js';

const jokeURL = 'https://icanhazdadjoke.com';

function randomNewButtonText(currentText) {
  const filteredText = buttonTexts.filter(text => text !== currentText);
  const randomIndex = Math.floor(Math.random() * filteredText.length);

  return filteredText[randomIndex];
}

async function fetchJoke() {
  const response = await fetch(jokeURL, {
    headers: { Accept: 'application/json' },
  });

  const jokeJSON = await response.json();

  return jokeJSON.joke;
}

export async function insertNewDadJoke() {
  waitingIndicator.classList.remove('hidden');

  const joke = await fetchJoke();

  jokeContainer.textContent = joke;

  waitingIndicator.classList.add('hidden');
  button.textContent = randomNewButtonText(button.textContent);
}
