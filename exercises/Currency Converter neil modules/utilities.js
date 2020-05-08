function formatCurrency(currency, amount) {
  return Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
  }).format(amount);
}

// const orderedCurrenciesEntries = Object.entries(currencies).sort((a, b) => {
//   if (a[1] < b[1]) {
//     return -1;
//   }
//   if (a[1] > b[1]) {
//     return 1;
//   }
//   return 0;
// });

function buildSelectOptionsHTML(obj) {
  return Object.entries(obj)
    .map(([value, content]) => `<option value="${value}">${content}</option>`)
    .join('');
}

export { formatCurrency, buildSelectOptionsHTML };
