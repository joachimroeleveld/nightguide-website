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
  let val =
    getSymbolForCurrency(currency) +
    Number(amount)
      .toFixed(decimals)
      .replace('.', ',');
  if (removeTrailingZeros) {
    val = val.replace(/,0+/, '');
  }
  return val;
}

export function getSymbolForCurrency(currency) {
  return CURRENCY_SYMBOLS[currency];
}

export function getUserCurrency() {
  return 'EUR';
}

export function getUserCurrencySymbol() {
  return CURRENCY_SYMBOLS[getUserCurrency()];
}
