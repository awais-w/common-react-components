import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Accordion from './accordion';

const ACCORDION_DATA = [
  {
    id: 716105,
    header: {
      icon: 'forum',
      title1: '13 Jan 2020, 00:32:21',
      title2: 'Order Number: 6000002600',
      actions: [
        { icon: 'icon-url', isCustom: true, color: 'blue', tooltip: 'copy url' },
        { icon: 'zoom_out_map', color: 'blue', tooltip: 'expand transcript' },
      ],
    },
  },
  {
    id: 716106,
    header: {
      icon: 'forum',
      title1: '16 Jan 2020, 12:48:40',
      title2: 'Order Number: 19872364443',
      title3: 'Customer ID: 1876523',
      actions: [{ icon: 'link', color: 'blue', tooltip: 'copy url' }],
    },
    body: null,
    error: 'Sorry, could not load content!',
  },
  {
    id: 716107,
    header: {
      icon: 'forum',
      title1: '3 Feb 2020, 04:20:42',
      title2: 'Order Number: 1897364917',
      title3: 'Customer ID: 918726',
      actions: [{ icon: 'zoom_out_map', color: 'blue', tooltip: 'expand transcript' }],
    },
    body: 'This is card 3 content.',
  },
  {
    id: 716108,
    header: {
      icon: 'mail',
      title1: '25 Jan 2020, 08:28:08',
      title2: 'Order Number: 18927364647',
      title3: 'Customer ID: 129889',
      actions: [
        { icon: 'link', color: 'blue', tooltip: 'copy url' },
        { icon: 'zoom_out_map', color: 'blue', tooltip: 'expand transcript' },
      ],
    },
    body: 'This is card 4 content.',
  },
  {
    id: 716109,
    header: {
      icon: 'mail',
      title1: '19 Jan 2020, 20:13:38',
      title2: 'Order Number: 189236749817',
    },
    body: (
      <React.Fragment>
        <h1>Hello,</h1> <div>This is card 5 content.</div>
      </React.Fragment>
    ),
  },
];

storiesOf('Components|Accordion', module)
  .addParameters({
    options: { theme: {} },
  })
  .addDecorator(withKnobs)
  .add('Accordion', () => (
    <Accordion
      allowMultipleOpen={boolean('allowMultipleOpen', false)}
      moreAvailable={boolean('More restults', true)}
      accordionData={object('Data', ACCORDION_DATA)}
      onCardClick={action()}
      requestMore={action()}
    />
  ));
