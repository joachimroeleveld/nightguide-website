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
  let numberFormat = new Intl.NumberFormat(['nl-NL'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
    minimumFractionDigits: decimals,
  });
  let formatted = numberFormat.format(amount);
  if (removeTrailingZeros) {
    formatted = formatted.replace(/[.,]0+/, '');
  }
  return formatted;
}

export function getSymbolForCurrency(currency) {
  return CURRENCY_SYMBOLS[currency];
}
