import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs';

import ContactDetails from './ContactDetails';
import README from '../README.md';

storiesOf('Components|ContactDetails', module)
  .addParameters({
    options: { theme: {} },
  })
  .addDecorator(withReadme(README))
  .addDecorator(
    withKnobs({
      escapeHTML: false,
    }),
  )
  .add('Default', () => (
    <ContactDetails
      business={text('Business', "Sainsbury's Argos")}
      person={object('Person', { title: 'Mr', name: 'Peter', surname: 'Jhonson', middleName: 'Jose' })}
      emails={object('emails', [
        { type: 'work', address: 'peter.johnson@argos.co.uk' },
        { type: 'personal', address: 'peterito@poamsd.com' },
      ])}
      telephones={object('telephones', [
        { type: 'work', number: '04587763587' },
        { type: 'mobile', number: '07887456587' },
      ])}
      groupFields={boolean('groupFields', false)}
    />
  ));
