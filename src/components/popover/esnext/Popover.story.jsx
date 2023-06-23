import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, select } from '@storybook/addon-knobs';
import { withReadme } from 'storybook-readme';
import README from '../README.md';
import Popover from './Popover';

storiesOf('Components|Popover', module)
  .addParameters({
    options: { theme: {} },
  })
  .addDecorator(withReadme(README))
  .addDecorator(withKnobs())
  .add('Popover', () => (
    <div
      style={{
        border: '2px solid black',
        height: `${number('parentHeight', 100)}px`,
        width: `${number('parentWidth', 100)}px`,
        margin: 'auto',
      }}>
      <div>Hover me to see a popover</div>
      <Popover mode={select('mode', ['auto', 'right', 'bottom', 'top', 'left'], 'auto')}>
        <h4 style={{ color: 'blue', marginBottom: '5px' }}>Popovers are like tooltips</h4>
        <div>But you can do a lot more with them as they allow markup👌</div>
      </Popover>
    </div>
  ));
