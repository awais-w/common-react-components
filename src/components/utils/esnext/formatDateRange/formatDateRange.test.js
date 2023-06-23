import formatDateRange from './formatDateRange';

describe('formatDateRange', () => {
  test('formatDateRange same day with zero minutes', () => {
    const startDate = '2016-06-22T14:00:00';
    const endDate = '2016-06-22T18:00:00';

    const formattedDate = formatDateRange(startDate, endDate);
    expect(formattedDate).toBe('Jun 22nd, 2pm - 6pm');
  });

  test('formatDateRange same day with non-zero minutes', () => {
    const startDate = '2016-06-22T14:11:00';
    const endDate = '2016-06-22T18:12:00';

    const formattedDate = formatDateRange(startDate, endDate);
    expect(formattedDate).toBe('Jun 22nd, 2:11pm - 6:12pm');
  });

  test('formatDateRange different day with non-zero minutes', () => {
    const startDate = '2016-06-22T14:11:00';
    const endDate = '2016-09-03T18:12:00';

    const formattedDate = formatDateRange(startDate, endDate);
    expect(formattedDate).toBe('Jun 22nd, 2:11pm - Sept 3rd, 6:12pm');
  });
});
