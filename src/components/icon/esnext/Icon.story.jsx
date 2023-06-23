import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Icon from './Icon';

storiesOf('Components|Icon', module)
  .addParameters({
    options: { theme: {} },
  })
  .addDecorator(withKnobs)
  .add('icon', () => (
    <Icon
      icon={select('Icon', ['thumb_up', 'thumb_down'], 'thumb_up')}
      disabled={boolean('Disabled', false)}
      id={text('Id', 'myId')}
      onClick={action("You've clicked something!")}
      color={select('Color', ['white', 'red', 'yellow', 'green', 'blue', 'black', 'grey'], 'black')}
    />
  ))
  .add('custom icon', () => (
    <Icon
      icon={select(
        'Icon',
        [
          'icon-collected',
          'icon-created',
          'icon-delivered',
          'icon-in-progress',
          'icon-in-transit',
          'icon-ready-to-collect',
          'icon-refunded',
          'icon-return-failed',
          'icon-return-in-progress',
          'icon-returned',
          'icon-rebook-delivery',
          'icon-price-history',
          'icon-pointer',
          'icon-returns',
          'icon-address-lookup',
          'icon-currency',
          'icon-to-left',
          'icon-to-right',
          'icon-leader',
          'icon-url',
          'icon-change-adress',
          'icon-contact-history',
          'icon-order-history',
          'icon-failed-payment',
          'icon-sticky-note',
        ],
        'icon-rebook-delivery',
      )}
      isCustom
      disabled={boolean('Disabled', false)}
      id={text('Id', 'myId')}
      onClick={action("You've clicked something!")}
      color={select('Color', ['white', 'red', 'yellow', 'green', 'blue', 'black', 'grey'], 'black')}
    />
  ));
