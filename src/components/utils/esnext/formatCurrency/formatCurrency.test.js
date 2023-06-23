import formatCurrency from './formatCurrency';

describe('formatCurrency', () => {
  test('should return correct symbol for a supported currency', () => {
    expect(
      formatCurrency({
        input: '£',
        outputFormat: 'abbreviation',
      }),
    ).toBe('GBP');
  });

  test('should return correct abbreviation for a supported currency', () => {
    expect(
      formatCurrency({
        input: 'GBP',
        outputFormat: 'symbol',
      }),
    ).toBe('£');
  });

  test('should return default symbol when not provided input', () => {
    expect(
      formatCurrency({
        outputFormat: 'abbreviation',
      }),
    ).toBe('GBP');
  });

  test('should return default abbreviation when not provided input', () => {
    expect(
      formatCurrency({
        outputFormat: 'symbol',
      }),
    ).toBe('£');
  });

  test('should return a "not supported" message if no lookup result found', () => {
    const badInput = 'BAD INPUT';
    expect(
      formatCurrency({
        input: badInput,
        outputFormat: 'symbol',
      }),
    ).toBe('Unsupported abbreviation');
    expect(
      formatCurrency({
        input: badInput,
        outputFormat: 'abbreviation',
      }),
    ).toBe('Unsupported symbol');
  });
});
