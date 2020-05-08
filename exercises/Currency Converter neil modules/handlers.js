import { formatCurrency } from './utilities.js';
import { convertAmountForCurrencies } from './currency_conversion.js';
import {
  fromAmountInput,
  fromCurrencySelect,
  toAmountElem,
  toCurrencySelect,
} from './elements.js';

async function handleCurrencyInput(e) {
  if (
    !fromAmountInput.value ||
    !fromCurrencySelect.value ||
    !toCurrencySelect.value
  ) {
    return;
  }

  const toAmount = await convertAmountForCurrencies(
    fromAmountInput.value,
    fromCurrencySelect.value,
    toCurrencySelect.value
  ).catch(err => console.log(err));

  toAmountElem.textContent = formatCurrency(toCurrencySelect.value, toAmount);
}

export default handleCurrencyInput;
