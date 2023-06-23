import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@cmc/icon/esnext/Icon';
import bem from '@argos/utils/esnext/bem';
import './Textfield.scss';

const cn = bem({ prefix: 'cmc-', block: 'textfield' });

const propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  rightIcon: PropTypes.shape({
    isCustom: PropTypes.bool,
    icon: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
  }),
  errorMessage: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  isDisabled: PropTypes.bool,
  isMandatory: PropTypes.bool,
  isShort: PropTypes.bool,
  applied: PropTypes.bool,
};

const defaultProps = {
  errorMessage: '',
  isDisabled: false,
  name: '',
  isMandatory: false,
};

class Textfield extends React.Component {
  render() {
    const {
      label,
      id,
      errorMessage,
      value,
      handleChange,
      handleBlur,
      isDisabled,
      placeholder,
      name,
      isMandatory,
      isShort,
      rightIcon,
      applied,
    } = this.props;

    return (
      <div
        className={cn(null, null, {
          'form-group': true,
          'has-error': errorMessage,
          'is-disabled': isDisabled,
          applied,
        })}>
        {label && (
          <label className={cn('label')} htmlFor={`textfield-${id}`}>
            {label}
            {isMandatory && ' *'}
          </label>
        )}
        <div className={cn('form-validation')}>
          <input
            type='text'
            className={cn('input', isShort && 'short', `form-control ${rightIcon && 'has-right-icon'}`)}
            id={`Textfield-${id}`}
            onChange={handleChange}
            onBlur={handleBlur}
            name={name}
            value={value}
            placeholder={placeholder}
            disabled={isDisabled}
          />
          {rightIcon && (
            <Icon
              icon={rightIcon.icon}
              color={rightIcon.color}
              isCustom={rightIcon.isCustom}
              onClick={rightIcon.onClick}
              disabled={rightIcon.disabled}
            />
          )}
        </div>
        {errorMessage && (
          <label htmlFor={`Textfield-${id}`} className={cn('help-block')}>
            {errorMessage}
          </label>
        )}
      </div>
    );
  }
}

Textfield.propTypes = propTypes;
Textfield.defaultProps = defaultProps;
export default Textfield;
