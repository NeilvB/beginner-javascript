// Make a div
const wrapperDiv = document.createElement('div');

// add a class of wrapper to it
wrapperDiv.classList.add('wrapper');

// put it into the body
document.body.appendChild(wrapperDiv);

// make an unordered list
const unorderedList = document.createElement('ul');

// add three list items with the words "one, two three" in them
const item1 = document.createElement('li');
item1.textContent = 'one';

const item2 = document.createElement('li');
item2.textContent = 'two';

const item3 = document.createElement('li');
item3.textContent = 'three';

unorderedList.appendChild(item1);
unorderedList.appendChild(item2);
unorderedList.appendChild(item3);

// put that list into the above wrapper

wrapperDiv.appendChild(unorderedList);

// create an image

const image = document.createElement('img');

// set the source to an image
image.src = 'https://picsum.photos/200';

// set the width to 250
image.width = 250;

// add a class of cute
image.classList.add('cute');

// add an alt of Cute Puppy

image.alt = 'Cute Puppy';

// Append that image to the wrapper
wrapperDiv.appendChild(image);

// with HTML string, make a div, with two paragraphs inside of it
// put this div before the unordered list from above

// I can use innerHTML to change an existing element

// I can make fragments to append, but I don't know how to add fragments adjacent to existing nodes

const paragraphDiv = document.createElement('div');
paragraphDiv.innerHTML = `
    <p>Para 1</p>
    <p>Para 2</p>
`;

unorderedList.insertAdjacentElement('beforebegin', paragraphDiv);

// add a class to the second paragraph called warning
paragraphDiv.querySelector('p:last-of-type').classList.add('warning');

// remove the first paragraph
paragraphDiv.querySelector('p:first-of-type').remove();

// create a function called generatePlayerCard that takes in three arguments: name, age, and height

function generatePlayerCard(name, age, height) {
  return document.createRange().createContextualFragment(`
    <div class="playerCard">
      <h2>${name} — ${age}</h2>
      <p>They are ${height} and ${age} years old. In Dog years this person would be ${Math.floor(
    age / 7
  )}. That would be a tall dog!</p>
      <button class="delete">Delete</button>
    </div>
  `);
}

// make a new div with a class of cards
const cardDiv = document.createElement('div');
cardDiv.classList.add('cards');

// Have that function make 4 cards
const card1 = generatePlayerCard('woo', 33, 39);
const card2 = generatePlayerCard('woo', 23, 139);
const card3 = generatePlayerCard('woo', 10, 55);
const card4 = generatePlayerCard('woo', 33, 50);

// append those cards to the div

cardDiv.appendChild(card1);
cardDiv.appendChild(card2);
cardDiv.appendChild(card3);
cardDiv.appendChild(card4);

// put the div into the DOM just before the wrapper element
wrapperDiv.insertAdjacentElement('beforebegin', cardDiv);

document.querySelectorAll('.delete').forEach(function(deleteButton) {
  deleteButton.addEventListener('click', () =>
    deleteButton.parentElement.remove()
  );
});
