import currencies from './currencies.js';
import { buildSelectOptionsHTML } from './utilities.js';
import { fromCurrencySelect, toCurrencySelect } from './elements.js';
import handleCurrencyInput from './handlers.js';

export function init() {
  const conversionForm = document.querySelector('form');

  const optionsFromObject = buildSelectOptionsHTML(currencies);

  fromCurrencySelect.insertAdjacentHTML('beforeend', optionsFromObject);
  toCurrencySelect.insertAdjacentHTML('beforeend', optionsFromObject);

  conversionForm.addEventListener('input', handleCurrencyInput);
}
