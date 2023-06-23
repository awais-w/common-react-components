import React from 'react';
import PropTypes from 'prop-types';
import IconLabelValue from '@cmc/icon-label-value/esnext';
import bem from '@argos/utils/esnext/bem';
import { formatAddress } from '@cmc/utils/esnext';

const cn = bem({ prefix: 'cmc-', block: 'compact-address' });

const AddressCompact = ({ city, country, county, line1, line2, line3, postcode }) => (
  <div className={cn()}>
    {(line1 || line2 || line3) && (
      <div className={cn('line1')}>
        <IconLabelValue icon={'business'} value={formatAddress({ line1, line2, line3 })} />
      </div>
    )}
    {(postcode || city || county) && (
      <div className={cn('line2')}>
        <IconLabelValue value={formatAddress({ postcode, city, county })} />
      </div>
    )}
    {country && (
      <div className={cn('country')}>
        <IconLabelValue value={country} />
      </div>
    )}
  </div>
);

AddressCompact.propTypes = {
  line1: PropTypes.string.isRequired,
  line2: PropTypes.string,
  line3: PropTypes.string,
  city: PropTypes.string.isRequired,
  country: PropTypes.string,
  postcode: PropTypes.string.isRequired,
  county: PropTypes.string,
};
export default AddressCompact;
