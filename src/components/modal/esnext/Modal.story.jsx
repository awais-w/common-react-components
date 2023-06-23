import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Modal from './Modal';
import README from '../README.md';

storiesOf('Components|Modal', module)
  .addParameters({
    options: { theme: {} },
  })
  .addDecorator(withReadme(README))
  .addDecorator(withKnobs)
  .add('with one button', () => (
    <Modal
      title={text('title', 'modal')}
      onClose={action('modal close called!')}
      isLoading={boolean('isLoading', false)}
      primaryButton={{
        handleClick: action('primary button clicked'),
        text: text('primary button text', 'proceed'),
        isDisabled: boolean('primary button disabled', false),
        isLoading: boolean('primary button in loading state', false),
        loadingText: text('primary button loading text', ''),
      }}
      height={text('height', '170px')}
      width={text('width', '500px')}
      minWidth={text('minWidth', '320px')}
      minHeight={text('minHeight', '170px')}
      classes={text('classes', 'class another-class')}>
      {text('children', 'modal content')}
    </Modal>
  ))
  .add('with two buttons', () => (
    <Modal
      title={text('title', 'modal')}
      onClose={action('modal close called!')}
      isLoading={boolean('isLoading', false)}
      primaryButton={{
        handleClick: action('primary button clicked'),
        text: text('primary button text', 'proceed'),
        isDisabled: boolean('primary button disabled', false),
        isLoading: boolean('primary button in loading state', false),
        loadingText: text('primary button loading text', ''),
      }}
      secondaryButton={{
        handleClick: action('secondary button clicked'),
        text: text('secondary button text', 'back'),
        isDisabled: boolean('secondary button disabled', false),
      }}>
      {text('children', 'modal content')}
    </Modal>
  ))
  .add('with no header', () => (
    <Modal
      isLoading={boolean('isLoading', false)}
      primaryButton={{
        handleClick: action('primary button clicked'),
        text: text('primary button text', 'proceed'),
        isDisabled: boolean('primary button disabled', false),
      }}
      secondaryButton={{
        handleClick: action('secondary button clicked'),
        text: text('secondary button text', 'back'),
        isDisabled: boolean('secondary button disabled', false),
      }}>
      {text('children', 'modal content')}
    </Modal>
  ))
  .add('with no buttons', () => (
    <Modal
      isLoading={boolean('isLoading', false)}
      title={text('title', 'modal')}
      onClose={action('modal close called!')}>
      {text('children', 'modal content')}
    </Modal>
  ));
