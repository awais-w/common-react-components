import React from 'react';
import PropTypes, { oneOf } from 'prop-types';
import Icon from '@cmc/icon/esnext/Icon';
import bem from '@argos/utils/esnext/bem';
import isEmpty from '@cmc/utils/esnext/isEmpty';
import './Chip.scss';

const cn = bem({ prefix: 'cmc-', block: 'chip' });

const Chip = ({ icon, label, onClick, color }) => (
  <div className={cn(null, color)} onClick={onClick}>
    {!isEmpty(icon) && <Icon isCustom={icon.isCustom} icon={icon.name} />}
    {!isEmpty(label) && <span className={cn('label')}>{label}</span>}
  </div>
);

Chip.propTypes = {
  icon: PropTypes.shape({
    name: PropTypes.string,
    isCustom: PropTypes.bool,
  }).isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  onClick: PropTypes.func.isRequired,
  color: oneOf(['amber', 'blue', 'red', 'green', 'grey', 'black']),
};
export default Chip;
