import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import bem from '@argos/utils/esnext/bem';
import Button from '@cmc/cha-button/esnext/Button';
import AccordionCard from './accordionCard';
import './accordion.scss';

const cn = bem({ prefix: 'ac-', block: 'accordion' });

const propTypes = {
  accordionData: PropTypes.array.isRequired,
  allowMultipleOpen: PropTypes.bool,
  moreAvailable: PropTypes.bool,
  onCardClick: PropTypes.func,
  requestMore: PropTypes.func,
};

class Accordion extends React.Component {
  state = {
    activeCard: 0,
  };

  handleCardClick = (id, loadContent) => {
    !this.props.allowMultipleOpen &&
      this.setState((currState) => ({ activeCard: currState.activeCard === id ? 0 : id }));
    loadContent && this.props.onCardClick(id);
  };

  requestMoreResults = () => {
    this.props.requestMore(true);
  };

  render() {
    const { accordionData, allowMultipleOpen, moreAvailable } = this.props;
    const { activeCard } = this.state;
    return (
      <div className={cn()}>
        {accordionData &&
          accordionData.map((card) => (
            <AccordionCard
              key={uuid.v4()}
              cardData={card}
              allowMultipleOpen={allowMultipleOpen}
              isExpanded={activeCard === card.id}
              onCardClick={this.handleCardClick}
            />
          ))}
        {moreAvailable && (
          <Button
            text='Load More'
            icon='playlist_add'
            isShort
            isSecondary
            buttonWidth='containerFit'
            onClick={this.requestMoreResults}
          />
        )}
      </div>
    );
  }
}

Accordion.propTypes = propTypes;
export default Accordion;
