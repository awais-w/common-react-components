/**
 *
 * @description Convert symbols / currency abbreviations into different form
 * @param {string} input The value to convert
 * @param {string} outputFormat - Define we want an abbreviation or a symbol back
 * @return {string}
 * @example
 * formatCurrency({
 *    input : "£",
 *    outputFormat : "abbreviation"
 * })
 */
const formatCurrency = ({ input, outputFormat }) => {
  const getSymbolForAbbreviation = ({ abbreviation = 'GBP' }) => {
    const abbreviationToSymbolMap = {
      EUR: '€',
      GBP: '£',
      USD: '$',
    };

    return abbreviationToSymbolMap[abbreviation] ? abbreviationToSymbolMap[abbreviation] : 'Unsupported abbreviation';
  };

  const getAbbreviationForSymbol = ({ symbol = '£' }) => {
    const symbolToAbbreviationMap = {
      /* eslint-disable */
      '€': 'EUR',
      '£': 'GBP',
      $: 'USD',
      /* eslint-enable */
    };

    return symbolToAbbreviationMap[symbol] ? symbolToAbbreviationMap[symbol] : 'Unsupported symbol';
  };

  return outputFormat === 'symbol'
    ? getSymbolForAbbreviation({ abbreviation: input })
    : getAbbreviationForSymbol({ symbol: input });
};

export default formatCurrency;
