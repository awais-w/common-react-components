import React from 'react';
import PropTypes from 'prop-types';
import IconLabelValue from '@cmc/icon-label-value/esnext';
import bem from '@argos/utils/esnext/bem';

const cn = bem({ prefix: 'cmc-', block: 'detailed-address' });

const AddressDetailed = ({ city, country, county, line1, line2, line3, postcode }) => (
  <div className={cn()}>
    <div className={cn('line1')}>
      <IconLabelValue label={'Line 1:'} value={line1} />
    </div>
    {line2 && (
      <div className={cn('line2')}>
        <IconLabelValue label={'Line 2:'} value={line2} />
      </div>
    )}
    {line3 && (
      <div className={cn('line3')}>
        <IconLabelValue label={'Line 3:'} value={line3} />
      </div>
    )}
    <div className={cn('city')}>
      <IconLabelValue label={'City:'} value={city} />
    </div>
    {county && (
      <div className={cn('county')}>
        <IconLabelValue label={'County:'} value={county} />
      </div>
    )}
    <div className={cn('postcode')}>
      <IconLabelValue label={'Postcode:'} value={postcode} />
    </div>
    {country && (
      <div className={cn('country')}>
        <IconLabelValue label={'Country:'} value={country} />
      </div>
    )}
  </div>
);

AddressDetailed.propTypes = {
  city: PropTypes.string.isRequired,
  country: PropTypes.string,
  county: PropTypes.string,
  line1: PropTypes.string.isRequired,
  line2: PropTypes.string,
  line3: PropTypes.string,
  postcode: PropTypes.string.isRequired,
};
export default AddressDetailed;
