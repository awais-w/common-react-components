import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, boolean, text, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Textfield from './Textfield';
import README from '../README.md';

const TextfieldWrapper = (props) => {
  const {
    label = 'Default label',
    id = 'default',
    errorMessage = '',
    isDisabled = false,
    name = 'TextfieldName',
    isMandatory = false,
    isShort = false,
    placeholder = 'Insert content',
    rightIcon,
    applied = false,
  } = props;

  const [txt, setTxt] = useState('');

  const handleChange = (event) => {
    action()(event.target.value);
    setTxt(event.target.value);
  };

  return (
    <Textfield
      label={text('label', label)}
      id={text('id', id)}
      errorMessage={text('errorMessage', errorMessage)}
      value={txt || ''}
      handleChange={handleChange}
      isDisabled={boolean('Disabled', isDisabled)}
      name={text('name', name)}
      isMandatory={boolean('isMandatory', isMandatory)}
      isShort={boolean('isShort', isShort)}
      placeholder={text('placeholder', placeholder)}
      rightIcon={rightIcon && object('Right Icon', rightIcon)}
      applied={boolean('applied', applied)}
    />
  );
};

const rightIcon = {
  isCustom: true,
  icon: 'icon-address-lookup',
  color: 'blue',
  onClick: action('icon clicked'),
  disabled: false,
};

storiesOf('Components|Textfield', module)
  .addParameters({
    options: { theme: {} },
  })
  .addDecorator(withReadme(README))
  .addDecorator(withKnobs)
  .add('Default', () => <TextfieldWrapper />)
  .add('with icon on the right', () => <TextfieldWrapper rightIcon={rightIcon} />);
