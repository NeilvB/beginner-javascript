const typer = document.querySelector('.typer');

const textarea = typer.querySelector('[name="text"]');
const filterRadios = typer.querySelectorAll('input[name="filter"]');
const result = typer.querySelector('.result');

const funkyLetters = {
  '-': '₋',
  '!': 'ᵎ',
  '?': 'ˀ',
  '(': '⁽',
  ')': '₎',
  '+': '⁺',
  '=': '₌',
  '0': '⁰',
  '1': '₁',
  '2': '²',
  '4': '₄',
  '5': '₅',
  '6': '₆',
  '7': '⁷',
  '8': '⁸',
  '9': '⁹',
  a: 'ᵃ',
  A: 'ᴬ',
  B: 'ᴮ',
  b: 'ᵦ',
  C: '𝒸',
  d: 'ᵈ',
  D: 'ᴰ',
  e: 'ₑ',
  E: 'ᴱ',
  f: '𝒻',
  F: 'ᶠ',
  g: 'ᵍ',
  G: 'ᴳ',
  h: 'ʰ',
  H: 'ₕ',
  I: 'ᵢ',
  i: 'ᵢ',
  j: 'ʲ',
  J: 'ᴶ',
  K: 'ₖ',
  k: 'ₖ',
  l: 'ˡ',
  L: 'ᴸ',
  m: 'ᵐ',
  M: 'ₘ',
  n: 'ₙ',
  N: 'ᴺ',
  o: 'ᵒ',
  O: 'ᴼ',
  p: 'ᵖ',
  P: 'ᴾ',
  Q: 'ᵠ',
  q: 'ᑫ',
  r: 'ʳ',
  R: 'ᵣ',
  S: 'ˢ',
  s: 'ˢ',
  t: 'ᵗ',
  T: 'ₜ',
  u: 'ᵘ',
  U: 'ᵤ',
  v: 'ᵛ',
  V: 'ᵥ',
  w: '𝓌',
  W: 'ʷ',
  x: 'ˣ',
  X: 'ˣ',
  y: 'y',
  Y: 'Y',
  z: '𝓏',
  Z: 'ᶻ',
};

function selectedFilter() {
  return typer.querySelector(':checked');
}

const filters = {
  sarcastic(char, index) {
    return index % 2 === 0 ? char.toUpperCase() : char;
  },
  funky(char) {
    return funkyLetters[char];
  },
  unable(char) {
    if (char === ' ' && Math.floor(Math.random() * 2)) {
      return '...';
    }

    return char;
  },
};

function filterText(text, filterName) {
  return Array.from(text)
    .map(filters[filterName])
    .join('');
}

// Filter the text on first load of the page
result.innerText = filterText(textarea.value, selectedFilter().value);

// Filter the text when the filter radio is changed
filterRadios.forEach(radio => {
  radio.addEventListener('input', e => {
    result.innerText = filterText(textarea.value, e.target.value);
  });
});

// Re-filter the text every time text is edited
textarea.addEventListener('keyup', () => {
  result.innerText = filterText(textarea.value, selectedFilter().value);
});
