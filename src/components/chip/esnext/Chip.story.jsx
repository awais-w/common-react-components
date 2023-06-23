import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, text, select, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Chip from './Chip';
import README from '../README.md';

storiesOf('Components|Chip', module)
  .addParameters({
    options: { theme: {} },
  })
  .addDecorator(withReadme(README))
  .addDecorator(withKnobs)
  .add('with material icon and label', () => (
    <Chip
      icon={object('icon', { name: 'person' })}
      label={text('label', 'Icon Label')}
      onClick={action("You've clicked something!")}
      color={select('color', ['red', 'amber', 'blue', 'green', 'grey', 'black'], 'blue')}
    />
  ))
  .add('with custom icon and label', () => (
    <Chip
      icon={object('icon', { name: 'icon-refund-delivery-charge', isCustom: true })}
      label={text('label', 'Refund Delv.')}
      onClick={action("You've clicked something!")}
      color={select('color', ['red', 'amber', 'blue', 'green', 'grey', 'black'], 'blue')}
    />
  ));
