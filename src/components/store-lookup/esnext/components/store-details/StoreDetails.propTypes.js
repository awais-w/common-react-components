import propTypes from 'prop-types';

export default {
  id: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  distance: propTypes.string.isRequired,
  address: propTypes.string.isRequired,
  phoneNumber: propTypes.string,
};
