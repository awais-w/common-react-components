import React from 'react';
import PropTypes from 'prop-types';
import IconLabelValue from '@cmc/icon-label-value/esnext/IconLabelValue';
import bem from '@argos/utils/esnext/bem';
import './Button.scss';

const cn = bem({ prefix: 'cmc-', block: 'button' });

const iconModes = ['left', 'right', 'splitLeft', 'splitRight'];
const buttonWidths = ['default', 'half', 'contentFit', 'containerFit'];

const propTypes = {
  text: PropTypes.string,
  loadingText: PropTypes.string,
  icon: PropTypes.string,
  iconMode: PropTypes.oneOf(iconModes),
  buttonWidth: PropTypes.oneOf(buttonWidths),
  name: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  isSecondary: PropTypes.bool,
  isShort: PropTypes.bool,
};

const defaultProps = {
  text: '',
  loadingText: '',
  icon: '',
  iconMode: 'left',
  buttonWidth: 'default',
  type: 'button',
  onClick: null,
  isDisabled: false,
  isLoading: false,
  isSecondary: false,
  isShort: false,
};

const Button = ({
  name,
  value,
  onClick,
  isSecondary,
  type,
  isDisabled,
  isShort,
  buttonWidth,
  icon,
  iconMode,
  isLoading,
  text,
  loadingText,
  noDiv,
}) => {
  const loadingIcon = loadingText ? (
    <React.Fragment>
      <div className={cn('loading', 'withLabel')} />
      <IconLabelValue icon={iconMode === 'left' && icon} label={loadingText} isInline={true} />
    </React.Fragment>
  ) : (
    <div className={cn('loading')} />
  );

  const buttonContent = <IconLabelValue icon={icon} label={text} />;

  const buttonClassName = cn(
    null,
    null,
    `button ${isSecondary ? 'button--secondary' : ''}
      ${isShort ? 'button--short' : ''}
      ${cn('icon', iconMode)}
      ${buttonWidth ? `button--${buttonWidth}` : ''}`,
  );

  const btn = (
    <React.Fragment>
      <button
        /*
         * NOTE: Classes added are inherited from Bolt and are not BEM modifiers of cmc-button component hence they are
         * not put in the modifier section of the cn() function.
         */
        className={buttonClassName}
        onClick={onClick}
        name={name}
        value={value}
        type={type}
        disabled={isDisabled}>
        {isLoading ? loadingIcon : buttonContent}
      </button>
    </React.Fragment>
  );
  return noDiv ? btn : <div>{btn}</div>;
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
export default Button;
