import React from 'react';
import PropTypes from 'prop-types';
import Card from '@cmc/card/esnext/card';

const propTypes = {
  indx: PropTypes.number,
  cardData: PropTypes.instanceOf(Object).isRequired,
  allowMultipleOpen: PropTypes.bool,
  isExpanded: PropTypes.bool,
  onCardClick: PropTypes.func,
};

const defaultProps = {
  isExpanded: false,
};

class AccordionCard extends React.Component {
  constructor(props) {
    super(props);
    const { cardData, isExpanded } = props;
    this.state = {
      isExpanded,
      isLoading: false,
      content: cardData.body || (cardData.error && <div className='error'>{cardData.error}</div>),
    };
  }

  handleClick = () => {
    const { allowMultipleOpen, onCardClick, cardData } = this.props;
    this.setState(
      (currState) => ({ isExpanded: allowMultipleOpen && !currState.isExpanded }),
      () => {
        onCardClick(cardData.id, this.shouldLoadcontent());
      },
    );
  };

  shouldLoadcontent = () => {
    const { allowMultipleOpen } = this.props;
    const { content, isExpanded } = this.state;
    return allowMultipleOpen ? !content && isExpanded && true : !content && !this.props.isExpanded && true;
  };

  componentDidUpdate(oldProps) {
    const newProps = this.props;
    oldProps.isExpanded !== newProps.isExpanded && this.setState({ isExpanded: newProps.isExpanded });
  }

  render() {
    const { cardData } = this.props;
    const { isExpanded, content } = this.state;
    const accordionIcon = { icon: isExpanded ? 'expand_less' : 'expand_more', tooltip: '' };
    return (
      <React.Fragment>
        <Card
          isLoading={!content && isExpanded}
          title1={cardData.header.title1}
          title2={cardData.header.title2}
          title3={cardData.header.title3}
          icon={cardData.header.icon}
          isExpanded={isExpanded}
          rightIcons={cardData.header.actions ? [...cardData.header.actions, accordionIcon] : [accordionIcon]}
          onToggle={this.handleClick}>
          {content}
        </Card>
      </React.Fragment>
    );
  }
}

AccordionCard.propTypes = propTypes;
AccordionCard.defaultProps = defaultProps;
export default AccordionCard;
