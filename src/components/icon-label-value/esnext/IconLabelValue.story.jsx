import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, text, boolean, object, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import IconLabelValue from './IconLabelValue';
import README from '../README.md';

storiesOf('Components|IconLabelValue', module)
  .addParameters({
    options: { theme: {} },
  })
  .addDecorator(withReadme(README))
  .addDecorator(withKnobs)
  .add('with single value', () => (
    <IconLabelValue
      key='person-name'
      icon={text('icon', 'person')}
      label={text('label', 'User:')}
      value={text('value', 'John Doe')}
      onClick={action("You've clicked something!")}
      color={select('icon color', ['red', 'yellow', 'blue', 'black'], 'black')}
    />
  ))
  .add('with custom icon', () => (
    <IconLabelValue
      key='person-name'
      icon='icon-rebook-delivery'
      isCustom={true}
      label={text('label', 'User:')}
      value={text('value', 'John Doe')}
      onClick={action("You've clicked something!")}
    />
  ))
  .add('with multiple IconLabelValue', () => (
    <Fragment>
      <IconLabelValue
        key='person-name'
        isInline={boolean('isInline', false)}
        icon={text('icon', 'person')}
        label={text('label', 'User:')}
        value={text('value', 'John Doe')}
        onClick={action("You've clicked something!")}
      />
      <IconLabelValue
        key='person-name'
        isInline={boolean('isInline', false)}
        label={text('label', 'User:')}
        value={text('value', 'John Doe')}
        onClick={action("You've clicked something!")}
      />
      <IconLabelValue
        key='person-name'
        isInline={boolean('isInline', false)}
        icon={text('icon', 'person')}
        label={text('label', 'User:')}
        value={text('value', 'John Doe')}
        onClick={action("You've clicked something!")}
      />
    </Fragment>
  ))
  .add('with multiple values', () => (
    <IconLabelValue
      key='person-name'
      label={text('label', 'User:')}
      icon={text('icon', 'person')}
      value={object('values', [{ value: 'John Doe' }, { value: 'Johan Peterson' }])}
      onClick={action("You've clicked something!")}
    />
  ))
  .add('with no value', () => (
    <IconLabelValue
      key='person-name'
      label={text('label', 'User:')}
      icon={text('icon', 'person')}
      onClick={action("You've clicked something!")}
    />
  ))
  .add('with multiple values with click handlers', () => (
    <IconLabelValue
      key='person-name'
      label={text('label', 'User:')}
      icon={text('icon', 'person')}
      value={object('values', [
        {
          value: 'John Doe',
          key: 'user1',
          onClick: action("You've clicked user 1"),
        },
        {
          value: 'Doe Johnson',
          key: 'user2',
          onClick: action("You've clicked user 2"),
        },
        {
          value: 'Peter Doenshon',
          key: 'user3',
          onClick: action("You've clicked user 3"),
        },
      ])}
      onClick={action("You've clicked the whole component!")}
    />
  ));
