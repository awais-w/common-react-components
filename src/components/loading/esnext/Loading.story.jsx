import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select, number, text } from '@storybook/addon-knobs';
import { withReadme } from 'storybook-readme';

import Loading from './Loading';
import README from '../README.md';

storiesOf('Components|Loading', module)
  .addParameters({
    options: { theme: {} },
  })
  .addDecorator(withReadme(README))
  .addDecorator(withKnobs)
  .add('loading', () => (
    <Loading
      fullScreen={boolean('FullScreen', false)}
      relativePosition={boolean('Relative Position', 100)}
      size={select('Size', ['sm', 'md', 'lg'], 'lg')}
      text={text('Loading Text', 'Loading...')}
      height={number('Container Height', 200)}
    />
  ));
