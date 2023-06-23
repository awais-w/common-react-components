import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { bem } from '@argos/utils';
import ContactDetails from '@cmc/contact-details/esnext';
import Address from '@cmc/address/esnext';
import isEmpty from '@cmc/utils/esnext/isEmpty';
import DeliveryTracking from './components/delivery-tracking';
import propTypes from './DeliveryDetails.propTypes';
import './DeliveryDetails.scss';

const cn = bem({ prefix: 'cmc-', block: 'delivery-details' });

const DeliveryDetails = ({ contact = {}, address = {}, deliveryTracking = {}, isLoading, isClickAndCollect }) => {
  const { person, business, telephones, emails } = contact;
  const { actualArrival, plannedArrival, dropNumber, bookedSlot, price, origin, instructions } = deliveryTracking;

  return (
    <div className={cn()}>
      {!isLoading ? (
        <React.Fragment>
          {!isEmpty(contact) && (
            <div className={cn('contact-details')}>
              <ContactDetails person={person} business={business} telephones={telephones} emails={emails} groupFields />
              {Object.entries(address).length && <Address address={address} mode={'INLINE'} />}
            </div>
          )}
          <div className={cn('delivery-tracking')}>
            <DeliveryTracking
              actualArrival={actualArrival}
              plannedArrival={plannedArrival}
              dropNumber={dropNumber}
              bookedSlot={bookedSlot}
              price={price}
              origin={origin}
              instructions={instructions || 'Not provided'}
              isClickAndCollect={isClickAndCollect}
            />
          </div>
        </React.Fragment>
      ) : (
        <div className={cn('loading')}>
          <Skeleton height={25} count={2} />
        </div>
      )}
    </div>
  );
};

DeliveryDetails.propTypes = propTypes;

export default DeliveryDetails;
