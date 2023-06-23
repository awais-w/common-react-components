import React from 'react';
import PropTypes from 'prop-types';
import bem from '@argos/utils/esnext/bem';
import { isEmpty } from '../../utils/esnext';
import './Select.scss';

const cn = bem({ prefix: 'cmc-', block: 'select' });

const propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  errorMessage: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  isDisabled: PropTypes.bool,
  isShort: PropTypes.bool,
  optionsWithValues: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      option: PropTypes.string.isRequired,
    }).isRequired,
  ),
  options: PropTypes.array,
  firstOptionEmpty: PropTypes.bool,
  isMandatory: PropTypes.bool,
};

const defaultProps = {
  errorMessage: '',
  isDisabled: false,
  firstOptionEmpty: true,
  name: '',
  isMandatory: false,
};

class Select extends React.Component {
  render() {
    const {
      label,
      id,
      errorMessage,
      value,
      handleChange,
      handleBlur,
      isDisabled,
      options,
      optionsWithValues,
      placeholder,
      name,
      isMandatory,
      firstOptionEmpty,
      isShort,
      applied,
    } = this.props;
    const isValid = isEmpty(errorMessage);
    const optionWithoutDuplication = Array.from(new Set(options));

    return (
      <div className={cn(null, null, { 'form-group': true, 'has-error': !isValid, applied })}>
        {label && (
          <label className={cn('label')} htmlFor={`select-${id}`}>
            {label}
            {isMandatory && ' *'}
          </label>
        )}
        <div className={cn('form-validation')}>
          <select
            className={cn('list', isShort && 'short', 'form-control')}
            id={`select-${id}`}
            name={name}
            onChange={handleChange}
            onBlur={handleBlur}
            value={value}
            disabled={isDisabled}>
            {firstOptionEmpty && (
              <option key='none' value=''>
                {placeholder || 'Select option'}
              </option>
            )}
            {optionsWithValues
              ? optionsWithValues.map((obj) => (
                  <option value={obj.value} key={obj.option}>
                    {obj.option}
                  </option>
                ))
              : optionWithoutDuplication.map((option) => <option key={option}>{option}</option>)}
          </select>
        </div>
        {!isValid && (
          <label htmlFor={`Select-${id}`} className={cn('help-block')}>
            {errorMessage}
          </label>
        )}
      </div>
    );
  }
}

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;
export default Select;
