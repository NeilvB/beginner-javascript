function wait(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function randomBetween(min, max) {
  return min + Math.floor(Math.random() * (max + 1) - min);
}

async function typeItOut(element) {
  const text = element.textContent;

  const min = Number.parseInt(element.dataset.typeMin) || 50;
  const max = Number.parseInt(element.dataset.typeMax) || 60;

  let textSoFar = '';

  for (const character of text) {
    await wait(randomBetween(min, max));

    textSoFar += character;

    element.innerText = textSoFar;
  }
}

const elementsToType = document.querySelectorAll('[data-type]');

elementsToType.forEach(typeItOut);
