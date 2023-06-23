import React from 'react';
import PropTypes, { oneOf } from 'prop-types';
import Icon from '@cmc/icon/esnext/Icon';
import bem from '@argos/utils/esnext/bem';
import isEmpty from '@cmc/utils/esnext/isEmpty';
import ReactTooltip from 'react-tooltip';
import uuid from 'uuid';
import './IconLabelValue.scss';

const cn = bem({ prefix: 'cmc-', block: 'icon-label-value' });

const IconLabelValue = ({ value, icon, isCustom, isInline, label, onClick, tooltipValue, color, labelColor }) => {
  const handleOnClick = (e, index) => {
    // Potentially an onClick on each value item instead of the top level.
    // This if statement helps to handle that, ensuring the correct one is clicked.
    if (!isEmpty(index) && value && value[index] && value[index].onClick) {
      value[index].onClick(e);
    } else if (onClick) {
      onClick(e);
    }
  };

  const valueContent = !isEmpty(value) ? (
    !Array.isArray(value) ? (
      <span className={cn('value', labelColor)}>{value}</span>
    ) : (
      value.map((valueObj, index) => (
        <span
          key={valueObj.key}
          className={cn('value-multi', valueObj.onClick && 'clickable', labelColor)}
          onClick={(e) => handleOnClick(e, index)}>
          {valueObj.value}
        </span>
      ))
    )
  ) : null;

  const tooltipData = tooltipValue
    ? {
        'data-for': uuid.v4(),
        'data-tip': tooltipValue,
      }
    : {};

  return (
    <div
      className={cn(null, { inline: isInline, 'no-icon': isEmpty(icon) })}
      {...tooltipData}
      onClick={(e) => handleOnClick(e)}>
      {!isEmpty(icon) && <Icon isCustom={isCustom} icon={icon} color={color} />}
      {!isEmpty(label) && <span className={cn('label', labelColor)}>{label}</span>}
      {valueContent && valueContent}
      {tooltipValue && <ReactTooltip id={tooltipData['data-for']} effect='solid' />}
    </div>
  );
};

IconLabelValue.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired,
        onClick: PropTypes.func,
      }),
    ),
  ]),
  onClick: PropTypes.func,
  isInline: PropTypes.bool,
  isCustom: PropTypes.bool,
  tooltipValue: PropTypes.string,
  labelColor: oneOf(['amber', 'blue', 'red', 'green', 'grey']),
};
export default IconLabelValue;
