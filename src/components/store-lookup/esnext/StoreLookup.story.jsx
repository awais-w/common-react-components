import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { withReadme } from 'storybook-readme';
import README from '../README.md';
import StoresTable from './components/stores-table/StoresTable';
import StoreLookup from './StoreLookup';

const stores = [
  {
    id: 7622,
    name: 'Milton Keynes Collect in Sainsburys',
    distance: '0.22 miles',
    address: '799 Witan Gate, Milton Keynes, MK9 2FW',
    phoneNumber: '0345 1657781',
    openingHours: [
      { day: 'Monday', from: '09:00', to: '19:00' },
      { day: 'Tuesday', from: '07:00', to: '23:00' },
      { day: 'Wednesday', from: '07:00', to: '23:00' },
      { day: 'Thursday', from: '07:00', to: '23:00' },
      { day: 'Friday', from: '07:00', to: '23:00' },
      { day: 'Saturday', from: '07:00', to: '22:00' },
      { day: 'Sunday', from: '11:00', to: '17:00' },
    ],
  },
  {
    id: 562,
    name: 'Milton Keynes Grafton Gate',
    distance: '0.96 miles',
    address: '700 Grafton Gate, Milton Keynes, MK19 1DL',
    phoneNumber: '0345 1657415',
    openingHours: [
      { day: 'Monday', from: '09:00', to: '19:00' },
      { day: 'Tuesday', from: '07:00', to: '23:00' },
      { day: 'Wednesday', from: '07:00', to: '23:00' },
      { day: 'Thursday', from: '07:00', to: '23:00' },
      { day: 'Friday', from: '07:00', to: '23:00' },
      { day: 'Saturday', from: '07:00', to: '22:00' },
      { day: 'Sunday', from: '11:00', to: '17:00' },
    ],
  },
  {
    id: 781,
    name: 'Bletchley Argos and EE',
    distance: '1.36 miles',
    address: 'Unit 2B Beacon Retail Park Watling Stree Bletchley, Milton Keynes, MK9 2FW',
    phoneNumber: '0345 1657415',
    openingHours: [
      { day: 'Monday', from: '09:00', to: '19:00' },
      { day: 'Tuesday', from: '07:00', to: '23:00' },
      { day: 'Wednesday', from: '07:00', to: '23:00' },
      { day: 'Thursday', from: '07:00', to: '23:00' },
      { day: 'Friday', from: '07:00', to: '23:00' },
      { day: 'Saturday', from: '07:00', to: '22:00' },
      { day: 'Sunday', from: '11:00', to: '17:00' },
    ],
  },
  {
    id: 781,
    name: 'Shenley Church End Collect in Sainsburys',
    distance: '2.01 miles',
    address: '2 Engaine Drive, Milton Keynes, MK5 6JU',
    openingHours: [
      { day: 'Monday', from: '09:00', to: '19:00' },
      { day: 'Tuesday', from: '07:00', to: '23:00' },
      { day: 'Wednesday', from: '07:00', to: '23:00' },
      { day: 'Thursday', from: '07:00', to: '23:00' },
      { day: 'Friday', from: '07:00', to: '23:00' },
      { day: 'Saturday', from: '07:00', to: '22:00' },
      { day: 'Sunday', from: '11:00', to: '17:00' },
    ],
  },
  {
    id: 2224,
    name: 'Bletchley Collect in Sainsburys',
    distance: '3.08 miles',
    address: '2 Engaine Drive, Milton Keynes, MK5 6JU',
    phoneNumber: '0346 266 1332',
    openingHours: [
      { day: 'Monday', from: '09:00', to: '19:00' },
      { day: 'Tuesday', from: '07:00', to: '23:00' },
      { day: 'Wednesday', from: '07:00', to: '23:00' },
      { day: 'Thursday', from: '07:00', to: '23:00' },
      { day: 'Friday', from: '07:00', to: '23:00' },
      { day: 'Saturday', from: '07:00', to: '22:00' },
      { day: 'Sunday', from: '11:00', to: '17:00' },
    ],
  },
];

storiesOf('Components|StoreLookup', module)
  .addParameters({
    options: { theme: {} },
  })
  .addDecorator(withReadme(README))
  .addDecorator(withKnobs())
  .add('Table', () => <StoresTable stores={stores} />)
  .add('Retry Notification', () => (
    <StoreLookup postcode='MK15 9HU' errorMessage={text('errorMessage', 'OR click next below to continue')} />
  ));
