import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, select, boolean, radios, text, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import README from '../README.md';
import StepperStage from './components/stepper-stage';
import Stepper from './Stepper';
import NavBar from './components/stepper-sidebar/components/nav-bar';
import NavItem from './components/stepper-sidebar/components/nav-bar/components/nav-item';

const summaryStyles = {
  afterCompletion: 'after-completion',
  realTime: 'real-time',
  hide: 'hide',
};

storiesOf('Components|Stepper', module)
  .addParameters({
    options: { theme: {} },
  })
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))
  .add('Stepper', () => (
    <Stepper
      orientation={select('Orientation', ['left-side', 'right-side'], 'left-side')}
      activeStepIndex={select('Active step index', [0, 1, 2, 3, 4], 0)}
      summaryStyle={radios('summaryStyle', summaryStyles, summaryStyles.afterCompletion)}
      handleStep={action('handle step called!')}
      height={number('height')}
      lastItemDoneOnReach={boolean('Last Item Done On Reach', true)}>
      <StepperStage
        icon='eco'
        title='Stepper Stage 1'
        subTitle='Stepper subtitle 1'
        content='The content related to the first Stepper component will be here'
        summary='Stepper summary 1'
        shortSummary='£XX.xx'
      />
      <StepperStage
        icon='icon-currency'
        isCustomIcon
        title='Stepper stage 2'
        subTitle='Stepper subtitle 2'
        content='The content related to the second Stepper component will be here'
        summary='Stepper summary 2'
      />
      <StepperStage
        icon='grade'
        title='Stepper stage 3'
        subTitle='The third stage in the Stepper'
        content='The content related to the third Stepper component will be here'
        summary='Stepper summary 3'
      />
      <StepperStage
        icon='fingerprint'
        title='Stepper stage 4'
        subTitle='Stepper subtitle 4'
        content='The content related to the fourth Stepper component will be here'
        summary='Stepper summary 4'
      />
      <StepperStage
        icon='done_outline'
        title='Stepper stage 5'
        subTitle='The fifth stage in the Stepper'
        content='The content related to the fifth Stepper component will be here'
        summary='Stepper summary 5'
        allowNavigation={false}
      />
    </Stepper>
  ))
  .add('Nav Bar', () => (
    <NavBar activeStepIndex={select('Active step index', [0, 1, 2], 1)}>
      <NavItem
        title='Nav Item 0'
        subTitle='Subtitle for Nav Item 0'
        summary='Summary for Nav Item 0'
        isComplete={boolean('Nav item 0 complete', true)}
        onClick={action("You've clicked something!")}
      />
      <NavItem
        title='Nav Item 1'
        subTitle='Subtitle for Nav Item 1'
        summary='Summary for Nav Item 1'
        isComplete={boolean('Nav item 1 complete', false)}
        onClick={action("You've clicked something!")}
      />
      <NavItem
        title='Nav Item 2'
        subTitle='Subtitle for Nav Item 2'
        summary='Summary for Nav Item 2'
        isComplete={boolean('Nav item 2 complete', false)}
        onClick={action("You've clicked something!")}
      />
    </NavBar>
  ))
  .add('Single Nav Item', () => (
    <NavItem
      title={text('title', 'Nav Item Title')}
      subTitle={text('subTitle', 'Nav Item Subtitle')}
      summary={text('summary', 'Nav Item Summary')}
      isActive={boolean('isActive', true)}
      onClick={action("You've clicked something!")}
      isComplete={boolean('isComplete', true)}
      summaryStyle={radios('summaryStyle', summaryStyles, summaryStyles.afterCompletion)}
    />
  ));
