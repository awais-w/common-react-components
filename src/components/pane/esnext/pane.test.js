import React from 'react';
import { shallow } from 'enzyme';
import Icon from '@cmc/icon/esnext/Icon';
import Skeleton from 'react-loading-skeleton';
import Pane from './pane';

const defaultProps = {
  title1: 'Title 1',
  title2: 'Title 2',
  title3: 'Title 3',
  title4: 'Title 4',
  icon: { name: 'local_shipping', isCustom: false },
  isLoading: false,
  collapsed: false,
};

const setup = ({ props }) => {
  const component = shallow(<Pane {...props} />);

  return {
    wrapper: component,
    getPane: () => component.find('.ac-pane'),
    getHeading: () => component.find('.ac-pane__header'),
    getTitleWrapper: () => component.find('.ac-pane__title'),
    getTitle1: () => component.find('.ac-pane__title1'),
    getTitle2: () => component.find('.ac-pane__title2'),
    getTitle3: () => component.find('.ac-pane__title3'),
    getTitle4: () => component.find('.ac-pane__title4'),
    getTitleRight: () => component.find('.ac-pane__title-right'),
    getIcon: () => component.find(Icon),
    getBody: () => component.find('.ac-pane__body'),
    getChildren: () => component.find('.child'),
    getLoading: () => component.find(Skeleton),
    getCollapsed: () => component.find('.ac-pane__body--collapsed'),
  };
};

describe('<Pane />', () => {
  describe('with default props', () => {
    const component = setup({ props: defaultProps });

    it('should match default snapshot', () => {
      expect(component.wrapper).toMatchSnapshot();
    });

    it('should render a <Pane /> wrapper', () => {
      expect(component.getPane().exists()).toBe(true);
    });

    it('should render a heading', () => {
      expect(component.getHeading().exists()).toBe(true);
    });

    it('should render a <H3 /> title wrapper', () => {
      expect(component.getTitleWrapper().exists()).toBe(true);
      expect(component.getTitleWrapper().type()).toEqual('h3');
    });

    it('should render title1', () => {
      expect(component.getTitle1().exists()).toBe(true);
    });

    it('should render title2', () => {
      expect(component.getTitle2().exists()).toBe(true);
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

    describe('with a title4 prop', () => {
      const title4 = 'gumbo';
      const component = setup({ props: { ...defaultProps, title4 } });

      it('should render a title4', () => {
        expect(component.getTitle4().exists()).toBe(true);
      });
    });

    describe('with icon prop', () => {
      const component = setup({ props: { ...defaultProps } });

      it('should render an icon', () => {
        expect(component.getIcon().exists()).toBe(true);
      });
    });

    describe('with a titleRight prop', () => {
      const titleRight = 'wumbo';
      const component = setup({ props: { ...defaultProps, titleRight } });

      it('should render a titleRight', () => {
        expect(component.getTitleRight().exists()).toBe(true);
      });
    });

    describe('collapsed', () => {
      const component = setup({ props: { ...defaultProps, collapsed: true } });

      it('should be collapsed if collapsed is true', () => {
        expect(component.getCollapsed().exists()).toBeTruthy();
      });

      it('should have body not clickable if its not collapsed', () => {
        component.wrapper.setProps({ ...defaultProps, collapsed: false });
        expect(typeof component.getBody().props().onClick === 'function').toBeFalsy();
      });

      it('should toggle on header click', () => {
        component.getHeading().props().onClick();
        expect(component.getCollapsed().exists()).toBeTruthy();
      });

      it('should toggle on body click when its in collapsed state', () => {
        component.getBody().props().onClick();
        expect(component.getCollapsed().exists()).toBeFalsy();
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

      it('should render skeleton loading if isLoading is true', () => {
        const component = setup({ props: { ...defaultProps, children, isLoading: true } });
        expect(component.getChildren().length).toEqual(0);
        expect(component.getLoading().exists()).toBeTruthy();
      });
      it('should render children props', () => {
        const component = setup({ props: { ...defaultProps, children } });
        expect(component.getBody().exists()).toBe(true);
        expect(component.getChildren().length).toEqual(3);
      });
    });
  });
});
