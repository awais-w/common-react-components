import React from 'react';
import Waypoint from 'react-waypoint';
import { shallow } from 'enzyme';
import StepperStage from './StepperStage';

const previousProps = {
  title: 'title',
  content: 'content',
  // renderUpToLatestStageReached: false,
  activeStepIndex: 0,
  stepIndex: 1,
  stageType: 'previous',
  allowNavigation: true,
  shouldNavBarUpdateOnScroll: true,
  onClickPreviousStep: jest.fn(),
};

const currentProps = {
  ...previousProps,
  activeStepIndex: 1,
  stageType: 'current',
  shouldNavBarUpdateOnScroll: false,
};

// Mock the uuid
jest.mock('uuid/v4', () => () => '00000000-0000-0000-0000-000000000000');

const setup = ({ props }) => {
  const component = shallow(<StepperStage {...props} />);
  return {
    wrapper: component,
    getStepperStage: () => component.find('.cmc-stepper-stage'),
    getWaypoint: () => component.find(Waypoint),
    getHeadings: () => component.find('.cmc-stepper-stage__headings'),
    getHeadingsSubtitle: () => component.find('.cmc-stepper-stage__headings').find('h4'),
  };
};

const stepperFunctions = require('../../helpers/StepperFunctions');

stepperFunctions.default = jest.fn();

describe('StepperStage', () => {
  describe('base tests', () => {
    const component = setup({ props: previousProps });
    it('exists', () => {
      expect(component.wrapper).toExist();
    });
    it('should match default snapshot', () => {
      expect(component.wrapper).toMatchSnapshot();
    });
    it('calls default functions successfully', () => {
      component.wrapper.instance().props.onWaypointEnter();
      component.wrapper.instance().props.onClickPreviousStep();
      component.wrapper.instance().props.scrollTo();
    });
  });

  describe('when scrollToMe is called', () => {
    const component = setup({ props: previousProps });
    component.wrapper.instance().scrollToMe();
    it('should call scrollTo', () => {
      expect(stepperFunctions.default).toBeCalled();
    });
  });

  describe('when componentDidMount is called', () => {
    const component = setup({ props: previousProps });
    component.wrapper.instance().scrollToMe = jest.fn();
    component.wrapper.instance().componentDidMount();
    it('should call scrollToMe', () => {
      expect(component.wrapper.instance().scrollToMe).toBeCalled();
    });
  });

  describe('headings div', () => {
    const component = setup({ props: previousProps });
    it('should not render headings if shouldShowPageTitle is set to false', () => {
      component.wrapper.setProps({ shouldShowStageTitle: false });
      expect(component.getHeadings()).not.toExist();
    });
    it('should render headings with no subtitle if shouldShowPageTitle is set to true and subtitle is null', () => {
      component.wrapper.setProps({ shouldShowStageTitle: true });
      expect(component.getHeadings()).toExist();
      expect(component.getHeadingsSubtitle()).not.toExist();
    });
    it('renders headings with subtitle if shouldShowPageTitle is set to true and subtitle is not null', () => {
      component.wrapper.setProps({ shouldShowStageTitle: true, subTitle: 'Test' });
      expect(component.getHeadingsSubtitle().text()).toEqual(` - ${component.wrapper.instance().props.subTitle}`);
    });
  });

  describe('when componentDidUpdate is called', () => {
    it('calls scrollToMe if activeStepIndex changes and is now equal to stepIndex', () => {
      const component = setup({ props: previousProps });
      component.wrapper.instance().scrollToMe = jest.fn();
      component.wrapper.setProps(currentProps);
      expect(component.wrapper.instance().scrollToMe).toBeCalled();
    });
    it('does not call scrollToMe if activeStepIndex does not change', () => {
      const component = setup({ props: previousProps });
      component.wrapper.instance().scrollToMe = jest.fn();
      component.wrapper.setProps(previousProps);
      expect(component.wrapper.instance().scrollToMe).not.toBeCalled();
    });
  });

  describe('onWaypointEnter', () => {
    it('should be called when onEnter event is fired with shouldNavBarUpdateOnScroll set to true', () => {
      const component = setup({ props: { ...previousProps, onWaypointEnter: jest.fn() } });
      component.getWaypoint().simulate('enter');
      expect(component.wrapper.instance().props.onWaypointEnter).toBeCalledWith({ stepIndex: previousProps.stepIndex });
    });
  });

  describe('when is the previous stage', () => {
    let component = setup({ props: previousProps });
    it('is disabled', () => {
      expect(component.getStepperStage()).toHaveClassName('disabled');
    });
    describe('the navigation to previous stages', () => {
      it("is not allowed when it's locked", () => {
        component = setup({
          props: { ...previousProps, allowNavigation: false, onClickPreviousStep: jest.fn() },
        });
        expect(component.getStepperStage()).toHaveClassName('locked');
        expect(component.wrapper.instance().props.onClickPreviousStep).not.toBeCalled();
        component.getStepperStage().simulate('click');
        expect(component.wrapper.instance().props.onClickPreviousStep).not.toBeCalled();
      });
      it("is allowed when it's NOT locked", () => {
        component = setup({ props: { ...previousProps, allowNavigation: true, onClickPreviousStep: jest.fn() } });
        expect(component.getStepperStage()).not.toHaveClassName('locked');
        expect(component.wrapper.instance().props.onClickPreviousStep).not.toBeCalled();
        component.getStepperStage().simulate('click');
        expect(component.wrapper.instance().props.onClickPreviousStep).toBeCalledWith({
          desiredIndex: previousProps.stepIndex,
        });
      });
    });
  });
  describe('when is the current stage', () => {
    const component = setup({ props: currentProps });
    it('is not disabled', () => {
      expect(component.getStepperStage()).not.toHaveClassName('disabled');
    });
    describe('the navigation to previous stages', () => {
      describe('is not allowed', () => {
        expect(component.getStepperStage()).not.toHaveClassName('locked');
        expect(component.wrapper.instance().props.onClickPreviousStep).not.toBeCalled();
        component.getStepperStage().simulate('click');
        expect(component.wrapper.instance().props.onClickPreviousStep).not.toBeCalled();
      });
    });
  });
});
