import { handleJokeClick } from './handlers.js';
import { button } from './elements.js';

export function init() {
  button.addEventListener('click', handleJokeClick);
}
