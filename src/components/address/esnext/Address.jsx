import React from 'react';
import PropTypes from 'prop-types';
import bem from '@argos/utils/esnext/bem';
import AddressCompact from './components/AddressCompact';
import AddressDetailed from './components/AddressDetailed';
import AddressInline from './components/AddressInline';
import './Address.scss';

const cn = bem({ prefix: 'cmc-', block: 'address' });

const Address = ({ address, mode }) => {
  const result = (() => {
    switch (mode) {
      case 'INLINE':
        return <AddressInline {...address} />;
      case 'COMPACT':
        return <AddressCompact {...address} />;
      default:
        return <AddressDetailed {...address} />;
    }
  })();
  return <div className={cn()}>{result}</div>;
};

Address.propTypes = {
  address: PropTypes.shape({
    city: PropTypes.string.isRequired,
    country: PropTypes.string,
    county: PropTypes.string,
    line1: PropTypes.string.isRequired,
    line2: PropTypes.string,
    line3: PropTypes.string,
    postcode: PropTypes.string.isRequired,
  }),
  mode: PropTypes.oneOf(['INLINE', 'COMPACT', 'DETAILED']),
};
export default Address;
