import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import IconLabelValue from '@cmc/icon-label-value/esnext';
import './DeliveryTracking.scss';
import { bem } from '@argos/utils';
import DeliveryGraph from './DeliveryGraph';

const cn = bem({ prefix: 'cmc-', block: 'delivery-tracking' });

const DeliveryTracking = ({
  actualArrival,
  plannedArrival,
  instructions,
  dropNumber,
  bookedSlot,
  price,
  origin,
  isClickAndCollect,
}) => (
  <div className={cn()}>
    <div className={cn('', 'grouped')}>
      {bookedSlot && (
        <div className={cn('booked-slot')}>
          <IconLabelValue icon={''} label={'Booked slot:'} value={bookedSlot} />
        </div>
      )}
      {price && (
        <div className={cn('price')}>
          <IconLabelValue icon={''} label={'Price:'} value={price} />
        </div>
      )}
    </div>

    {(actualArrival || plannedArrival) && (
      <div className={cn('', 'grouped')}>
        {plannedArrival && (
          <div className={cn('planned-arrival')}>
            <IconLabelValue icon={''} label={'Planned:'} value={moment(plannedArrival).format('h:mma')} />
          </div>
        )}
        {actualArrival && (
          <div className={cn('actual-arrival')}>
            <IconLabelValue
              icon={''}
              label={'Arriving'}
              value={moment(actualArrival).format('h:mma')}
              isCondensed={true}
            />
          </div>
        )}
        {dropNumber && (
          <div className={cn('drop-number')}>
            <IconLabelValue icon={''} label={'Drop Number:'} value={dropNumber.toString()} />
          </div>
        )}
        {origin && (
          <div className={cn('origin')}>
            <IconLabelValue
              icon={''}
              label={'From:'}
              value={origin.name ? `${origin.name} (${origin.id})` : `${origin.id}`}
            />
          </div>
        )}
      </div>
    )}
    {instructions && (
      <div className={cn('instructions')}>
        <IconLabelValue icon={''} label={'Instructions:'} value={instructions} />
      </div>
    )}
    {!isClickAndCollect && <DeliveryGraph arrivalTime={plannedArrival} />}
  </div>
);

DeliveryTracking.propTypes = {
  bookedSlot: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  actualArrival: PropTypes.string,
  plannedArrival: PropTypes.string,
  dropNumber: PropTypes.number,
  origin: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.name.isRequired,
  }),
  instructions: PropTypes.string,
};
export default DeliveryTracking;
