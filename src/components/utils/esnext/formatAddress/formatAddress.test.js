import formatAddress from './formatAddress';

describe('formatAddress', () => {
  const address = {
    city: 'city',
    country: 'country',
    county: 'county',
    line1: 'line1',
    line2: 'line2',
    line3: 'line3',
    postcode: 'postcode',
  };
  test('with full address provided', () =>
    expect(formatAddress(address)).toBe('line1, line2, line3, city postcode, county, country'));
  test('line1, line2, line3, city postcode', () => {
    const { county, country, ...rest } = address;
    expect(formatAddress(rest)).toBe('line1, line2, line3, city postcode');
  });
  test('line1, city postcode, county, country', () => {
    const { line2, line3, ...rest } = address;
    expect(formatAddress(rest)).toBe('line1, city postcode, county, country');
  });
  test('line1, line2, line3, city postcode, country', () => {
    const { county, ...rest } = address;
    expect(formatAddress(rest)).toBe('line1, line2, line3, city postcode, country');
  });
  test('city postcode, county', () => {
    expect(formatAddress({ postcode: 'postcode', city: 'city', county: 'county' })).toBe('city postcode, county');
  });
  test('line1, line2, line3', () => {
    expect(formatAddress({ line1: 'line1', line2: 'line2', line3: 'line3' })).toBe('line1, line2, line3');
  });
});
