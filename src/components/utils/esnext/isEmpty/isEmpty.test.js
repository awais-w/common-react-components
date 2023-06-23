import isEmpty from './isEmpty';

describe('isEmpty', () => {
  it('returns true for null', () => {
    expect(isEmpty(null)).toBe(true);
  });

  it('returns true for undefined', () => {
    expect(isEmpty(undefined)).toBe(true);
  });

  it('returns true for empty string', () => {
    expect(isEmpty('')).toBe(true);
  });

  it('returns false for non empty string', () => {
    expect(isEmpty('a string')).toBe(false);
  });

  it('returns false for number 6', () => {
    expect(isEmpty(6)).toBe(false);
  });

  it('returns false for number 0', () => {
    expect(isEmpty(0)).toBe(false);
  });
});
