import { colors, isValidColor } from './colors';

const colorsElem = document.querySelector('.colors');

export function handleResult(event) {
  const { results } = event;

  let wordsSaid = results[results.length - 1][0].transcript;

  wordsSaid = wordsSaid.toLowerCase();

  wordsSaid = wordsSaid.replace(/\s/g, '');

  if (isValidColor(wordsSaid)) {
    const saidColorElem = colorsElem.querySelector(
      `[data-name="${wordsSaid}"]`
    );

    saidColorElem.classList.add('got');

    const body = document.querySelector('body');
    body.setAttribute('style', `background-color: ${colors[wordsSaid]}`);
  }
}
