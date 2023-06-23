import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object, select } from '@storybook/addon-knobs';

import Address from './Address';

storiesOf('Components|Address', module)
  .addParameters({
    options: { theme: {} },
  })
  .addDecorator(
    withKnobs({
      escapeHTML: false,
    }),
  )
  .add('Default', () => (
    <Address
      address={object('Address', {
        line1: "Sainsbury's Argos",
        line2: '489/499 Avebury Boulevard',
        line3: 'Saxon Gate West',
        city: 'Milton Keynes',
        postcode: ' MK9 2NW',
        country: 'United Kingdom',
        county: 'Buckinghamshire',
      })}
      mode={select('View mode', ['DETAILED', 'COMPACT', 'INLINE'], 'DETAILED')}
    />
  ));
