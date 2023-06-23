import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import bem from '@argos/utils/esnext/bem';
import './Popover.scss';

const cn = bem({ prefix: 'cmc-', block: 'popover' });
const modes = ['auto', 'right', 'bottom', 'left', 'top'];

class Popover extends React.Component {
  constructor(props) {
    super(props);

    this.elementRef = createRef();
    this.contentRef = createRef();

    this.state = {
      isVisible: false,
      mode: this.props.mode,
      positionX: 0,
      positionY: 0,
    };
  }

  componentDidMount() {
    const parentElement = this.getParentElement();
    parentElement.addEventListener('mouseover', this.handleParentMouseOver);
    parentElement.addEventListener('mouseout', this.handleParentMouseOut);
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props;
    if (oldProps.mode !== newProps.mode) {
      this.setState({ mode: newProps.mode });
    }
  }

  getParentElement = () => this.elementRef.current.parentElement;

  handleParentMouseOver = () => {
    this.setPopoverPosition();
    this.setState({ isVisible: true });
  };

  handleParentMouseOut = () => this.setState({ isVisible: false });

  setPopoverPosition = () => {
    const parentDimentions = this.getParentElement().getBoundingClientRect();
    const parentX = parentDimentions.x;
    const parentY = parentDimentions.y;
    const parentW = parentDimentions.width;
    const parentH = parentDimentions.height;
    const popoverContent = this.contentRef.current;
    const contentW = popoverContent.offsetWidth;
    const contentH = popoverContent.offsetHeight;

    if (this.props.mode === 'auto') {
      if (contentW < window.innerWidth - parentX - parentW) {
        this.setState({ mode: 'right' });
      } else if (contentW < parentX) {
        this.setState({ mode: 'left' });
      } else if (contentH < parentY) {
        this.setState({ mode: 'top' });
      } else if (contentH < window.innerHeight - parentY - parentH) {
        this.setState({ mode: 'bottom' });
      }
    }

    switch (this.state.mode) {
      case 'right':
        this.setState({
          positionX: parentX + parentW,
          positionY: parentY + parentH / 2,
        });
        break;

      case 'top':
        this.setState({
          positionX: parentX + parentW / 2,
          positionY: parentY,
        });
        break;

      case 'bottom':
        this.setState({
          positionX: parentX + parentW / 2,
          positionY: parentY + parentH,
        });
        break;

      default:
        this.setState({
          positionX: parentX,
          positionY: parentY + parentH / 2,
        });
        break;
    }
  };

  render() {
    const { isVisible, mode, positionX, positionY } = this.state;
    const { children } = this.props;

    return (
      <div
        className={cn(null, isVisible ? `${mode}` : 'hidden')}
        style={{ left: `${positionX}px`, top: `${positionY}px` }}
        ref={this.elementRef}>
        <div className={cn('content', mode)} ref={this.contentRef}>
          {children}
        </div>
        <div className={cn('arrow', mode)} />
      </div>
    );
  }
}

Popover.propTypes = {
  mode: PropTypes.oneOf(modes),
};

Popover.defaultProps = {
  mode: 'right',
};

export default Popover;
