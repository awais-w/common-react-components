import React from 'react';
import PropTypes from 'prop-types';
import bem from '@argos/utils/esnext/bem';
import Icon from '@cmc/icon/esnext/Icon';
import './Notification.scss';

const cn = bem({ prefix: 'cmc-', block: 'notification' });

const modes = ['info', 'warning', 'error'];
const alignments = ['top', 'middle'];

const propTypes = {
  iconAlignment: PropTypes.oneOf(alignments),
  mode: PropTypes.oneOf(modes),
};

const defaultProps = {
  mode: 'info',
  iconAlignment: 'middle',
};

const Notification = (props) => {
  const { children, mode, iconAlignment } = props;

  return (
    <div className={cn(null, mode, `icon-alignment-${iconAlignment}`)}>
      <Icon icon={mode} />
      <span className={cn('message')}>{children}</span>
    </div>
  );
};

Notification.propTypes = propTypes;
Notification.defaultProps = defaultProps;
export default Notification;
