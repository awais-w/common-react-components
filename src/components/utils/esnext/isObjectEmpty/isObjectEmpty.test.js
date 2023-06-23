import isObjectEmpty from './isObjectEmpty';

describe('isEmpty', () => {
  it('returns true for {}', () => {
    expect(isObjectEmpty({})).toBe(true);
  });
  it('returns false for { test: 1 }', () => {
    expect(isObjectEmpty({ test: 1 })).toBe(false);
  });
  it('returns true for empty array', () => {
    expect(isObjectEmpty([])).toBe(true);
  });
  it('returns false for array containing empty obj', () => {
    expect(isObjectEmpty([{}])).toBe(false);
  });
  it('returns true for null', () => {
    expect(isObjectEmpty(null)).toBe(true);
  });
  it('returns true for undefined', () => {
    isObjectEmpty(undefined);
  });
});
