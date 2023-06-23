/**
 * Our <Stepper/> component handles drawing content / headers
 * This just provides a cleaner interface to construct <Stepper/>
 */
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import { Element } from 'react-scroll';
import uuidv4 from 'uuid/v4';
import bem from '@argos/utils/esnext/bem';
import classNames from 'classnames';
import scrollTo from '../../helpers/StepperFunctions';
import './StepperStage.scss';

const cn = bem({ prefix: 'cmc-', block: 'stepper-stage' });

class StepperStage extends PureComponent {
  uniqueId;

  constructor(props) {
    super(props);
    this.uniqueId = uuidv4();
  }

  scrollToMe() {
    scrollTo({
      componentName: this.uniqueId,
      duration: this.props.allowNavigation ? 500 : 0,
      parentID: this.props.parentScrollContainer,
    });
  }

  componentDidMount() {
    this.scrollToMe();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.activeStepIndex !== this.props.activeStepIndex &&
      this.props.activeStepIndex === this.props.stepIndex
    ) {
      this.scrollToMe();
    }
  }

  render() {
    const {
      // Provided as part of <StepperStage/> props
      title,
      subTitle,
      content,
      // Added by <Stepper />
      stageType,
      stepIndex,
      onWaypointEnter,
      shouldNavBarUpdateOnScroll,
      shouldShowStageTitle,
      allowNavigation,
      onClickPreviousStep,
    } = this.props;

    const classes = classNames(cn(), {
      disabled: stageType !== 'current',
      locked: !allowNavigation,
    });

    return (
      <Fragment>
        <div
          key={`step-${stepIndex}`}
          onClick={
            allowNavigation && stageType === 'previous' ? () => onClickPreviousStep({ desiredIndex: stepIndex }) : null
          }
          className={classes}
          name={this.uniqueId}>
          <Element key={`step-${stepIndex}`} name={`step-${stepIndex}`}>
            {/* TODO - Provide prop */}
            {shouldShowStageTitle && (
              <div className={cn('headings')}>
                <h1>{title}</h1>
                {subTitle && <h4> - {subTitle}</h4>}
              </div>
            )}
            <div className={cn('content')}>{content}</div>
          </Element>
        </div>

        {shouldNavBarUpdateOnScroll && (
          <Waypoint
            onEnter={() => {
              onWaypointEnter({ stepIndex });
            }}
          />
        )}
      </Fragment>
    );
  }
}

StepperStage.propTypes = {
  /**
   * Primary title for this step
   */
  title: PropTypes.string.isRequired,
  /**
   * Show whats been completed in a previous step
   */
  subTitle: PropTypes.string,
  /**
   * Content for the current stage being rendered
   */
  content: PropTypes.node.isRequired,
  /**
   * Set the current step ( Zero based index )
   */
  activeStepIndex: PropTypes.number,
  /**
   * Where abouts this step is located in relation to current ( So we can for example )
   * Provide the ability to navigate back to stages marked as "Previous"
   */
  stageType: PropTypes.oneOf(['current', 'previous', 'later']),
  /**
   * The index of this stage in relation to other <StepperStage />'s
   */
  stepIndex: PropTypes.number,
  /**
   * When we scroll this stage into view, this parent function will be called to update NavBar
   */
  onWaypointEnter: PropTypes.func,
  /**
   * Used to update our parent with a new activeStepID when we click on previous stages
   */
  onClickPreviousStep: PropTypes.func,
  /**
   * Helper function in <Stepper/> to scroll to a component given it's container ID
   */
  shouldNavBarUpdateOnScroll: PropTypes.bool,
  /**
   * Should we show a title above this current stage content
   */
  shouldShowStageTitle: PropTypes.bool,
  /**
   * The parent container within which the scrolling needs to happen.
   */
  parentScrollContainer: PropTypes.string,
  /**
   * Flag to indicate whether navigation is allowed from stepper stage or not.
   */
  allowNavigation: PropTypes.bool,
};

StepperStage.defaultProps = {
  subTitle: '',
  // provide default values for those provided by <Stepper/>
  activeStepIndex: 0,
  stepIndex: 0,
  stageType: 'current',
  onWaypointEnter: () => {},
  onClickPreviousStep: () => {},
  scrollTo: () => {},
  shouldNavBarUpdateOnScroll: true,
  shouldShowStageTitle: false,
  parentScrollContainer: '',
};

export default StepperStage;
