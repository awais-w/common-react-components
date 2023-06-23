import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import InputSelection from './InputSelection';
import README from '../README.md';

const CheckboxInputSelectionWrapper = () => {
  const [selectedOptions, setOption] = useState({ Value1: false, Value2: false });

  const handleClick = (event) => {
    action("You've clicked a checkbox!");
    setOption({ ...selectedOptions, [event.target.value]: event.target.checked });
  };

  return (
    <ul>
      <li style={{ marginBottom: '10px' }}>
        <InputSelection
          id={'checkbox-component-id-1'}
          name='demo-checkbox-1'
          value='Value1'
          inputType='checkbox'
          onChange={handleClick}
          checked={selectedOptions.Value1}
          children='Item number one'
          checkboxIconType={select('icon', ['tick', 'cross', 'line'], 'tick')}
        />
      </li>
      <li>
        <InputSelection
          id={'checkbox-component-id-2'}
          name='demo-checkbox-2'
          value='Value2'
          inputType='checkbox'
          onChange={handleClick}
          checked={selectedOptions.Value2}
          children='Item number two'
          checkboxIconType={select('icon', ['tick', 'cross', 'line'], 'tick')}
        />
      </li>
    </ul>
  );
};

const RadioInputSelectionWrapper = () => {
  const [selectedOption, setOption] = useState(false);
  const handleClick = (event) => {
    action("You've clicked a radio button!");
    setOption(event.target.value);
  };
  return (
    <ul>
      <li style={{ marginBottom: '10px' }}>
        <InputSelection
          id={'radio-component-id-1'}
          name='demo-radio'
          onChange={handleClick}
          checked={selectedOption === 'Value1'}
          value='Value1'
          children='Item number one'
          inputType='radio'
        />
      </li>
      <li>
        <InputSelection
          id={'radio-component-id-2'}
          name='demo-radio'
          onChange={handleClick}
          checked={selectedOption === 'Value2'}
          value='Value2'
          children='Item number two'
          inputType='radio'
        />
      </li>
    </ul>
  );
};

storiesOf('Components|InputSelection', module)
  .addParameters({
    options: { theme: {} },
  })
  .addDecorator(withReadme(README))
  .addDecorator(withKnobs)
  .add('Checkbox InputSelection', () => <CheckboxInputSelectionWrapper />)
  .add('Radio InputSelection', () => <RadioInputSelectionWrapper />);
