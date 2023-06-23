import PropTypes from 'prop-types';

const propTypes = {
  type: PropTypes.string,
  personName: PropTypes.shape({
    title: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
  number: PropTypes.string.isRequired,
  startDate: PropTypes.string,
  expiryDate: PropTypes.string,
};

export default propTypes;
