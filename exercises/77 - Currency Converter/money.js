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

const fromCurrencySelect = document.querySelector('[name="from_currency"]');
const toCurrencySelect = document.querySelector('[name="to_currency"]');

const baseConversionUrl = 'https://api.exchangeratesapi.io/latest';

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
    <option name="${acronym}">
      ${fullName}
    </option>
  `
);

async function fetchCurrencyConversionData(baseCurrencyCode) {
  const fullConversionUrl = `${baseConversionUrl}?base=${baseCurrencyCode}`;

  const conversionResponse = await fetch(fullConversionUrl);

  const conversionData = await conversionResponse.json();
  return conversionData;
}

// {
//   "rates": {
//       "CAD": 1.4074932765,
//   },
//   "base": "USD",
//   "date": "2020-05-07"
// }

async function convertAmountForCurrencies(
  baseCurrencyAmount,
  baseCurrencyCode,
  targetCurrencyCode
) {
  const conversionData = await fetchCurrencyConversionData(baseCurrencyCode);
  const conversionRate = conversionData.rates[targetCurrencyCode];

  return baseCurrencyAmount * conversionRate;
}

fromCurrencySelect.insertAdjacentHTML('beforeend', currencyOptions.join(''));
toCurrencySelect.insertAdjacentHTML('beforeend', currencyOptions.join(''));

// toCurrencySelect.addEventListener('input');
