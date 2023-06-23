import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Portal = ({ children, nodeSelector }) => {
  try {
    return ReactDOM.createPortal(children, document.querySelector(nodeSelector));
  } catch (error) {
    console.error(`Could not find a matching node for specified node selector. The element is rendered at the body.`);
    return ReactDOM.createPortal(children, document.querySelector('body'));
  }
};

Portal.propTypes = {
  children: PropTypes.any,
  nodeSelector: PropTypes.string,
};

Portal.defaultProps = {
  nodeSelector: 'body',
};

export default Portal;
