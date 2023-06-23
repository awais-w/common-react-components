import formatMoney from './formatMoney';

describe('formatMoney', () => {
  test('should return correct string for default options', () => {
    expect(formatMoney(12.5)).toBe('£12.50');
  });

  test('should return correct string for USD', () => {
    expect(formatMoney(11.4, 'USD')).toBe('US$11.40');
  });
});
