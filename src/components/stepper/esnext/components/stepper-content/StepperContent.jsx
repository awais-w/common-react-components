import React from 'react';
import PropTypes from 'prop-types';

const getStageType = (index, activeStepIndex) => {
  if (index < activeStepIndex) {
    return 'previous';
  }
  if (index === activeStepIndex) {
    return 'current';
  }
  return 'later';
};

const StepperContent = ({
  children,
  activeStepIndex,
  shouldNavBarUpdateOnScroll,
  latestStepReachedIndex,
  onClickPreviousStep,
  onWaypointEnter,
  renderUpToLatestStageReached,
}) =>
  React.Children.map(children, (child, index) => {
    if (index <= (renderUpToLatestStageReached ? latestStepReachedIndex : activeStepIndex)) {
      return React.cloneElement(child, {
        key: `step-${index}`,
        stageType: getStageType(index, activeStepIndex),
        shouldNavBarUpdateOnScroll,
        stepIndex: index,
        activeStepIndex,
        onClickPreviousStep,
        onWaypointEnter,
      });
    }
    return null;
  });

StepperContent.propTypes = {
  /**
   * Set the current step ( Zero based index )
   */
  activeStepIndex: PropTypes.number.isRequired,
  /**
   * The latest stage we've reached up to
   */
  latestStepReachedIndex: PropTypes.number.isRequired,
  /**
   * One or more `<StepperStage/>` components.
   */
  children: PropTypes.node.isRequired,
  /**
   * Determines whether we render a waypoint for each stage so we can update NavBar on scrolling over them
   */
  shouldNavBarUpdateOnScroll: PropTypes.bool.isRequired,
  /**
   * Used to update our parent with a new activeStepID when we click on previous stages
   */
  onClickPreviousStep: PropTypes.func.isRequired,
  /**
   * When we scroll this stage into view, this parent function will be called to update NavBar
   */
  onWaypointEnter: PropTypes.func.isRequired,
  /**
   * Determines whether we should render just to activeIndex or latestStepReachedIndex
   */
  renderUpToLatestStageReached: PropTypes.bool.isRequired,
};

export default StepperContent;
