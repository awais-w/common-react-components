import React from 'react';
import PropTypes from 'prop-types';
import bem from '@argos/utils/esnext/bem';
import './Textarea.scss';

const cn = bem({ prefix: 'cmc-', block: 'textarea' });

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
  isMandatory: PropTypes.bool,
  rows: PropTypes.number,
  resizeDirection: PropTypes.oneOf(['both', 'horizontal', 'vertical', 'none']),
};

const defaultProps = {
  errorMessage: '',
  isDisabled: false,
  name: '',
  isMandatory: false,
  rows: 1,
};

class Textarea extends React.Component {
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
      rows,
      resizeDirection,
    } = this.props;

    return (
      <div
        className={cn(null, null, `form-group ${errorMessage ? 'has-error' : ''} ${isDisabled ? 'is-disabled' : ''}`)}>
        {label && (
          <label className={cn('label')} htmlFor={`select-${id}`}>
            {label}
            {isMandatory && ' *'}
          </label>
        )}
        <div className={cn('form-validation')}>
          <textarea
            name={name}
            placeholder={placeholder}
            className={cn(null, `resize-${resizeDirection}`, 'form-control')}
            id={`Textarea-${id}`}
            disabled={isDisabled}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={rows}
          />
        </div>
        {errorMessage && (
          <label htmlFor={`Select-${id}`} className={cn('help-block')}>
            {errorMessage}
          </label>
        )}
      </div>
    );
  }
}

Textarea.propTypes = propTypes;
Textarea.defaultProps = defaultProps;
export default Textarea;
