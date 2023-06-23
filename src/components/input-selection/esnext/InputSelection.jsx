import React from 'react';
import PropTypes from 'prop-types';
import bem from '@argos/utils/esnext/bem';
import './InputSelection.scss';

const propTypes = {
  checked: PropTypes.bool.isRequired,
  children: PropTypes.any,
  checkboxIconType: PropTypes.oneOf(['tick', 'cross', 'line']),
  id: PropTypes.string.isRequired,
  inputType: PropTypes.oneOf(['checkbox', 'radio']).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

const defaultProps = {
  checkboxIconType: 'tick',
};

const InputSelection = (props) => {
  const { checked, children, checkboxIconType, id, inputType, name, onChange, value } = props;
  const cn = bem({ prefix: 'cmc-', block: 'input-selection' });
  return (
    <div className={cn()}>
      <input
        checked={checked}
        className={cn('input', inputType === 'checkbox' ? checkboxIconType : '')}
        id={id}
        name={name}
        onChange={onChange}
        type={inputType}
        value={value}
      />
      <label htmlFor={id} className={cn('label')}>
        <div className={cn('text-container')}>{children}</div>
      </label>
    </div>
  );
};

InputSelection.defaultProps = defaultProps;
InputSelection.propTypes = propTypes;
export default InputSelection;
