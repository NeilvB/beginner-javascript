const baseConversionUrl = 'https://api.exchangeratesapi.io/latest';

const baseRates = {};

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

export { convertAmountForCurrencies };
