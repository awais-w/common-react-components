import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, text } from '@storybook/addon-knobs';
import CreditCardDetails from './CreditCardDetails';
import README from '../README.md';

storiesOf('Components|CreditCardDetails', module)
  .addParameters({
    options: { theme: {} },
  })
  .addDecorator(withReadme(README))
  .addDecorator(withKnobs)
  .add('default', () => (
    <CreditCardDetails
      type={text('Card Type', 'Argos Card')}
      number={text('Card Number', 'XXXX-XXXX-XXXX-1234')}
      startDate={text('Start Date', '2019-01-14T05:32:45Z')}
      expiryDate={text('Expiry Date', '2099-05-14T05:32:45Z')}
      name={text('Name', 'Mr Test Person')}
    />
  ));
