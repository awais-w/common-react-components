import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object, boolean } from '@storybook/addon-knobs';

import DeliveryDetails from './DeliveryDetails';

storiesOf('Components|DeliveryDetails', module)
  .addParameters({
    options: { theme: {} },
  })
  .addDecorator(
    withKnobs({
      escapeHTML: false,
    }),
  )
  .add('with single value', () => (
    <DeliveryDetails
      contact={object('Contact Details', {
        business: "Sainsbury's Argos",
        person: { title: 'Mr', name: 'John', surname: 'Lopez', middleName: 'Benjamin' },
        emails: [
          { type: 'Work', address: 'peter.johnson@argos.co.uk' },
          { type: 'Personal', address: 'peter_me@anyprovider.com' },
        ],
        telephones: [
          { type: 'Work', number: '04587763587' },
          { type: 'Mobile', number: '07887456587' },
        ],
      })}
      address={object('Address', {
        line1: "Sainsbury's Argos",
        line2: '489/499 Avebury Boulevard',
        line3: 'Saxon Gate West',
        city: 'Milton Keynes',
        postcode: ' MK9 2NW',
        country: 'United Kingdom',
        county: 'Buckinghamshire',
      })}
      deliveryTracking={object('Delivery Tracking', {
        bookedSlot: 'Feb 14th, 7:30am - 8:30am',
        price: '£6.98',
        actualArrival: '2019-02-14T07:46:00Z',
        plannedArrival: '2019-02-14T07:45:00Z',
        dropNumber: 26,
        origin: {
          id: '0932',
          name: 'Milton Keynes',
        },
        instructions: 'Please do not leave it in the bin',
      })}
      isClickAndCollect={boolean('Click and Collect', false)}
    />
  ))
  .add('is loading', () => <DeliveryDetails isLoading />);
