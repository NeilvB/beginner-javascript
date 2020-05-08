const shoppingListContainer = document.querySelector('.shopping-list');
const shoppingForm = shoppingListContainer.querySelector('form.shopping');
const listContainer = shoppingListContainer.querySelector('.list');

let shoppingList =
  JSON.parse(window.localStorage.getItem('shoppingList')) || [];

function setShoppingList(list) {
  window.localStorage.setItem('shoppingList', JSON.stringify(list));
}

function findItemInListById(id) {
  return shoppingList.find(i => i.id === id); // it would be cool if JS had a kind of "scope" we could add to shoppingList - prototype???
}

function removeItem(id) {
  const itemTextToRemoveIndex = shoppingList.indexOf(findItemInListById(id));

  shoppingList = [
    ...shoppingList.slice(0, itemTextToRemoveIndex),
    ...shoppingList.slice(itemTextToRemoveIndex + 1),
  ];

  listContainer.dispatchEvent(new CustomEvent('shoppingListStateUpdated'));
}

function checkItem(id) {
  const checkbox = listContainer.querySelector(`#check-${id}`);
  const item = findItemInListById(id);

  item.checked = checkbox.checked;
}

function renderShoppingList() {
  const listHTML = shoppingList.map((item, i) => {
    /* eslint-disable */
    const stuff = `
      <li class="shopping-item" id="${item.id}">
        <input type="checkbox" id="check-${item.id}" ${item.checked ? 'checked' : ''}>
        <label class="itemName" for="check-${item.id}">${item.name}</label>
        <button class="remove-item-button" aria-label="Remove ${item.name}">🛶</button>
      </li>
    `;
    /* eslint-enable */

    return stuff;
  });

  listContainer.innerHTML = listHTML.join('');
}

// Add submitted items to a collection
shoppingForm.addEventListener('submit', e => {
  const listItemText = e.currentTarget.item.value;

  if (listItemText && !findItemInListById(listItemText)) {
    shoppingList.unshift({
      id: Date.now(),
      name: listItemText.trim(),
      checked: false,
    });

    // Clear the form inputs
    e.currentTarget.reset();
  }

  listContainer.dispatchEvent(new CustomEvent('shoppingListStateUpdated'));

  e.preventDefault(); // stop form submission
});

// Saving the items in localstorage
window.addEventListener('unload', () => {
  setShoppingList(shoppingList);
});

listContainer.addEventListener('shoppingListStateUpdated', () => {
  renderShoppingList(); // update UI to reflect new list state
});

// Event delegation. Set a listener on the "next best" thing to the future child elements and listen on that
// Here we listen on an element known to exist on page load and then delve into the details on the event target
listContainer.addEventListener('click', e => {
  // e.target will be the child element which fired an event
  const clickTarget = e.target;
  const itemId = clickTarget.closest('.shopping-item').id;

  if (clickTarget.matches('button.remove-item-button')) {
    removeItem(Number.parseInt(itemId));
  }

  if (clickTarget.matches('input[type="checkbox"]')) {
    checkItem(Number.parseInt(itemId));
  }
});

renderShoppingList();
