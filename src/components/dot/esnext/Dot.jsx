import React from 'react';
import PropTypes from 'prop-types';
import bem from '@argos/utils/esnext/bem';
import './Dot.scss';

const cn = bem({ prefix: 'cmc-', block: 'dot' });

const Dot = ({ color, value }) => (
  <div className={cn(null, color)}>
    <span>{value}</span>
  </div>
);

Dot.propTypes = {
  color: PropTypes.oneOf([undefined, 'white', 'red', 'yellow', 'blue', 'black', 'grey']),
  value: PropTypes.string,
};

Dot.defaultProps = {
  color: 'black',
};

export default Dot;
