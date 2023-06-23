import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, boolean, text, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Select from './Select';
import README from '../README.md';

const SelectWrapper = (props) => {
  const {
    label = 'Default label',
    id = 'default',
    errorMessage = '',
    isDisabled = false,
    options = ['First', 'Second', 'Third'],
    optionsWithValues = undefined,
    name = 'SelectName',
    isMandatory = false,
    isShort = false,
    placeholder = '',
    firstOptionEmpty = false,
    applied = false,
  } = props;

  const [selectedOptions, setOption] = useState('');

  const handleChange = (event) => {
    action()(event.target.value);
    setOption(event.target.value);
  };

  return (
    <Select
      label={text('label', label)}
      id={text('id', id)}
      errorMessage={text('errorMessage', errorMessage)}
      value={selectedOptions || ''}
      handleChange={handleChange}
      isDisabled={boolean('Disabled', isDisabled)}
      options={object('options', options)}
      optionsWithValues={object('optionsWithValues', optionsWithValues)}
      name={text('name', name)}
      isMandatory={boolean('isMandatory', isMandatory)}
      isShort={boolean('Short', isShort)}
      placeholder={text('placeholder', placeholder)}
      firstOptionEmpty={boolean('firstOptionEmpty', firstOptionEmpty)}
      applied={boolean('applied', applied)}
    />
  );
};

const optionsWithValues = [
  { option: 'First', value: 1 },
  { option: 'Second', value: 2 },
  { option: 'Third', value: 3 },
];

storiesOf('Components|Select', module)
  .addParameters({
    options: { theme: {} },
  })
  .addDecorator(withReadme(README))
  .addDecorator(withKnobs)
  .add('Default', () => <SelectWrapper />)
  .add('First option empty', () => <SelectWrapper firstOptionEmpty={true} placeholder={'Choose one'} />)
  .add('optionsWithValues', () => <SelectWrapper options={[]} optionsWithValues={optionsWithValues} />);
