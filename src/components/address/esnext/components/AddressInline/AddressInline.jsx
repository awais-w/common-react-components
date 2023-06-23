import React from 'react';
import PropTypes from 'prop-types';
import IconLabelValue from '@cmc/icon-label-value/esnext';
import bem from '@argos/utils/esnext/bem';
import { formatAddress } from '@cmc/utils/esnext';

const cn = bem({ prefix: 'cmc-', block: 'inline-address' });

const AddressInline = ({ city, country, county, line1, line2, line3, postcode }) => (
  <div className={cn()}>
    <IconLabelValue
      isInline
      icon='home'
      value={formatAddress({ city, country, county, line1, line2, line3, postcode })}
    />
  </div>
);

AddressInline.propTypes = {
  city: PropTypes.string.isRequired,
  country: PropTypes.string,
  county: PropTypes.string,
  line1: PropTypes.string.isRequired,
  line2: PropTypes.string,
  line3: PropTypes.string,
  postcode: PropTypes.string.isRequired,
};
export default AddressInline;
