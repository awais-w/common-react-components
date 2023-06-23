import React from 'react';
import PropTypes from 'prop-types';
import bem from '@argos/utils/esnext/bem';
import Button from '@cmc/cha-button/esnext/Button';
import Icon from '@cmc/icon/esnext/Icon';
import Loading from '@cmc/loading/esnext/Loading';
import Portal from '@cmc/portal/esnext/Portal';
import './Modal.scss';

const propTypes = {
  onClose: PropTypes.func,
  parentSelector: PropTypes.string,
  primaryButton: PropTypes.shape({
    handleClick: PropTypes.func,
    isDisabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    text: PropTypes.string,
  }),
  secondaryButton: PropTypes.shape({
    handleClick: PropTypes.func,
    isDisabled: PropTypes.bool,
    text: PropTypes.string,
  }),
  children: PropTypes.node,
  title: PropTypes.string,
  isLoading: PropTypes.bool,
  width: PropTypes.string,
  minWidth: PropTypes.string,
  height: PropTypes.string,
  minHeight: PropTypes.string,
};

const cn = bem({ prefix: 'cmc-', block: 'modal' });

const Modal = ({
  onClose,
  title,
  children,
  primaryButton,
  secondaryButton,
  isLoading,
  parentSelector,
  width,
  minWidth,
  height,
  minHeight,
  classes,
}) => {
  const shouldShowHeader = !isLoading && (onClose || title);

  const shouldShowFooter = !isLoading && (secondaryButton || primaryButton);

  return (
    <Portal nodeSelector={parentSelector}>
      <div className={cn(null, null, classes)}>
        <div className={cn('container')} style={{ minWidth, width, minHeight, height }}>
          {shouldShowHeader && (
            <div className={cn('container-header')}>
              {onClose && <Icon id={'close'} icon='close' onClick={onClose} />}
              {title && <h1>{title}</h1>}
            </div>
          )}
          <div className={cn('container-content')}>
            {isLoading ? <Loading fullScreen={false} height={200} /> : children}
          </div>
          {shouldShowFooter && (
            <div className={cn('container-footer')}>
              {secondaryButton && (
                <div className={cn('container-footer-button')}>
                  <Button
                    text={secondaryButton.text}
                    onClick={secondaryButton.handleClick}
                    isDisabled={secondaryButton.isDisabled}
                    buttonWidth='half'
                    isSecondary
                    isShort
                  />
                </div>
              )}
              {primaryButton && (
                <div className={cn('container-footer-button')}>
                  <Button
                    text={primaryButton.text}
                    loadingText={primaryButton.loadingText}
                    onClick={primaryButton.handleClick}
                    buttonWidth='half'
                    isDisabled={primaryButton.isDisabled}
                    isLoading={primaryButton.isLoading}
                    isShort
                  />
                </div>
              )}
            </div>
          )}
        </div>
        <div className={cn('outside')} />
      </div>
    </Portal>
  );
};

Modal.propTypes = propTypes;
export default Modal;
