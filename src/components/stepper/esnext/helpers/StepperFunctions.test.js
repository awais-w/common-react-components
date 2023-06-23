import React from 'react';
import scrollTo from './StepperFunctions';
import StepperStage from '../components/stepper-stage';

const reactScroll = require('react-scroll');

const componentName = <StepperStage />;

reactScroll.scroller.scrollTo = jest.fn();

describe('scrollTo', () => {
  it('should call scroller.scrollTo', () => {
    scrollTo(componentName, 0, '', 0);
    expect(reactScroll.scroller.scrollTo).toBeCalled();
  });
});
