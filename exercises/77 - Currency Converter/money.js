const currencies = {
  USD: 'United States Dollar',
  AUD: 'Australian Dollar',
  BGN: 'Bulgarian Lev',
  BRL: 'Brazilian Real',
  CAD: 'Canadian Dollar',
  CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan',
  CZK: 'Czech Republic Koruna',
  DKK: 'Danish Krone',
  GBP: 'British Pound Sterling',
  HKD: 'Hong Kong Dollar',
  HRK: 'Croatian Kuna',
  HUF: 'Hungarian Forint',
  IDR: 'Indonesian Rupiah',
  ILS: 'Israeli New Sheqel',
  INR: 'Indian Rupee',
  JPY: 'Japanese Yen',
  KRW: 'South Korean Won',
  MXN: 'Mexican Peso',
  MYR: 'Malaysian Ringgit',
  NOK: 'Norwegian Krone',
  NZD: 'New Zealand Dollar',
  PHP: 'Philippine Peso',
  PLN: 'Polish Zloty',
  RON: 'Romanian Leu',
  RUB: 'Russian Ruble',
  SEK: 'Swedish Krona',
  SGD: 'Singapore Dollar',
  THB: 'Thai Baht',
  TRY: 'Turkish Lira',
  ZAR: 'South African Rand',
  EUR: 'Euro',
};

const conversionForm = document.querySelector('form');
const fromAmountInput = document.querySelector('input[name="from_amount"]');
const toAmountElem = document.querySelector('.to_amount');

const fromCurrencySelect = document.querySelector('[name="from_currency"]');
const toCurrencySelect = document.querySelector('[name="to_currency"]');

const baseConversionUrl = 'https://api.exchangeratesapi.io/latest';

const baseRates = {};

const orderedCurrenciesEntries = Object.entries(currencies).sort((a, b) => {
  if (a[1] < b[1]) {
    return -1;
  }
  if (a[1] > b[1]) {
    return 1;
  }
  return 0;
});

const currencyOptions = orderedCurrenciesEntries.map(
  ([acronym, fullName]) => `
    <option value="${acronym}">
      ${fullName}
    </option>
  `
);

function formatCurrency(currency, amount) {
  return Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
  }).format(amount);
}

async function fetchCurrencyConversionData(baseCurrencyCode) {
  const fullConversionUrl = `${baseConversionUrl}?base=${baseCurrencyCode}`;

  const conversionResponse = await fetch(fullConversionUrl);

  const conversionData = await conversionResponse.json();
  return conversionData;
}

async function convertAmountForCurrencies(
  baseCurrencyAmount,
  baseCurrencyCode,
  targetCurrencyCode
) {
  if (!baseRates[baseCurrencyCode]) {
    // We need to fetch our rates and store them in the cache
    const conversionData = await fetchCurrencyConversionData(baseCurrencyCode);
    baseRates[baseCurrencyCode] = conversionData.rates;
  }

  return baseCurrencyAmount * baseRates[baseCurrencyCode][targetCurrencyCode];
}

fromCurrencySelect.insertAdjacentHTML('beforeend', currencyOptions.join(''));
toCurrencySelect.insertAdjacentHTML('beforeend', currencyOptions.join(''));

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

conversionForm.addEventListener('input', handleCurrencyInput);
