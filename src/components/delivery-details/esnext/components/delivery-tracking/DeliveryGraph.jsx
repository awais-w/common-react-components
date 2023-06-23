import React from 'react';
import PropTypes from 'prop-types';
import IconLabelValue from '@cmc/icon-label-value/esnext';
import { isEmpty as _isEmpty } from 'lodash';
import moment from 'moment';

const DeliveryGraph = ({ arrivalTime }) => {
  if (_isEmpty(arrivalTime)) return null;

  const vanIcon = (
    <svg x='0' y='0'>
      <g transform='translate(30 0 0)' id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
        <g transform='translate(-1146.000000, -212.000000)' fill='#F39000'>
          <g transform='translate(958.000000, 212.000000)'>
            <g transform='translate(188.000000, 0.000000)'>
              <path
                d='M14.5454545,0 L14.5454545,3.5 L17.2727273,3.5 L20,7 L20,11.375 L18.1818182,11.375 C18.1818182,12.823125 16.9590909,14 15.4545455,14 C13.95,14 12.7272727,12.823125 12.7272727,11.375 L12.7272727,11.375 L7.27272727,11.375 C7.27272727,12.823125 6.05,14 4.54545455,14 C3.04090909,14 1.81818182,12.823125 1.81818182,11.375 L1.81818182,11.375 L0,11.375 L0,1.75 C0,0.783125 0.813636364,0 1.81818182,0 L1.81818182,0 L14.5454545,0 Z M4.5,10 C3.67,10 3,10.67 3,11.5 C3,12.33 3.67,13 4.5,13 C5.33,13 6,12.33 6,11.5 C6,10.67 5.33,10 4.5,10 Z M15.5,10 C14.67,10 14,10.67 14,11.5 C14,12.33 14.67,13 15.5,13 C16.33,13 17,12.33 17,11.5 C17,10.67 16.33,10 15.5,10 Z M7.25628738,1.5 C5.79309606,1.5 5,2.41546057 5,3.4525403 C5,5.70553521 8.43365866,5.23785426 8.43365866,6.76555673 C8.43365866,7.69152078 7.11337736,8.33831357 5.58364015,7.25562666 C5.44045741,7.15529086 5.37445698,7.09973301 5.27518361,7.09973301 C5.08836421,7.09973301 5.05481854,7.20062163 5.05481854,7.30095744 L5.05481854,7.8692506 C5.05481854,7.96930999 5.07745505,8.02597347 5.18736485,8.09258759 C7.03592231,8.97322086 9.66666667,8.46048555 9.66666667,6.21909974 C9.66666667,4.15572017 6.17791674,4.28894843 6.17791674,3.01692259 C6.17791674,2.50418728 6.66228352,2.15895471 7.2781057,2.15895471 C7.82847291,2.15895471 8.24683927,2.34857004 8.68702394,2.67251925 C8.80838837,2.76096954 8.88529796,2.81708021 8.98402587,2.81708021 C9.1053903,2.81708021 9.13839051,2.73858056 9.13839051,2.63796835 L9.13839051,1.99228118 C9.13839051,1.89083975 9.11657219,1.83472909 9.01702609,1.79050394 C8.64311456,1.6462194 7.98256483,1.5 7.25628738,1.5 Z M17.2396417,5 L15,5 L15,7 L19,7 L17.2396417,5 Z'
                id='Combined-Shape'
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );

  const getGraphInfo = (estimatedTime) => {
    const graphInfo = {
      digits: [],
      formattedMessage: '',
      slotNo: 0,
    };

    const mDate = moment(estimatedTime);
    const nextHour = moment(estimatedTime).add(1, 'h');

    const hour = mDate.format('h');
    const min = mDate.minute();

    graphInfo.digits = [mDate.format('ha'), `${hour}:20`, `${hour}:40`, nextHour.format('ha')];
    graphInfo.slotNo = min >= 40 ? 3 : min >= 20 ? 2 : 1;

    graphInfo.formattedMessage = `${mDate.format('MMM Do')}, ${graphInfo.digits[0]}-${graphInfo.digits[3]}`;

    if (graphInfo.slotNo === 1) graphInfo.formattedMessage += ', 1st';
    else if (graphInfo.slotNo === 2) graphInfo.formattedMessage += ', 2nd';
    else graphInfo.formattedMessage += ', 3rd';

    graphInfo.formattedMessage += ' part of the slot';

    return graphInfo;
  };
  const graphInfo = getGraphInfo(arrivalTime);

  return (
    <div className='cmc-delivery-tracking__graph'>
      <span>
        <IconLabelValue
          icon={''}
          label={'Estimated Arrival:'}
          value={graphInfo.formattedMessage}
          labelColor={'amber'}
        />
      </span>
      <div className='slot-graph'>
        <span className='slot-range'>{graphInfo.digits[0]}</span>
        <span className={`slot-line first-segment ${graphInfo.slotNo === 1 && 'slot-active'}`}>{vanIcon}</span>
        <span className='slot-part'>{graphInfo.digits[1]}</span>
        <span className={`slot-line second-segment ${graphInfo.slotNo === 2 && 'slot-active'}`}>{vanIcon}</span>
        <span className='slot-part'>{graphInfo.digits[2]}</span>
        <span className={`slot-line third-segment ${graphInfo.slotNo === 3 && 'slot-active'}`}>{vanIcon}</span>
        <span className='slot-range'>{graphInfo.digits[3]}</span>
      </div>
    </div>
  );
};

DeliveryGraph.propTypes = {
  arrivalTime: PropTypes.string.isRequired,
};

export default DeliveryGraph;
