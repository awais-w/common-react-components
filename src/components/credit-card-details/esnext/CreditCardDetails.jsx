import React from 'react';
import bem from '@argos/utils/esnext/bem';
import moment from 'moment';
import propTypes from './CreditCardDetails.propTypes';

import './CreditCardDetails.scss';

const cn = bem({ prefix: 'cmc-', block: 'credit-card-details' });

function displayDate(startDate, expiryDate) {
  if (startDate) {
    if (expiryDate) {
      return `${startDate} - ${expiryDate}`;
    }
    return `${startDate} - No expiration`;
  }
  if (expiryDate) {
    return `Expiration date - ${expiryDate}`;
  }
  return `No expiration provided`;
}

const CreditCardDetails = ({ type, number, startDate, expiryDate, name }) => {
  const formattedStartDate = startDate && moment(startDate).format('MM/YY');
  const formattedExpiryDate = expiryDate && moment(expiryDate).format('MM/YY');
  const formattedDate = displayDate(formattedStartDate, formattedExpiryDate);

  return (
    <div className={cn()}>
      <i className='cmc-icon' role='icon'>
        credit_card
      </i>
      {type && <span>{type}</span>}
      <span>{number}</span>
      {formattedDate && <span>{formattedDate}</span>}
      {name && <span>{name}</span>}
    </div>
  );
};

CreditCardDetails.propTypes = propTypes;

export default CreditCardDetails;
