import React from 'react';
import { shallow } from 'enzyme';
import StepperContent from './StepperContent';
import StepperStage from '../stepper-stage';

const defaultProps = {
  activeStepIndex: 1,
};

const renderLatestProps = {
  activeStepIndex: 1,
  latestStepReachedIndex: 2,
  renderUpToLatestStageReached: true,
};

const setup = ({ props }) => {
  const component = shallow(
    <StepperContent {...props}>
      <StepperStage />
      <StepperStage />
      <StepperStage />
    </StepperContent>,
  );
  return {
    wrapper: component,
    getStage: (index) => component.find(StepperStage).at(index),
  };
};

describe('StepperContent', () => {
  describe('base test', () => {
    const component = setup({ props: defaultProps });
    it('should match default snapshot', () => {
      expect(component.wrapper).toMatchSnapshot();
    });

    it('exists', () => {
      expect(component.wrapper).toExist();
    });

    describe("render appropriate <StepperStage>'s", () => {
      it("should not render future <StepperStages>'s", () => {
        expect(component.getStage(2)).not.toExist();
      });
      it("should render previous and current <StepperStage>'s", () => {
        expect(component.getStage(0)).toExist();
        expect(component.getStage(1)).toExist();
      });
    });
  });

  describe('when renderUpToLatestStageReached is true', () => {
    const component = setup({ props: renderLatestProps });

    describe('it contains correct stageType in relation to current step', () => {
      it('stageType is later if after activeStepIndex', () => {
        expect(component.getStage(2).props().stageType).toEqual('later');
      });
      it('stageType is current if equal to activeStepIndex', () => {
        expect(component.getStage(1).props().stageType).toEqual('current');
      });
      it('stageType is previous if before activeStepIndex', () => {
        expect(component.getStage(0).props().stageType).toEqual('previous');
      });
    });
  });
});
