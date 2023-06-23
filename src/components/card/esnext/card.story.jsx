import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, text, boolean, radios, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Card from './card';
import README from '../README.md';

const panelTypes = {
  Collapsed: 'panel-collapsed',
  Expanded: 'panel-expanded',
  Highlighted: 'panel-highlighted',
};

const panelStatus = {
  None: '',
  Other: 'OTHER',
  Created: 'CREATED',
  Cancelled: 'CANCELLED',
  Collected: 'COLLECTED',
  Mixed: 'MIXED',
  InProgress: 'IN_PROGRESS',
  InTransit: 'IN_TRANSIT',
  ReadyToCollect: 'READY_TO_COLLECT',
  Failed: 'FAILED',
  ReturnInProgress: 'RETURN_IN_PROGRESS',
  Returned: 'RETURNED',
  ReturnFailed: 'RETURN_FAILED',
  Delivered: 'DELIVERED',
  Refunded: 'REFUNDED',
};

const actions = [
  <div key='1' className='actions-item'>
    Action 1
  </div>,
  <div key='2' className='actions-item'>
    Action 2
  </div>,
  <div key='3' className='actions-item'>
    Action 3
  </div>,
];

storiesOf('Components|Card', module)
  .addParameters({
    options: { theme: {} },
  })
  .addDecorator(withReadme(README))
  .addDecorator(withKnobs)
  .add('Not expandable', () => (
    <Card
      key={'contact'}
      title1={text('Title 1', 'TITLE 1')}
      title2={text('Title 2', 'Title 2')}
      title3={text('Title 3', 'Title 3')}
      icon={text('Icon Override', 'account_circle')}
      isNested={boolean('isNested', false)}
      summary={text('Summary', 'This is summary text')}
      panelType={radios('Panel style', panelTypes, panelTypes.Collapsed)}
      status={radios('Status', panelStatus, panelStatus.None)}
      rightIcons={object('Right Icons', [
        {
          icon: 'accessibility_new',
          tooltip: 'Tooltip',
          color: 'black',
        },
        {
          icon: 'card_membership',
          tooltip: 'Tooltip 2',
          color: 'red',
        },
      ])}
    />
  ))
  .add('with right icons clickable', () => (
    <Card
      key={'contact'}
      title1={text('Title 1', 'TITLE 1')}
      title2={text('Title 2', 'Title 2')}
      title3={text('Title 3', 'Title 3')}
      icon={text('Icon Override', 'account_circle')}
      isNested={boolean('isNested', false)}
      summary={text('Summary', 'This is summary text')}
      panelType={radios('Panel style', panelTypes, panelTypes.Collapsed)}
      status={radios('Status', panelStatus, panelStatus.None)}
      rightIcons={object('Right Icons', [
        {
          icon: 'accessibility_new',
          tooltip: 'Tooltip',
          onClick: action("You've clicked the accessibility icon!"),
        },
        {
          icon: 'card_membership',
          tooltip: 'Tooltip 2',
          onClick: action("You've clicked the card membership icon!"),
        },
      ])}
    />
  ))
  .add('Expandable', () => (
    <Card
      key={'contact'}
      title1={text('Title 1', 'TITLE 1')}
      title2={text('Title 2', 'Title 2')}
      title3={text('Title 3', 'Title 3')}
      icon={text('Icon Override', 'account_circle')}
      summary={text('Summary', 'This is summary text')}
      isExpanded={boolean('isExpanded', true)}
      isNested={boolean('isNested', false)}
      onToggle={action()}
      panelType={radios('Panel style', panelTypes, panelTypes.Collapsed)}
      status={radios('Status', panelStatus, panelStatus.None)}>
      <div>Child 1</div>
      <div>Child 2</div>
      <div>Child 3</div>
    </Card>
  ))
  .add('With Actions', () => (
    <Card
      key={'contact'}
      title1={text('Title 1', 'TITLE 1')}
      title2={text('Title 2', 'Title 2')}
      title3={text('Title 3', 'Title 3')}
      icon={text('Icon Override', 'account_circle')}
      summary={text('Summary', 'This is summary text')}
      isExpanded={boolean('isExpanded', false)}
      isNested={boolean('isNested', false)}
      onToggle={action()}
      panelType={radios('Panel style', panelTypes, panelTypes.Collapsed)}
      status={radios('Status', panelStatus, panelStatus.None)}
      rightIcons={object('Right Icons', [
        {
          icon: 'accessibility_new',
          tooltip: 'Tooltip',
        },
        {
          icon: 'card_membership',
          tooltip: 'Tooltip 2',
        },
      ])}
      actions={[...actions]}>
      <div>Child 1</div>
      <div>Child 2</div>
      <div>Child 3</div>
    </Card>
  ))
  .add('With Status', () => (
    <Card
      key={'contact'}
      title1={text('Title 1', 'TITLE 1')}
      title2={text('Title 2', 'Title 2')}
      title3={text('Title 3', 'Title 3')}
      summary={text('Summary', 'This is summary text')}
      isExpanded={boolean('isExpanded', false)}
      isNested={boolean('isNested', false)}
      onToggle={action()}
      panelType={radios('Panel style', panelTypes, panelTypes.Collapsed)}
      icon={text('Icon', '')}
      status={radios('Status', panelStatus, panelStatus.Delivered)}
      rightIcons={object('Right Icons', [
        {
          icon: 'accessibility_new',
          tooltip: 'Tooltip',
        },
        {
          icon: 'card_membership',
          tooltip: 'Tooltip 2',
        },
      ])}
      actions={[...actions]}>
      <div>Child 1</div>
      <div>Child 2</div>
      <div>Child 3</div>
    </Card>
  ))
  .add('With Skeleton', () => (
    <Card
      key={'contact'}
      title1={text('Title 1', 'TITLE 1')}
      title2={text('Title 2', 'Title 2')}
      title3={text('Title 3', 'Title 3')}
      summary={text('Summary', 'This is summary text')}
      isExpanded={boolean('isExpanded', false)}
      isNested={boolean('isNested', false)}
      onToggle={action()}
      panelType={radios('Panel style', panelTypes, panelTypes.Collapsed)}
      icon={text('Icon', '')}
      status={radios('Status', panelStatus, panelStatus.Delivered)}
      isLoading={boolean('isLoading', true)}
    />
  ))
  .add('With label on right', () => (
    <Card
      key={'contact'}
      title1={text('Title 1', 'TITLE 1')}
      title2={text('Title 2', 'Title 2')}
      isExpanded={boolean('isExpanded', false)}
      panelType={radios('Panel style', panelTypes, panelTypes.Collapsed)}
      rightIcons={object('Right Icons', [
        {
          label: '45 items',
        },
      ])}
    />
  ));
