/**
 *
 * @description Convert an amount of money to a formatted money string
 * @param {string} moneyAmount The value to convert
 * @param {string} currency - The currency we wish to convert to. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
 * @return {string}
 * @example
 * formatMoney(
 *    12.5,
 *    'GBP'
 * )
 */
const formatMoney = (moneyAmount, currency = 'GBP') => {
  const options = { style: 'currency', currency };
  return new Intl.NumberFormat('en-GB', options).format(moneyAmount);
};

export default formatMoney;
