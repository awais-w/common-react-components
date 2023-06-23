import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import bem from '@argos/utils/esnext/bem';

import isEmpty from '@cmc/utils/esnext/isEmpty';
import StepperStage from './components/stepper-stage';
import StepperSidebar from './components/stepper-sidebar';
import StepperContent from './components/stepper-content';
import './Stepper.scss';

const cn = bem({ prefix: 'cmc-', block: 'stepper' });
export default class Stepper extends PureComponent {
  constructor(props) {
    super(props);
    /**
     * "currentlyViewingStepIndex" - Manages what we're scrolling over to update NavBar
     * "latestStepReachedIndex" - Allow us to draw upto the latest step we've reached step we've
     *  reached even after we've navigated back
     */
    this.state = {
      activeStepIndex: props.activeStepIndex,
      currentlyViewingStepIndex: 0,
      latestStepReachedIndex: 0,
      parentScrollContainer: uuidv4(),
      minimizeNav: false,
      navOrientation: this.props.orientation,
    };

    this.handleClickPreviousStep = this.handleClickPreviousStep.bind(this);
    this.handleWaypointEnter = this.handleWaypointEnter.bind(this);
    this.handleNavToggle = this.handleNavToggle.bind(this);
    this.handleNavOrientation = this.handleNavOrientation.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const stateChanges = { activeStepIndex: nextProps.activeStepIndex };
    if (nextProps.activeStepIndex !== prevState.activeStepIndex) {
      // If we've clicked back / forward in our parent our NavBar should reflect that now
      stateChanges.currentlyViewingStepIndex = nextProps.activeStepIndex;
      if (nextProps.activeStepIndex > prevState.activeStepIndex) {
        /**
         * If we've moved to a later step Set latestStepReachedIndex to new step,
         * so if we navigate back in the future we'll still draw up to this
         */
        stateChanges.latestStepReachedIndex = nextProps.activeStepIndex;
      }
    }
    return stateChanges;
  }

  /**
   * provided an index update our internal state + parent state
   * @param {number} desiredIndex - Define a step index to navigate to
   */
  handleClickPreviousStep({ desiredIndex }) {
    // This is internal state used to correcty highlight <NavItem/> when scrolling
    this.setState(() => ({
      currentlyViewingStepIndex: desiredIndex,
    }));

    this.props.handleStep({ desiredIndex });
  }

  /**
   * Maintain the correct step showing on the left when we scroll back / forward through steps
   * @param {number} stepIndex - The step our <NavBar/> should be showing
   */
  handleWaypointEnter({ stepIndex }) {
    this.setState({
      currentlyViewingStepIndex: stepIndex,
    });
  }

  handleNavToggle(toggler) {
    this.setState({
      minimizeNav: toggler,
    });
  }

  handleNavOrientation(position) {
    this.setState({
      navOrientation: position,
    });
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props;
    if (oldProps.orientation !== newProps.orientation) {
      this.setState({ navOrientation: newProps.orientation });
    }
  }

  render() {
    const {
      children,
      activeStepIndex,
      shouldNavBarUpdateOnScroll,
      renderUpToLatestStageReached,
      summaryStyle,
      lastItemDoneOnReach,
    } = this.props;
    const {
      currentlyViewingStepIndex,
      latestStepReachedIndex,
      parentScrollContainer,
      minimizeNav,
      navOrientation,
    } = this.state;

    // Check for isEmpty, because for any reason if any stage does not contain allowNavigation flag it should allow navigation.
    const allowNavigation =
      isEmpty(children[activeStepIndex].props.allowNavigation) || children[activeStepIndex].props.allowNavigation;

    return (
      <div
        style={{ height: this.props.height }}
        className={cn(null, {
          'nav-left': navOrientation === 'left-side',
          'nav-right': navOrientation === 'right-side',
          'nav-minimize': minimizeNav,
        })}>
        <div className={cn('nav-container')}>
          <StepperSidebar
            orientation={navOrientation}
            minimizeNav={minimizeNav}
            activeStepIndex={activeStepIndex}
            currentlyViewingStepIndex={currentlyViewingStepIndex}
            onClickPreviousStep={this.handleClickPreviousStep}
            onNavToggle={this.handleNavToggle}
            onOrientationToggle={this.handleNavOrientation}
            summaryStyle={summaryStyle}
            allowNavigation={allowNavigation}
            lastItemDoneOnReach={lastItemDoneOnReach}>
            {/* Render each <StepperStage/> title / subtitle / summary  */}
            {children}
          </StepperSidebar>
        </div>
        <div className={cn('content-container')} id={parentScrollContainer}>
          <StepperContent
            shouldNavBarUpdateOnScroll={shouldNavBarUpdateOnScroll}
            latestStepReachedIndex={latestStepReachedIndex}
            activeStepIndex={activeStepIndex}
            onClickPreviousStep={this.handleClickPreviousStep}
            onWaypointEnter={this.handleWaypointEnter}
            renderUpToLatestStageReached={renderUpToLatestStageReached}>
            {/* Render each <StepperStage/> content + navigation  / subtitle / summary  */}
            {React.Children.map(children, (child) =>
              React.cloneElement(child, {
                parentScrollContainer: this.state.parentScrollContainer,
                allowNavigation,
              }),
            )}
          </StepperContent>
        </div>
        {/* Display stages button @ bottom of stepper */}
        <div className={cn('control-buttons-container')}>{children[activeStepIndex].props.transitionButton}</div>
      </div>
    );
  }
}

Stepper.propTypes = {
  /**
   * Location of the <NavBar />
   */
  navOrientation: PropTypes.oneOf(['left-side', 'right-side']),
  /**
   * Set the current step ( Zero based index )
   */
  activeStepIndex: PropTypes.number.isRequired,
  /**
   * One or more `<StepperStage/>` components.
   */
  children: PropTypes.oneOfType([
    PropTypes.shape({
      type: PropTypes.oneOf([StepperStage]),
    }),
    PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.oneOf([StepperStage]),
      }),
    ),
  ]).isRequired,
  /**
   * Provide the ability to update activeStepIndex in the parent function to a certain index
   */
  handleStep: PropTypes.func.isRequired,
  /**
   * A set PX height can be provided if needed
   */
  height: PropTypes.string,
  /**
   * Determines whether we render a waypoint for each stage so we can update NavBar on scrolling over them
   */
  shouldNavBarUpdateOnScroll: PropTypes.bool,
  /**
   * Determines whether we should render just to activeIndex or latestStepReachedIndex
   */
  renderUpToLatestStageReached: PropTypes.bool, // TODO: migrate to common-react-components
  /**
   * When the summary should be rendered
   */
  summaryStyle: PropTypes.string,
};

Stepper.defaultProps = {
  orientation: 'left-side',
  height: '100%',
  shouldNavBarUpdateOnScroll: true,
};
