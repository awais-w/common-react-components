import React from 'react';
import PropTypes from 'prop-types';
import bem from '@argos/utils/esnext/bem';
import Icon from '@cmc/icon/esnext/Icon';
import Skeleton from 'react-loading-skeleton';
import './pane.scss';

const cn = bem({ prefix: 'ac-', block: 'pane' });

const propTypes = {
  title1: PropTypes.string,
  title2: PropTypes.string,
  title3: PropTypes.string,
  title4: PropTypes.string,
  icon: PropTypes.shape({
    name: PropTypes.string,
    isCustom: PropTypes.bool,
  }),
  titleRight: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  collapsed: PropTypes.bool,
  isLoading: PropTypes.bool,
};

class Pane extends React.Component {
  state = {
    isCollapsed: this.props.collapsed,
  };

  componentDidUpdate(nextProps) {
    const { collapsed } = this.props;
    if (nextProps.collapsed !== collapsed) {
      this.setState({ isCollapsed: collapsed });
    }
  }

  render() {
    const { children, title1, title2, title3, title4, titleRight, icon, isLoading } = this.props;
    const { isCollapsed } = this.state;

    const content = isCollapsed ? <Icon icon='more_horiz' color='blue' /> : children;

    const onToggle = () => {
      this.setState((currState) => ({
        isCollapsed: !currState.isCollapsed,
      }));
    };

    return (
      <section className={cn(null, `wrapper `)}>
        <div className={cn('header', null)} onClick={onToggle}>
          <div className={cn('header-wrapper')}>
            {icon && <Icon icon={icon.name} isCustom={icon.isCustom} />}
            <h3 className={cn('title', null, 'h3')}>
              <span className={cn('title1', null, `title-item`)}>{title1}</span>
              {title2 && <span className={cn('title2', null, `title-item`)}>{title2}</span>}
              {title3 && <span className={cn('title3', null, `title-item`)}>{title3}</span>}
              {title4 && <span className={cn('title4', null, `title-item`)}>{title4}</span>}
            </h3>
            {titleRight && <span className={cn('title-right', null)}>{titleRight}</span>}
          </div>
        </div>

        <div
          className={cn('body', [isLoading && 'loading', isCollapsed && 'collapsed'])}
          onClick={isCollapsed ? onToggle : null}>
          {isLoading ? <Skeleton count='2' /> : content}
        </div>
      </section>
    );
  }
}

Pane.propTypes = propTypes;
export default Pane;
