import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bem from '@argos/utils/esnext/bem';
import uuid from 'uuid';
import './toggle.scss';

const cn = bem({ prefix: 'cmc-', block: 'toggle' });

const propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  selected: PropTypes.oneOf([true, false, '']),
  onSelect: PropTypes.func.isRequired,
  text: PropTypes.string,
  yes: PropTypes.string,
  no: PropTypes.string,
};

class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.selected !== '' ? `${this.props.selected}active` : '',
      id: uuid.v4(),
    };
  }

  componentDidUpdate(prevProps) {
    const { disabled, selected } = this.props;

    if (!disabled && prevProps.selected !== selected && selected !== '') {
      this.setActive(selected);
    }
  }

  setActive = (value) => {
    this.setState({ active: `${value}active` });
  };

  handleClick = (value) => {
    const { disabled, onSelect } = this.props;

    if (!disabled) {
      this.setActive(value);
      onSelect(value);
    }
  };

  render() {
    const { active, id } = this.state;
    const { disabled, text, yes, no } = this.props;

    return (
      <div className={cn()} id={id}>
        {text && <span className={cn('label')}>{text}</span>}
        <div className={`buttons ${active} ${disabled ? 'disabled' : ''}`}>
          <button className={`toggle__button true`} value={true} onClick={() => this.handleClick(true)}>
            {yes}
          </button>
          <button className={`toggle__button false`} value={false} onClick={() => this.handleClick(false)}>
            {no}
          </button>
        </div>
      </div>
    );
  }
}

Toggle.defaultProps = {
  selected: '',
  yes: 'YES',
  no: 'NO',
};

Toggle.propTypes = propTypes;
export default Toggle;
