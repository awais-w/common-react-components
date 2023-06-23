import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import bem from '@argos/utils/esnext/bem';
import isEmpty from '@cmc/utils/esnext/isEmpty';
import IconLabelValue from '@cmc/icon-label-value/esnext/IconLabelValue';
import Icon from '@cmc/icon/esnext/Icon';
import './panel.scss';
import './card.scss';
import Skeleton from 'react-loading-skeleton';

const cn = bem({ prefix: 'ac-', block: 'panel' });

const panelTypes = ['panel-collapsed', 'panel-expanded', 'panel-highlighted', 'panel-default', 'panel-notify'];

const statusIcons = {
  OTHER: { value: 'announcement', isCustom: false },
  CREATED: { value: 'icon-created', isCustom: true },
  CANCELLED: { value: 'clear', isCustom: false },
  COLLECTED: { value: 'icon-collected', isCustom: true },
  MIXED: { value: 'shuffle', isCustom: false },
  IN_PROGRESS: { value: 'icon-in-progress', isCustom: true },
  IN_TRANSIT: { value: 'icon-in-transit', isCustom: true },
  READY_TO_COLLECT: { value: 'icon-ready-to-collect', isCustom: true },
  FAILED: { value: 'report_problem', isCustom: false },
  RETURN_IN_PROGRESS: { value: 'icon-return-in-progress', isCustom: true },
  RETURNED: { value: 'icon-returned', isCustom: true },
  RETURN_FAILED: { value: 'icon-return-failed', isCustom: true },
  DELIVERED: { value: 'icon-delivered', isCustom: true },
  REFUNDED: { value: 'icon-refunded', isCustom: true },
};

const panelStatuses = Object.keys(statusIcons);

const propTypes = {
  title1: PropTypes.string,
  title2: PropTypes.string,
  title3: PropTypes.string,
  icon: PropTypes.string,
  rightIcons: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      isCustom: PropTypes.bool,
      tooltip: PropTypes.string,
      label: PropTypes.string,
      className: PropTypes.string,
      onClick: PropTypes.func,
    }),
  ),
  hideStatusIcon: PropTypes.bool,
  summary: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  isExpanded: PropTypes.bool,
  isNested: PropTypes.bool,
  onToggle: PropTypes.func,
  isAsyncBody: PropTypes.bool,
  actions: PropTypes.element,
  status: PropTypes.oneOf(panelStatuses),
  panelType: PropTypes.oneOf(panelTypes),
  collapsedPanelType: PropTypes.oneOf(panelTypes),
};

const defaultProps = {
  isExpanded: false,
};

class Card extends React.Component {
  state = {
    isMenuOpen: false,
  };

  componentWillUnmount() {
    document.removeEventListener('click', this.handleMenuClick, false);
  }

  handleMenuClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (this.state.isMenuOpen) {
      document.removeEventListener('click', this.handleMenuClick, false);
    } else {
      document.addEventListener('click', this.handleMenuClick, false);
    }

    this.setState((currState) => ({
      isMenuOpen: !currState.isMenuOpen,
    }));
  };

  render() {
    const {
      children,
      title1,
      title2,
      title3,
      isExpanded,
      panelType,
      status,
      isAsyncBody,
      onToggle,
      summary,
      actions,
      icon,
      rightIcons,
      isNested,
      isLoading,
    } = this.props;

    const pType = isExpanded ? panelType || 'panel-expanded' : panelType || 'panel-collapsed';
    const nested = isNested ? 'nested-panel' : '';
    const panelStatus = (status && `status-${status.toLowerCase()}`) || '';

    const expandablePanel = children || isAsyncBody ? 'expandable-panel' : '';
    const actionClass = onToggle ? 'clickable-panel' : '';

    const actionsMenu = !isEmpty(actions) ? (
      <div className={cn('actions')} onClick={this.handleMenuClick}>
        <span className={cn('actions-icon')}>
          <IconLabelValue icon='more_horiz' color='grey' />
        </span>
        <div className={cn('actions-menu', `${this.state.isMenuOpen ? 'open' : ''}`)}>{this.props.actions}</div>
      </div>
    ) : null;

    const buildBody = () => {
      if (isLoading) {
        return (
          <div className={cn('body')}>
            <Skeleton height={24} />
          </div>
        );
      }
      if (isExpanded) {
        return children && <div className={cn('body')}>{children}</div>;
      }
      return summary && <div className={cn('summary')}>{summary}</div>;
    };

    return (
      <section className={cn(null, null, `panel ${pType} ${panelStatus} ${expandablePanel} ${nested}`)}>
        <div className={cn('header', null, `panel-heading ${actionClass}`)} onClick={onToggle}>
          <div className={cn('header-wrapper')}>
            <React.Fragment>
              {icon && icon !== 'warning'
                ? !isEmpty(icon) && (
                    <span className={cn('icon')}>
                      <i className='material-icons'>{icon}</i>
                    </span>
                  )
                : !isEmpty(status) && (
                    <span className={cn('icon')}>
                      <Icon
                        id={statusIcons[status].value}
                        icon={statusIcons[status].value}
                        isCustom={statusIcons[status].isCustom}
                      />
                    </span>
                  )}
              <h3 className={cn('title', null)}>
                <span className={cn('title1', null, `title-item`)}>{title1}</span>
                <span className={cn('title2', null, `title-item`)}>{title2}</span>
                {title3 && <span className={cn('title3', null, `title-item`)}>{title3}</span>}
              </h3>
            </React.Fragment>
          </div>
          {(rightIcons || actionsMenu || (icon && icon === 'warning')) && (
            <div className={cn('header-right')}>
              {icon && icon === 'warning' && <IconLabelValue icon='warning' color='red' />}
              {rightIcons &&
                rightIcons.map((rightIcon) => (
                  <IconLabelValue
                    key={uuid.v4()}
                    icon={rightIcon.icon}
                    isCustom={rightIcon.isCustom}
                    tooltipValue={rightIcon.tooltip}
                    label={rightIcon.label}
                    color={rightIcon.color}
                    onClick={rightIcon.onClick}
                    isInLine
                  />
                ))}
              {actionsMenu}
            </div>
          )}
        </div>

        {buildBody()}
      </section>
    );
  }
}

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;
export default Card;
