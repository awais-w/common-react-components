import React, { useState } from 'react';
import bem from '@argos/utils/esnext/bem';
import Icon from '@cmc/icon/esnext/Icon';
import './StoreDetails.scss';
import moment from 'moment';
import propTypes from './StoreDetails.propTypes';

const cn = bem({ prefix: 'cmc-', block: 'store-details' });

const StoreDetails = (props) => {
  const [showOpeningHours, setShowOpeningHours] = useState(false);
  const { id, name, distance, address, phoneNumber, openingHours } = props;

  const days = {};
  openingHours.forEach((x) => {
    days[x.day] = { from: x.from, to: x.to };
  });

  let dayOfWeek = moment().day() - 1; // Moment week starts on Sunday but openingHours starts on Monday
  if (dayOfWeek === -1) dayOfWeek = 6;
  const today = openingHours[dayOfWeek];

  const makeDay = (dayName, day) => (
    <React.Fragment>
      <td>{dayName}</td>
      <td>
        {day.from} - {day.to}
      </td>
    </React.Fragment>
  );

  return (
    <div className={cn()}>
      <span className={cn('line')}>
        <span className={cn('store-name')}>{name}</span>
        <div className={cn('store-id')}>Store: {id}</div>
        <div className={cn('distance')}>{distance}</div>
      </span>
      <span className={cn('line')}>
        <div className={cn('address')}>{address}</div>
        {phoneNumber && (
          <div className={cn('phone')}>
            <Icon icon={'phone'} />
            <span className={cn('phone-number')}>{phoneNumber}</span>
          </div>
        )}
      </span>
      {showOpeningHours ? (
        <table className={cn('opening-times-table')}>
          <tr>
            {makeDay('Mon', days.Monday)}
            {makeDay('Fri', days.Friday)}
          </tr>
          <tr>
            {makeDay('Tue', days.Tuesday)}
            {makeDay('Sat', days.Saturday)}
          </tr>
          <tr>
            {makeDay('Wed', days.Wednesday)}
            {makeDay('Sun', days.Sunday)}
          </tr>
          <tr>
            {makeDay('Thu', days.Thursday)}
            <td colSpan={2} className={cn('toggle-opening-times')} onClick={() => setShowOpeningHours(false)}>
              Show Less
            </td>
          </tr>
        </table>
      ) : (
        <span className={cn('line')}>
          <div className={cn('timings-today')}>Timings Today</div>
          <div className={cn('open-hours')}>
            {today.from} - {today.to}
          </div>
          <div className={cn('toggle-opening-times')} onClick={() => setShowOpeningHours(true)}>
            Show Full
          </div>
        </span>
      )}
    </div>
  );
};

StoreDetails.propTypes = propTypes;
export default StoreDetails;
