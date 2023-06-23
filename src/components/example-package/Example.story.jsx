import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action, withActions } from '@storybook/addon-actions';

import Example from './Example';
import README from './README.md';

storiesOf('CMC STORYBOOK|Example new package boilerplate', module)
  .addParameters({
    options: { theme: {} },
  })
  .addDecorator(withReadme(README))
  .addDecorator(withKnobs)
  .addDecorator(withActions('mouseout')) // This will log the mouseout event on the whole component
  .add('with text', () => (
    <Example
      text={text('Text', 'Click me to log the action on the `Action Logger` add-on!')}
      isExtraTextDisplayed={boolean('Display extra text', false)}
      onClick={action("You've clicked something!")}
    />
  ));
