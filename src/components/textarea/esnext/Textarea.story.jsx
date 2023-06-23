import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Textarea from './Textarea';
import README from '../README.md';

const TextareaWrapper = (props) => {
  const {
    label = 'Default label',
    id = 'default',
    errorMessage = '',
    isDisabled = false,
    name = 'TextareaName',
    isMandatory = false,
    placeholder = 'Insert content',
  } = props;

  const [txt, setTxt] = useState('');

  const handleChange = (event) => {
    action()(event.target.value);
    setTxt(event.target.value);
  };

  return (
    <Textarea
      label={text('label', label)}
      id={text('id', id)}
      errorMessage={text('errorMessage', errorMessage)}
      value={txt || ''}
      resizeDirection={select('Resize direction', ['both', 'horizontal', 'vertical', 'none'], 'both')}
      handleChange={handleChange}
      isDisabled={boolean('Disabled', isDisabled)}
      name={text('name', name)}
      rows={text('Numeber of Rows', 2)}
      isMandatory={boolean('isMandatory', isMandatory)}
      placeholder={text('placeholder', placeholder)}
    />
  );
};

storiesOf('Components|Textarea', module)
  .addParameters({
    options: { theme: {} },
  })
  .addDecorator(withReadme(README))
  .addDecorator(withKnobs)
  .add('Default', () => <TextareaWrapper />);
