const CURRENCY_SYMBOLS = {
  EUR: '€',
};

/**
 * Format an amount in a currency
 * @param amount
 * @param currency
 * @param decimals
 * @param removeTrailingZeros
 * @returns {string}
 */
export function formatAmount(
  amount,
  currency,
  decimals = 2,
  removeTrailingZeros = false
) {
  let price = amount.toFixed(decimals);
  let numberFormat = new Intl.NumberFormat(['nl-NL'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  });
  let formatted = numberFormat.format(price);
  if (removeTrailingZeros) {
    formatted = formatted.replace(/[.,]0+/, '');
  }
  return formatted;
}

export function getSymbolForCurrency(currency) {
  return CURRENCY_SYMBOLS[currency];
}
