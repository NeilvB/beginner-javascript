const buttonText = [
  'Ugh.',
  '🤦🏻‍♂️',
  'omg dad.',
  'you are the worst',
  'seriously',
  'stop it.',
  'please stop',
  'that was the worst one',
];

const jokeContainer = document.querySelector('.joke');
const button = document.querySelector('button.getJoke');
const waitingIndicator = button.querySelector('.lds-ripple');
const jokeURL = 'https://icanhazdadjoke.com';

function handleError(fnc, callback) {
  fnc.catch(err => callback(err));
}

function randomNewButtonText(currentText) {
  const filteredText = buttonText.filter(text => text !== currentText);
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

async function insertNewDadJoke() {
  waitingIndicator.classList.remove('hidden');

  const joke = await fetchJoke();

  jokeContainer.textContent = joke;

  waitingIndicator.classList.add('hidden');
}

function handleJokeClick() {
  handleError(insertNewDadJoke(), function(err) {
    waitingIndicator.classList.add('hidden');

    jokeContainer.textContent = "Oops. We can't find jokes right now";
    console.warn(err);
  });

  button.textContent = randomNewButtonText(button.textContent);
}

button.addEventListener('click', handleJokeClick);

// Listen for a button click     DONE
// Remove the hidden element from the ripple element  DONE
// Call the https://icanhazdadjoke.com with a header of application/json  DONE
// Handle an error   DONE
// Extract the JSON from the response object  DONE
// Set the inner HTML of the joke div  DONE
// Add the hidden attribute back to the ripple element  DONE
// Set the button to a random new value without repeating the current one
