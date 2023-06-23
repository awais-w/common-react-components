import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import Notification from './Notification';

storiesOf('Components|Notification', module)
  .addParameters({
    options: { theme: {} },
  })
  .addDecorator(withKnobs)
  .add('Notification', () => (
    <React.Fragment>
      <div className='xs-row'>
        <Notification
          mode={select('Mode', ['info', 'warning', 'error'], 'info')}
          children={text('Message', 'This is a notification.')}
          iconAlignment={select('Icon Alignment', ['top', 'middle'])}
        />
      </div>
    </React.Fragment>
  ));
