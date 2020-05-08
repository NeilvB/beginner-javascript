import { handleError } from './utils.js';
import { waitingIndicator, jokeContainer } from './elements.js';
import { insertNewDadJoke } from './lib.js';

export function handleJokeClick() {
  handleError(insertNewDadJoke(), function(err) {
    waitingIndicator.classList.add('hidden');

    jokeContainer.textContent = "Oops. We can't find jokes right now";
    console.warn(err);
  });
}
