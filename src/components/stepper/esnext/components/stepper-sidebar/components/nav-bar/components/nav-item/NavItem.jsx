import React from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import Icon from '@cmc/icon/esnext/Icon';
import bem from '@argos/utils/esnext/bem';
import classNames from 'classnames';
import './NavItem.scss';
import NavItemConstants from './constants';

const cn = bem({ prefix: 'cmc-', block: 'nav-item' });

const NavItem = ({
  icon,
  isCustomIcon,
  title,
  subTitle,
  summary,
  shortSummary,
  isActive,
  handleClick,
  isComplete,
  currIndex,
  summaryStyle,
  allowNavigation,
  minimizeNav,
}) => {
  const classes = classNames(cn(), {
    [cn(null, 'active')]: isActive,
    locked: !allowNavigation,
  });

  return (
    <div onClick={() => handleClick({ desiredIndex: currIndex })} className={classes}>
      <div className={cn('title')}>
        {isComplete ? (
          <CSSTransition in timeout={300} classNames={cn('complete')} unmountOnExit>
            <div className={cn('complete')}>{!minimizeNav && <Icon icon={'check_circle'} />}</div>
          </CSSTransition>
        ) : (
          ''
        )}
        {icon && <Icon icon={icon} isCustom={isCustomIcon} />}
        {!minimizeNav && title}
      </div>

      {/* Only show description of step for active one */}
      {isActive && !minimizeNav && <div className={cn('subtitle')}>{subTitle}</div>}

      {/* Show summaries on previous steps if we've got one */}
      {summary &&
        ((isComplete && summaryStyle === 'after-completion') || (isActive && summaryStyle === 'real-time')) && (
          <div className={cn('summary')}>{minimizeNav ? shortSummary : summary}</div>
        )}
    </div>
  );
};
NavItem.propTypes = {
  /**
   * Icon for this step
   */
  icon: PropTypes.string.isRequired,
  /**
   * Primary title for this step
   */
  title: PropTypes.string.isRequired,
  /**
   * Called when we click anywhere in nav item
   */
  onClick: PropTypes.func,
  /**
   * Description about whats required from the step
   */
  subTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /**
   * Show whats been completed in a previous step
   */
  summary: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /**
   * Show summary in minimzed state
   */
  shortSummary: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /**
   * Whether we're currently displaying the content for this step
   */
  isActive: PropTypes.bool.isRequired,
  /**
   * Has this stage already been completed
   */
  isComplete: PropTypes.bool,
  /**
   * Is Nav minimized
   */
  minimizeNav: PropTypes.bool,
  /**
   * The current index we've reached upto
   */
  currIndex: PropTypes.number.isRequired,
  /**
   * It will display the sumarry of the step as follow:
   * - real-time: always visible
   * - after-completion: only when the step is completed
   * - hide: never visible
   */
  summaryStyle: PropTypes.oneOf(NavItemConstants.summaryStyles),
  /**
   * Determines when the stepper should allow to move to a previous step.
   */
  allowNavigation: PropTypes.bool,
};

NavItem.defaultProps = {
  icon: '',
  summary: '',
  shortSummary: '',
  subTitle: '',
  isComplete: true,
  summaryStyle: 'after-completion',
};

export default NavItem;
