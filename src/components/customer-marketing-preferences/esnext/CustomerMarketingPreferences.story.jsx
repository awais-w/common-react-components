import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import CustomerMarketingPreferences from './CustomerMarketingPreferences';
import CustomerMarketingPreferencesWrapper from '../CustomerMarketingPreferencesWrapper';
import dummyMarketingPreferences from '../dummyMarketingPreferences';

storiesOf('Components|CustomerMarketingPreferences', module)
  .addParameters({
    options: { theme: {} },
  })
  .addDecorator(withKnobs)
  .add('Basic', () => (
    <CustomerMarketingPreferences
      email={text('email', dummyMarketingPreferences.email)}
      consents={object('consents', dummyMarketingPreferences.consents)}
      updateConsentData={action()}
    />
  ))
  .add('Demo', () => <CustomerMarketingPreferencesWrapper />);
