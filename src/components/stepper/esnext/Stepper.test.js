import React from 'react';
import { shallow } from 'enzyme';
import Stepper from './Stepper';
import StepperStage from './components/stepper-stage';
import StepperSidebar from './components/stepper-sidebar';
import StepperContent from './components/stepper-content';

const defaultProps = {
  orientation: 'left-side',
  height: '100%',
  shouldNavBarUpdateOnScroll: true,
  activeStepIndex: 0,
  minimizeNav: false,
  navOrientation: 'left-side',
  handleStep: jest.fn(),
};

const nextProps = {
  orientation: 'left-side',
  height: '50%',
  shouldNavBarUpdateOnScroll: true,
  activeStepIndex: 1,
};

// Mock the uuid used in StepperStage
jest.mock('uuid/v4', () => () => '00000000-0000-0000-0000-000000000000');

const setup = ({ props }) => {
  const component = shallow(
    <Stepper {...props}>
      <StepperStage allowNavigation={true} />
      <StepperStage />
      <StepperStage allowNavigation={false} />
    </Stepper>,
  );
  return {
    wrapper: component,
    getSidebar: () => component.find(StepperSidebar),
    getSidebarStage: (index) => component.find(StepperSidebar).find(StepperStage).at(index),
    getContent: () => component.find(StepperContent),
    getContentStage: (index) => component.find(StepperContent).find(StepperStage).at(index),
    getCurrentlyViewingStepIndex: () => component.state('currentlyViewingStepIndex'),
    getLatestStepReachedIndex: () => component.state('latestStepReachedIndex'),
    getMinimizeNavState: () => component.state('minimizeNav'),
    getNavOrientationState: () => component.state('navOrientation'),
  };
};

describe('Stepper', () => {
  describe('base tests', () => {
    const component = setup({ props: defaultProps });
    it('exists', () => {
      expect(component.wrapper).toExist();
    });
    it('should match default snapshot', () => {
      expect(component.wrapper).toMatchSnapshot();
    });
    it('should render one sidebar and one content', () => {
      expect(component.getSidebar()).toHaveLength(1);
      expect(component.getContent()).toHaveLength(1);
    });
  });

  describe('when componentWillReceiveProps is called', () => {
    describe('with a different activeStepIndex', () => {
      const component = setup({ props: defaultProps });
      component.wrapper.setProps(nextProps);
      it('should update currentlyViewingStepIndex to the activeStepIndex', () => {
        expect(component.getCurrentlyViewingStepIndex()).toEqual(nextProps.activeStepIndex);
      });
      describe('should update activeStepIndex accordingly', () => {
        it('should update latestStepReachedIndex if the new is greater than old', () => {
          expect(component.getLatestStepReachedIndex()).toEqual(nextProps.activeStepIndex);
        });
        it('should not revert latestStepIndexReached if we revert the activeStepIndex change', () => {
          component.wrapper.setProps({ activeStepIndex: 0 });
          expect(component.getLatestStepReachedIndex()).toEqual(nextProps.activeStepIndex);
        });
      });
    });

    describe('with the same activeStepIndex', () => {
      const component = setup({ props: defaultProps });
      component.wrapper.setProps(defaultProps);
      it('does not update anything', () => {
        expect(component.getCurrentlyViewingStepIndex()).toEqual(defaultProps.activeStepIndex);
        expect(component.getLatestStepReachedIndex()).toEqual(defaultProps.activeStepIndex);
      });
    });
  });

  describe('when handle click previous step is called', () => {
    const component = setup({ props: defaultProps });
    const index = 2;
    component.wrapper.instance().handleClickPreviousStep({ desiredIndex: index });
    it('should set currentlyViewingStepIndex to desired index', () => {
      expect(component.getCurrentlyViewingStepIndex()).toEqual(index);
    });
    it('should call handleStep', () => {
      expect(component.wrapper.instance().props.handleStep).toBeCalled();
    });
  });

  describe('when handle waypoint enter is called', () => {
    const component = setup({ props: defaultProps });
    const index = 2;
    component.wrapper.instance().handleWaypointEnter({ stepIndex: index });
    it('should set currentlyViewingStepIndex to desired index', () => {
      expect(component.getCurrentlyViewingStepIndex()).toEqual(index);
    });
  });

  describe('when handle Nav Toggle is called', () => {
    const component = setup({ props: defaultProps });
    component.wrapper.setProps(defaultProps);
    component.wrapper.instance().handleNavToggle(!defaultProps.minimizeNav);
    it('should toggle minimizeNav State', () => {
      expect(component.getMinimizeNavState()).toEqual(true);
    });

    it('has the right class on the container', () =>
      expect(component.wrapper).toHaveClassName('cmc-stepper--nav-minimize'));
  });

  describe('when handle Nav Orientation is called', () => {
    const component = setup({ props: defaultProps });
    component.wrapper.instance().handleNavOrientation('right-side');
    it('should toggle navOrientation State', () => {
      expect(component.getNavOrientationState()).toEqual('right-side');
    });

    it('has the right class on the container', () =>
      expect(component.wrapper).toHaveClassName('cmc-stepper--nav-right'));
  });
});

describe("allowNavigation prop is passed down correctly to <StepperStage>'s", () => {
  const component = setup({ props: defaultProps });
  it('is passed explicitly down for sidebar stages', () => {
    expect(component.getSidebarStage(0).props().allowNavigation).toBe(true);
    expect(component.getSidebarStage(1).props().allowNavigation).toBeUndefined();
    expect(component.getSidebarStage(2).props().allowNavigation).toBe(false);
  });

  describe('allowNavigation value of content stages is equal to value of currentlyViewingIndexStep', () => {
    it('is true when currentlyViewingIndexStep has allowNavigation value of true', () => {
      const viewingIndex = 0;
      component.wrapper.setState({ currentlyViewingStepIndex: viewingIndex });
      const expectedAllowNavigation = component.getContentStage(viewingIndex).props().allowNavigation;
      expect(component.getContentStage(0).props().allowNavigation).toBe(expectedAllowNavigation);
      expect(component.getContentStage(1).props().allowNavigation).toBe(expectedAllowNavigation);
      expect(component.getContentStage(2).props().allowNavigation).toBe(expectedAllowNavigation);
    });
    it('is false when currentlyViewingIndexStep has allowNavigation value of false', () => {
      const viewingIndex = 2;
      component.wrapper.setState({ currentlyViewingStepIndex: viewingIndex });
      const expectedAllowNavigation = component.getContentStage(viewingIndex).props().allowNavigation;
      expect(component.getContentStage(0).props().allowNavigation).toBe(expectedAllowNavigation);
      expect(component.getContentStage(1).props().allowNavigation).toBe(expectedAllowNavigation);
      expect(component.getContentStage(2).props().allowNavigation).toBe(expectedAllowNavigation);
    });
  });
});
