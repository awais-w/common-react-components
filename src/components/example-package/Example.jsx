import React from 'react';
import PropTypes from 'prop-types';
import './Example.scss';
import { bem } from '@argos/utils';

const cn = bem({ prefix: 'cmc-', block: 'example' });

const propTypes = {
  text: PropTypes.string.isRequired,
  isExtraTextDisplayed: PropTypes.bool,
  onClick: PropTypes.func,
};

const defaultProps = {
  onClick: null,
  isExtraTextDisplayed: false,
};

const Example = ({ text, onClick, isExtraTextDisplayed }) => (
  <div className={cn()}>
    <div className={cn('clickable')} onClick={onClick}>
      <h1>{text}</h1>
    </div>
    {isExtraTextDisplayed && <h2 className={cn('extra-text')}>This is the extra text</h2>}
    <div className={cn('standard-text')}>
      <span>This is standard text</span>
    </div>
    <div className={cn('bold-text')}>
      <span>This is bold text</span>
    </div>
  </div>
);

Example.propTypes = propTypes;
Example.defaultProps = defaultProps;
export default Example;
