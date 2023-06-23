import React from 'react';
import PropTypes from 'prop-types';
import bem from '@argos/utils/esnext/bem';
import './Icon.scss';

const Icon = (props) => {
  const { isCustom, icon, onClick, id, disabled, color } = props;
  const cn = bem({ prefix: 'cmc-', block: isCustom ? 'icon-custom' : 'icon' });
  return (
    <i
      className={`${cn(null, color, { disabled, [icon]: isCustom, clickable: onClick })}`}
      id={id || undefined}
      role={onClick ? 'button' : 'icon'}
      onClick={onClick}>
      {icon}
    </i>
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  isCustom: PropTypes.bool,
  onClick: PropTypes.func,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  color: PropTypes.oneOf([undefined, 'white', 'red', 'yellow', 'green', 'blue', 'black', 'grey']),
};

Icon.defaultProps = {
  onClick: null,
  isCustom: false,
};

export default Icon;
