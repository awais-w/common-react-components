import moment from 'moment';

/**
 *
 * @param {string} date
 * @example
 * const startDate = "2016-04-18T13:0:00+01:00";
 * const endDate = "2016-04-18T13:08:00+01:00";
 * const formattedDate = formatDateRange(startDate, endDate);
 */
const formatDateRange = (startDate, endDate) => {
  moment.updateLocale('en', {
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
  });

  if (!startDate || !endDate) {
    return 'Unknown';
  }
  const startDateMoment = moment(startDate);
  const endDateMoment = moment(endDate);

  if (!startDateMoment || !endDateMoment) {
    return '';
  }

  const startDayMonth = startDateMoment.format('MMM Do');
  const endDayMonth = endDateMoment.format('MMM Do');

  const getTimeFormat = (date) => (date.minutes() === 0 ? date.format('ha') : date.format('h:mma'));

  let dateRange = `${startDayMonth}, ${getTimeFormat(startDateMoment)} - `;

  dateRange +=
    startDayMonth === endDayMonth ? getTimeFormat(endDateMoment) : `${endDayMonth}, ${getTimeFormat(endDateMoment)}`;

  return dateRange;
};

export default formatDateRange;
