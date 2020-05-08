// Can be used to access various DOM elements present in the app
// How could this be scoped to the component?
export const toAmountElem = document.querySelector('.to_amount');
export const toCurrencySelect = document.querySelector('[name="to_currency"]');
export const fromCurrencySelect = document.querySelector(
  '[name="from_currency"]'
);
export const fromAmountInput = document.querySelector(
  'input[name="from_amount"]'
);
