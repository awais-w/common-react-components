import React from 'react';
import PropTypes from 'prop-types';
import bem from '@argos/utils/esnext/bem';
import { TransitionGroup } from 'react-transition-group';

// TODO - In the near future we should be importing these directly from node_modules
import IconLabelValue from '@cmc/icon-label-value/esnext';
import NavItem from './components/nav-bar/components/nav-item';
import NavBar from './components/nav-bar';

const cn = bem({ prefix: 'cmc-', block: 'stepper-container' });

const StepperSidebar = ({
  children,
  activeStepIndex,
  currentlyViewingStepIndex,
  onClickPreviousStep,
  onNavToggle,
  onOrientationToggle,
  minimizeNav,
  summaryStyle,
  allowNavigation,
  orientation,
  lastItemDoneOnReach,
}) => (
  <TransitionGroup className={cn('nav-container', null)}>
    <a className={cn('nav-toggle')} onClick={() => onNavToggle(!minimizeNav)}>
      {minimizeNav ? (
        <i className='material-icons'>swap_horiz</i>
      ) : (
        <React.Fragment>
          Minimize this column <i className='material-icons'>compare_arrows</i>
        </React.Fragment>
      )}
    </a>
    <span
      className={cn(`nav-orientation-toggle${minimizeNav ? '-bottom' : ''}`)}
      onClick={() => onOrientationToggle(orientation === 'left-side' ? 'right-side' : 'left-side')}>
      <IconLabelValue
        icon={`icon-to-${orientation === 'left-side' ? 'right' : 'left'}`}
        isCustom
        isInline
        color={minimizeNav ? 'blue' : 'white'}
        tooltipValue={`Move this column to ${orientation === 'left-side' ? 'right' : 'left'}`}
      />
    </span>
    <NavBar activeStepIndex={currentlyViewingStepIndex}>
      {React.Children.map(children, (child, currIndex) => {
        const { icon, isCustomIcon, title, subTitle, summary, shortSummary } = child.props;
        return (
          <NavItem
            key={`navitem-${title}`}
            isComplete={currIndex < activeStepIndex || (lastItemDoneOnReach && children.length === activeStepIndex + 1)}
            isActive={currIndex === activeStepIndex}
            icon={icon}
            isCustomIcon={isCustomIcon}
            title={title}
            subTitle={subTitle || null}
            summary={summary}
            shortSummary={shortSummary}
            summaryStyle={summaryStyle}
            currIndex={currIndex}
            allowNavigation={allowNavigation}
            minimizeNav={minimizeNav}
            handleClick={(e) => {
              if (minimizeNav) onNavToggle(false);
              if (allowNavigation && currIndex < activeStepIndex && !minimizeNav) {
                onClickPreviousStep(e);
              }
            }}
          />
        );
      })}
    </NavBar>
  </TransitionGroup>
);

StepperSidebar.propTypes = {
  /**
   * Set the current step ( Zero based index )
   */
  activeStepIndex: PropTypes.number.isRequired,
  /**
   * What stage we're curent viewing ( Zero based index ) - Allows our nav bar to show which content
   * we're currently viewing ( E.g when scrolling to a previous stage )
   */
  currentlyViewingStepIndex: PropTypes.number.isRequired,
  /**
   * One or more `<StepperStage/>` components.
   */
  children: PropTypes.node.isRequired,
  /**
   * Is Nav minimized
   */
  minimizeNav: PropTypes.bool,
  /**
   * Should the last step be marked as done when reached? (useful in case the last item step is confirmation)
   */
  lastItemDoneOnReach: PropTypes.bool,

  /**
   * Provide the ability to update activeStepIndex in the parent function to a certain index
   */
  onClickPreviousStep: PropTypes.func.isRequired,
  /**
   * Provide the ability to update minimizeNav in the parent function
   */
  onNavToggle: PropTypes.func.isRequired,
  /**
   * Provide the ability to update onOrientationToggle in the parent function
   */
  onOrientationToggle: PropTypes.func.isRequired,
  /**
   * When the summary should be rendered
   */
  summaryStyle: PropTypes.string,
  /**
   * Flag to indicate whether navigation is allowed from stepper stage or not.
   */
  allowNavigation: PropTypes.bool,
};

StepperSidebar.defaultProps = {
  lastItemDoneOnReach: false,
};

export default StepperSidebar;
