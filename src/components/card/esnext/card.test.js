import React from 'react';
import { shallow } from 'enzyme';
import IconLabelValue from '@cmc/icon-label-value/esnext';
import { stub } from 'sinon';
import Skeleton from 'react-loading-skeleton';
import Card from './card';

const defaultProps = {
  title1: 'Title 1',
  title2: 'Title 2',
  status: 'DELIVERED',
  isExpanded: false,
};

const setup = ({ props }) => {
  const component = shallow(<Card {...props} />);

  return {
    wrapper: component,
    getCard: () => component.find('.ac-panel'),
    getHeading: () => component.find('.ac-panel__header'),
    getTitleWrapper: () => component.find('.ac-panel__title'),
    getTitle1: () => component.find('.ac-panel__title1'),
    getTitle2: () => component.find('.ac-panel__title2'),
    getTitle3: () => component.find('.ac-panel__title3'),
    getExpandClass: () => component.find('.expandable-panel'),
    getClickClass: () => component.find('.clickable-panel'),
    getIcon: () => component.find('.material-icons'),
    getRightIcons: () => component.find('ac-panel__header-right').find(IconLabelValue),
    getSummary: () => component.find('.ac-panel__summary'),
    getBody: () => component.find('.ac-panel__body'),
    getChildren: () => component.find('.child'),
    getActionsWrapper: () => component.find('.ac-panel__actions'),
    getActionsIcon: () => component.find('.ac-panel__actions-icon'),
    getActionsMenu: () => component.find('.ac-panel__actions-menu'),
    getMenuState: () => component.state('isMenuOpen'),
    getSkeleton: () => component.find(Skeleton),
  };
};

describe('<Card />', () => {
  describe('with default props', () => {
    const component = setup({ props: defaultProps });

    it('should match default snapshot', () => {
      expect(component.wrapper).toMatchSnapshot();
    });

    it('should render a <Card /> wrapper', () => {
      expect(component.getCard().exists()).toBe(true);
    });

    it('should render a heading', () => {
      expect(component.getHeading().exists()).toBe(true);
    });

    it('should render a <H2 /> title wrapper', () => {
      expect(component.getTitleWrapper().exists()).toBe(true);
      expect(component.getTitleWrapper().type()).toEqual('h3');
    });

    it('should render title1', () => {
      expect(component.getTitle1().exists()).toBe(true);
    });

    it('should render title2', () => {
      expect(component.getTitle2().exists()).toBe(true);
    });

    it('should not be expandable', () => {
      expect(component.getExpandClass().exists()).toBe(false);
    });

    it('should not be clickable', () => {
      expect(component.getClickClass().exists()).toBe(false);
    });
  });

  describe('with custom props', () => {
    describe('with a title3 prop', () => {
      const title3 = 'wumbo';
      const component = setup({ props: { ...defaultProps, title3 } });

      it('should render a title3', () => {
        expect(component.getTitle3().exists()).toBe(true);
      });
    });

    describe('with icon prop', () => {
      const icon = 'wumbo';
      const component = setup({ props: { ...defaultProps, icon } });

      it('should render an icon', () => {
        expect(component.getIcon().exists()).toBe(true);
      });
    });

    describe('with icons on the right side', () => {
      const rightIcons = [
        { icon: 'gabriel', label: 'icon1 label', tooltip: 'Hello', className: 'classy', onClick: stub },
        { icon: 'awais', label: 'icon2 label', tooltip: 'World', className: 'superClassy', onClick: stub },
      ];
      const component = setup({ props: { rightIcons } });
      it('should render as many icons as passed', () => {
        component.getRightIcons().forEach((iconFound, index) => {
          expect(iconFound.prop('icon')).toBe(rightIcons[index].icon);
          expect(iconFound.prop('label')).toBe(rightIcons[index].label);
          expect(iconFound.prop('tooltipValue')).toBe(rightIcons[index].tooltip);
          expect(iconFound.prop('className')).toBe(rightIcons[index].className);
          expect(iconFound.prop('onClick')).toBe(rightIcons[index].onClick);
        });
      });
    });

    describe('with summary prop', () => {
      const summary = 'I am a summary';

      describe('when <Card /> is not expanded', () => {
        const component = setup({ props: { ...defaultProps, summary } });

        it('should render a summary', () => {
          expect(component.getSummary().exists()).toBe(true);
          expect(component.getSummary().text()).toEqual(summary);
        });
      });

      describe('when <Card /> is expanded', () => {
        const isExpanded = true;
        const component = setup({ props: { ...defaultProps, summary, isExpanded } });

        it('should not render a summary', () => {
          expect(component.getSummary().exists()).toBe(false);
        });
      });
    });

    describe('with children', () => {
      const children = [
        <div key='1' className='child'>
          Child 1
        </div>,
        <div key='2' className='child'>
          Child 2
        </div>,
        <div key='3' className='child'>
          Child 3
        </div>,
      ];

      describe('when <Card /> is not expanded', () => {
        const component = setup({ props: { ...defaultProps, children } });

        it('should not render any children', () => {
          expect(component.getBody().exists()).toBe(false);
        });
      });

      describe('when <Card /> is expanded', () => {
        const isExpanded = true;
        const component = setup({ props: { ...defaultProps, children, isExpanded } });

        it('should render children props', () => {
          expect(component.getBody().exists()).toBe(true);
          expect(component.getChildren().length).toEqual(3);
        });
      });
    });

    describe('with isAsyncBody prop', () => {
      const isAsyncBody = true;
      const component = setup({ props: { ...defaultProps, isAsyncBody } });

      it('should be expandable', () => {
        expect(component.getExpandClass().exists()).toBe(true);
      });
    });

    describe('with actions prop', () => {
      const onToggle = jest.fn();
      const actions = (
        <div>
          <div key='1' className='cmc-panel__actions-item'>
            Action 1
          </div>
          ,
          <div key='2' className='cmc-panel__actions-item'>
            Action 2
          </div>
          ,
          <div key='3' className='cmc-panel__actions-item'>
            Action 3
          </div>
          ,
        </div>
      );

      const component = setup({ props: { ...defaultProps, actions, onToggle } });

      it('should render an actions wrapper', () => {
        expect(component.getActionsWrapper().exists()).toBe(true);
      });

      it('should render an actions icon', () => {
        expect(component.getActionsIcon().exists()).toBe(true);
      });

      it('should render an actions menu', () => {
        expect(component.getActionsMenu().exists()).toBe(true);
      });

      it('should not have an open menu', () => {
        expect(component.getMenuState()).toBe(false);
      });

      describe('when actions menu is clicked', () => {
        it('should have an open menu', () => {
          component.getActionsWrapper().simulate('click', {
            preventDefault: () => {},
            stopPropagation: () => {},
          });
          expect(component.getMenuState()).toBe(true);
        });
      });
    });
  });

  describe('when <Card /> heading is clicked', () => {
    const onToggle = jest.fn();
    const children = [
      <div key='1' className='child'>
        Child 1
      </div>,
      <div key='2' className='child'>
        Child 2
      </div>,
      <div key='3' className='child'>
        Child 3
      </div>,
    ];

    const component = setup({ props: { ...defaultProps, children, onToggle } });

    it('should call the onToggle function prop', () => {
      component.getHeading().simulate('click');
      expect(onToggle).toBeCalled();
    });
  });

  describe('when isLoading', () => {
    const component = setup({ props: defaultProps });
    it('renders a skeleton', () => {
      component.wrapper.setProps({ isLoading: true });
      expect(component.getSkeleton().exists()).toBeTruthy();
    });
  });
});
