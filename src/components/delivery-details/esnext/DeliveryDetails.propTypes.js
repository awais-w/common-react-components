import PropTypes from 'prop-types';

const propTypes = {
  contact: PropTypes.shape({
    person: PropTypes.object,
    business: PropTypes.string,
    emails: PropTypes.array,
    telephones: PropTypes.array,
  }).isRequired,
  address: PropTypes.shape({
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    county: PropTypes.string,
    line1: PropTypes.string.isRequired,
    line2: PropTypes.string,
    line3: PropTypes.string,
    postcode: PropTypes.string.isRequired,
  }),
  deliveryTracking: PropTypes.shape({
    bookedSlot: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    actualArrival: PropTypes.string,
    plannedArrival: PropTypes.string,
    dropNumber: PropTypes.number,
    instructions: PropTypes.string,
    origin: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.name.isRequired,
    }),
  }),
  title2: PropTypes.string,
  title3: PropTypes.string,
  isClickAndCollect: PropTypes.bool,
};

export default propTypes;
