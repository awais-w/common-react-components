import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, text, object, boolean } from '@storybook/addon-knobs';

import Card from '@cmc/card/esnext/card';
import Pane from './pane';
import README from '../README.md';

storiesOf('Components|Pane', module)
  .addParameters({
    options: { theme: {} },
  })
  .addDecorator(withReadme(README))
  .addDecorator(withKnobs)
  .add('Delivery Details', () => (
    <Pane
      key={'delivery'}
      title1={text('Title 1', 'Delivery Details')}
      title2={text('Title 2', 'Title 2')}
      title3={text('Title 3', 'Title 3')}
      icon={object('Icon', { name: 'local_shipping', isCustom: false })}
    />
  ))
  .add('Payment', () => (
    <Pane
      key={'payment'}
      title1={text('Title 1', 'Payment')}
      title2={text('Title 2', 'Total: £60.40')}
      icon={object('Icon', { name: 'credit_card', isCustom: false })}
      titleRight={text('Title Right', 'Status')}
    />
  ))
  .add('Order Details', () => (
    <Pane
      key={'order'}
      title1={text('Title 1', 'Order Details')}
      title2={text('Title 2', 'Order ID: 1234567')}
      title3={text('Title 3', '20:11 13/02/19: Picked')}
      icon={object('Icon', { name: 'icon-rebook-delivery', isCustom: true })}
    />
  ))
  .add('Loading state', () => (
    <Pane
      key={'order'}
      title1={text('Title 1', 'Order Details')}
      icon={object('Icon', { name: 'icon-rebook-delivery', isCustom: true })}
      isLoading={boolean('Loading', true)}>
      <h3>Content Loaded</h3>
    </Pane>
  ))
  .add('Collapsed state', () => (
    <Pane
      key={'order'}
      title1={text('Title 1', 'Order Details')}
      title2={text('Title 2', 'Order ID: 1234567')}
      icon={object('Icon', { name: 'icon-rebook-delivery', isCustom: true })}
      collapsed={boolean('Collapsed', true)}>
      <Card key={'contact'} title1='Card Title 1' title2='Card title 2' title3='Card title 3' />
    </Pane>
  ))
  .add('With embedded card', () => (
    <Pane
      key={'order'}
      title1={text('Title 1', 'Order Details')}
      title2={text('Title 2', 'Order ID: 1234567')}
      title3={text('Title 3', '20:11 13/02/19: Picked')}
      icon={object('Icon', { name: 'receipt', isCustom: false })}>
      <Card key={'contact'} title1='Card Title 1' title2='Card title 2' title3='Card title 3' />
    </Pane>
  ));
