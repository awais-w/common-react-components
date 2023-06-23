import propTypes from 'prop-types';

export default {
  postcode: propTypes.string.isRequired,
  authToken: propTypes.string.isRequired,
  storesEndpoint: propTypes.string.isRequired,
  errorMessage: propTypes.string,
};
