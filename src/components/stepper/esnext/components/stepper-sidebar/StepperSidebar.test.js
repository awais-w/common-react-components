import React from 'react';
import { shallow } from 'enzyme';
import StepperSidebar from './StepperSidebar';
import StepperStage from '../stepper-stage';
import NavBar from './components/nav-bar';
import NavItem from './components/nav-bar/components/nav-item';

const defaultProps = {
  activeStepIndex: 0,
  currentlyViewingStepIndex: 0,
  onClickPreviousStep: jest.fn(),
  onNavToggle: jest.fn(),
  onOrientationToggle: jest.fn(),
  allowNavigation: true,
  minimizeNav: false,
  lastItemDoneOnReach: false,
};

const setup = ({ props }) => {
  const component = shallow(
    <StepperSidebar {...props}>
      <StepperStage subTitle='Stage subtitle' />
      <StepperStage />
      <StepperStage />
    </StepperSidebar>,
  );
  return {
    wrapper: component,
    getStage: (index) =>
      component
        .find(NavBar)
        .find(NavItem)
        .at(index),
  };
};

describe('StepperSidebar', () => {
  describe('base tests', () => {
    const component = setup({ props: defaultProps });
    it('should match default snapshot', () => {
      expect(component.wrapper).toMatchSnapshot();
    });
    it('exists', () => {
      expect(component.wrapper).toExist();
    });
    it('has a <NavBar> component', () => {
      expect(component.wrapper.find(NavBar)).toExist();
    });
    it('has a NavBar toggle', () => {
      expect(component.wrapper.find('a.cmc-stepper-container__nav-toggle')).toExist();
    });
    it('has a Orientation toggle', () => {
      expect(component.wrapper.find('.cmc-stepper-container__nav-orientation-toggle')).toExist();
      component.wrapper.setProps({ minimizeNav: true });
      expect(component.wrapper.find('.cmc-stepper-container__nav-orientation-toggle-bottom')).toExist();
    });
    it('stages have a default summaryStyle of after-completion when prop is not provided', () => {
      expect(component.getStage(0).props().summaryStyle).toBe('after-completion');
    });
    it('last stage, when reached, has isComplete set to true by default if lastItemDoneOnReach is true', () => {
      component.wrapper.setProps({ activeStepIndex: 2, lastItemDoneOnReach: true });
      expect(component.getStage(2).props().isComplete).toBe(true);
    });
  });

  describe('subtitle', () => {
    const component = setup({ props: defaultProps });
    it('Is null if not defined', () => {
      expect(component.getStage(1).props().subTitle).toBeNull();
    });
  });

  describe('can be clicked', () => {
    const component = setup({ props: defaultProps });
    component.wrapper.setProps({ activeStepIndex: 1 });
    it('cannot click future steps', () => {
      component
        .getStage(2)
        .props()
        .handleClick();
      expect(defaultProps.onClickPreviousStep).not.toBeCalled();
    });
    it('can click previous steps', () => {
      component
        .getStage(0)
        .props()
        .handleClick();
      expect(defaultProps.onClickPreviousStep).toBeCalled();
    });
  });

  describe('prop : onClick', () => {
    const component = setup({ props: defaultProps });
    it('Calls onNavToggle when clicked', () => {
      component.wrapper.find('.cmc-stepper-container__nav-toggle').simulate('click');
      expect(defaultProps.onNavToggle).toBeCalled();
    });
    it('Calls onOrientationToggle when clicked', () => {
      component.wrapper.find('.cmc-stepper-container__nav-orientation-toggle').simulate('click');
      expect(defaultProps.onOrientationToggle).toBeCalled();
    });
  });
});
