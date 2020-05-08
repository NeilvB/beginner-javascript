function wait(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function removeAndDestroyForm(form) {
  form.classList.remove('open');
  form.remove(); // Remove element from the DOM (but still in memory)
  form = null; // Remove object from memory
}

function createPopUpFragment(options) {
  const range = document.createRange();

  return range.createContextualFragment(`
    <form class="popup" id=${options.id}>
      <fieldset>
        <label>${options.text}</label>
        <input type="text" name="input" />
        <button type="submit">Go</button>
        ${
          options.cancel
            ? '<button type="button" class="cancel">Cancel</button>'
            : ''
        }
      </fieldset>
    </form>
  `);
}

function ask(options) {
  return new Promise(async function(resolve, reject) {
    const wrapperDiv = document.querySelector('.wrapper');
    const id = `A${Math.floor(Math.random() * 16777215).toString(16)}`;

    const popUpFragment = createPopUpFragment({ ...options, id });

    // Listen for submit
    popUpFragment
      .querySelector('form.popup')
      .addEventListener('submit', function(e) {
        const form = e.target;

        e.preventDefault();

        resolve(form.input.value);

        removeAndDestroyForm(form); // Remove object from memory
      });

    // Listen for cancel
    if (options.cancel) {
      popUpFragment
        .querySelector('button.cancel')
        .addEventListener('click', function(e) {
          const form = e.target.closest('form.popup');

          resolve(null);

          removeAndDestroyForm(form); // Remove object from memory
        });
    }

    wrapperDiv.appendChild(popUpFragment); // Appending to the DOM removes the content of this fragment

    // Add a timeout of zero. This pushes it, via Web APIs, onto the callback queue, which is enough to trigger the CSS change from opacity 0 to 1
    await wait();
    document.querySelector(`#${id}`).classList.add('open');
  });
}

const questionButtons = document.querySelectorAll('.wrapper button.askMe');

const nameSpan = document.querySelector('span.name');
const ageSpan = document.querySelector('span.age');

const questions = [
  { text: 'Cheese?', cancel: false },
  { text: 'Name?', cancel: true },
  { text: 'Pears?', cancel: false },
];

async function asyncMap(array, asyncCallback) {
  const results = [];

  for (const item of array) {
    results.push(await asyncCallback(item));
  }

  return results;
}

async function askQuestionsAndPrintAnswers() {
  const answers = await asyncMap(questions, ask);

  console.log(answers);
}

askQuestionsAndPrintAnswers();

// Promise.all([
//   ask(questions[0]),
//   ask(questions[1]),
//   ask(questions[2]),
// ]).then(answers => console.log(answers));

// console.log(askAllTheThings);

// questionButtons.forEach(function(button) {
//   button.addEventListener('click', async function() {
//     const answer = await ask({
//       text: button.dataset.question,
//       cancel: button.hasAttribute('data-cancel'),
//     });

//     if (button.dataset.question.match(/name/)) {
//       nameSpan.innerText = answer;
//     } else {
//       ageSpan.innerText = answer;
//     }
//   });
// });
