import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Toggle from './Toggle';

storiesOf('Components|Toggle', module)
  .addParameters({
    options: { theme: {} },
  })
  .addDecorator(withKnobs)
  .add('No default', () => <Toggle onSelect={action()} />)
  .add('Default yes', () => <Toggle selected={true} text={text('Text', 'Yes selected by default')} />)
  .add('Default no', () => <Toggle selected={false} text={text('Text', 'No selected by default')} />)
  .add('alt labels', () => <Toggle yes={text('yes', 'OK')} no={text('no', 'NAH')} />)
  .add('disabled', () => <Toggle disabled='true' />)
  .add('multiple', () => (
    <React.Fragment>
      <Toggle />
      <Toggle />
      <Toggle />
    </React.Fragment>
  ));
