const unorderedList = document.createElement('ul');

const item1 = document.createElement('li');
item1.innerText = 'Item 1';

const item2 = document.createElement('li');
item2.innerText = 'Item 2';

const item3 = document.createElement('li');
item3.innerText = 'Item 3';

const item4 = document.createElement('li');
item4.innerText = 'Item 4';

const item5 = item4.cloneNode();

unorderedList.appendChild(item2);
item2.insertAdjacentElement('beforebegin', item1); // item2 needs to have a parent before you can insert an element before it

unorderedList.appendChild(item3);
item3.insertAdjacentElement('afterend', item4);

unorderedList.appendChild(item5);

document.body.insertAdjacentElement('beforeend', unorderedList);
