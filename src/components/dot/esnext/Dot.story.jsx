import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text } from '@storybook/addon-knobs';
import { withReadme } from 'storybook-readme';
import README from '../README.md';

import Dot from './Dot';

storiesOf('Components|Dot', module)
  .addParameters({
    options: { theme: {} },
  })
  .addDecorator(withReadme(README))
  .addDecorator(withKnobs)
  .add('icon', () => (
    <Dot value={text('text', '1')} color={select('Color', ['red', 'yellow', 'blue', 'black', 'grey'], 'black')} />
  ));
