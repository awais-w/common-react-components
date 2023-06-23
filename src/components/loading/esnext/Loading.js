import React from 'react';
import PropTypes from 'prop-types';
import './Loading.scss';

/**
 * This component displays a simple loading animation
 *
 * @param height height of the component container
 * @param size alter size of the spinner with either sm, md, lg - defaults to lg. For more info: https://www.argos.co.uk/cdn/argos-style/b1.10.06/elements.html#loader
 * @param fullScreen makes the loading component fullscreen
 * @param relativePosition makes component positioning inline
 *
 * @example
 * <Loading
 *    height={200}
 * />
 */
const Loading = (props) => {
  const { height, size, fullScreen, relativePosition, text } = props;
  const sizeClass = size ? `loader-svg-${size}` : '';
  const relativePositionClass = relativePosition ? 'loader-relative' : '';

  return (
    <div role='alert' className={`loading-spinner ${fullScreen ? 'loader-container' : ''}`} style={{ height }}>
      <div className={`loader-svg ${sizeClass} ${relativePositionClass}`}>
        <p className='loader-text'>{text}</p>
        <svg className='circular' viewBox='25 25 50 50'>
          <circle className='path' cx='50' cy='50' r='20' fill='none' />
        </svg>
      </div>
    </div>
  );
};

Loading.propTypes = {
  height: PropTypes.number,
  size: PropTypes.string,
  text: PropTypes.string,
  fullScreen: PropTypes.bool.isRequired,
  relativePosition: PropTypes.bool,
};

Loading.defaultProps = {
  fullScreen: true,
};

export default Loading;
