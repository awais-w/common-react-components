import formatName from './formatName';

describe('utils', () => {
  describe('formatName', () => {
    it('full name provided', () =>
      expect(formatName({ title: 'Title', name: 'name', surname: 'surname', middleName: 'middleName' })).toBe(
        'Title name middleName SURNAME',
      ));
    it('when title not provided', () =>
      expect(formatName({ name: 'name', surname: 'surname', middleName: 'middleName' })).toBe(
        'name middleName SURNAME',
      ));
    it('when name not provided', () =>
      expect(formatName({ title: 'Title', name: '', surname: 'surname' })).toBe('Title SURNAME'));
    it('when middleName not provided', () =>
      expect(formatName({ title: 'Title', name: 'name', surname: 'surname' })).toBe('Title name SURNAME'));
    it('when surname not provided', () =>
      expect(formatName({ title: 'Title', name: 'name', surname: '' })).toBe('Title name '));
    describe('throws an error when required fields are not provided', () => {
      it('when name and surname not provided', () => expect(() => formatName({})).toThrow());
    });
  });
});
