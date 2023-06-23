import formatDateRange from '../formatDateRange/formatDateRange';

const formatTimeRange = (startDate, endDate) => {
  const formattedDate = formatDateRange(startDate, endDate);
  const splitDateTime = formattedDate.split(',');
  return splitDateTime.length === 2 ? splitDateTime[1].trim() : formattedDate;
};

export default formatTimeRange;
