import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, select, radios, text } from '@storybook/addon-knobs';

import ReasonPickerContainer from './ReasonPickerContainer';
import README from '../README.md';

storiesOf('Components|ReasonPicker', module)
  .addParameters({
    options: { theme: {} },
  })
  .addDecorator(withReadme(README))
  .addDecorator(withKnobs)
  .add('Reason Picker', () => (
    <ReasonPickerContainer
      inputType='radio'
      inputType={radios('Input Type', { Radio: 'radio', Checkbox: 'checkbox' }, 'radio')}
      checkboxIconType={select('Checkbox Icon', ['tick', 'cross'], 'tick')}
      reasonType={radios('Reason Type', { List: 'list', Text: 'text' }, 'list')}
      reasonPlaceholderTxt={text('Reason Placeholder Text', 'Please state reason')}
    />
  ));
