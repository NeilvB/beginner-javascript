import { handleResult } from './handlers-neil';
import { colors as colorsToHex, colorsByLength, isDark } from './colors';

const colorsElem = document.querySelector('.colors');

function displayColors(colors) {
  const colorsHTML = colors.map(
    color =>
      `<span class="color ${
        isDark(color) ? 'dark' : ''
      }" style="background-color: ${
        colorsToHex[color]
      }" data-name="${color}">${color}</span>`
  );

  colorsElem.innerHTML = colorsHTML.join('');
}

// Check for support

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

function start() {
  if (!('SpeechRecognition' in window)) {
    console.log("You can't use this");
    return;
  }

  const recognition = new window.SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onresult = handleResult;
  recognition.start();
}

start();

displayColors(colorsByLength);
