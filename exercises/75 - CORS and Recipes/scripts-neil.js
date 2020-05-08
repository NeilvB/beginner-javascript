// http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3

// Optional Parameters:
// i : comma delimited ingredients
// q : normal search query
// p : page
// format=xml : if you want xml instead of json

// <div class="wrapper">
// <form class="search" autocomplete="off">
//   <input type="text" name="query" value="pizza">
//   <button name="submit" type="submit">Submit</button>
// </form>
// <div class="recipes"></div>
// </div>

// 1. Listen for submit event on search form ✅
// 1a. Disable the button on click and change text ? ✅
// 2. Submit a query to the API, making use of the supplied query as q ? ✅
// 3. Display returned contents in the recipes div, each a div.recipe
// 4. Handle error responses

const baseUrl = 'http://www.recipepuppy.com/api?';
const recipes = document.querySelector('.recipes');
const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';

async function searchRecipes(e) {
  recipes.innerHTML = '';

  e.preventDefault();

  const form = e.currentTarget;
  const submitButton = form.elements.submit; // The input name
  const preSubmitButtonText = submitButton.textContent; // Save for use later

  const queryParameters = `q=${form.elements.query.value}`;
  const queryEndpoint = corsProxyUrl + baseUrl + queryParameters;

  submitButton.disabled = true;

  submitButton.textContent = 'Searching Recipes ...';
  const response = await fetch(queryEndpoint);

  submitButton.textContent = 'Loading Recipe data ...';
  const recipeData = await response.json();

  const recipesFragment = document.createDocumentFragment();

  recipeData.results.forEach(recipe => {
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');

    recipeDiv.innerHTML = `
      <p>${recipe.title}</p>
      <img src=${recipe.thumbnail}>
    `;

    // Appending to the fragment doesn't cause the page to re-render
    recipesFragment.appendChild(recipeDiv);
  });

  recipes.appendChild(recipesFragment);

  submitButton.textContent = preSubmitButtonText;
  submitButton.disabled = false;
}

function handleSearchError(err) {
  console.log(err);

  recipes.innerHTML = `<p>OOPS!</p>`;
}

const submitForm = document.querySelector('form.search');
submitForm.addEventListener('click', e => {
  searchRecipes(e).catch(handleSearchError);
});
