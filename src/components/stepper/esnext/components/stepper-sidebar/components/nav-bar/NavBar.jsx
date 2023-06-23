import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const NavBar = (props) => (
  <Fragment>
    {React.Children.map(props.children, (child, index) =>
      React.cloneElement(child, {
        isActive: props.activeStepIndex === index,
      }),
    )}
  </Fragment>
);

NavBar.propTypes = {
  /**
   * Used to tell the child items whether their content is currently being shown
   */
  activeStepIndex: PropTypes.number.isRequired,
  /**
   * Collection of <NavItem/>'s
   */
  children: PropTypes.node.isRequired,
};

export default NavBar;
