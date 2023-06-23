import React from 'react';
import { shallow } from 'enzyme';
import Icon from '@cmc/icon/esnext/Icon';
import NavItem from './NavItem';

const defaultProps = {
  handleClick: jest.fn(),
  icon: 'favorite',
  title: 'My Title',
  summary: 'My Summary',
  shortSummary: '£XX.xx',
  isActive: false,
  isComplete: false,
  minimizeNav: false,
  currIndex: 0,
};

const setup = ({ props }) => {
  const component = shallow(<NavItem {...props} />);
  return {
    wrapper: component,
    getStepTitleContainer: () => component.find('.cmc-nav-item__title'),
    getCompleteNavItem: () => component.find('.cmc-nav-item__complete'),
    getStepSummary: () => component.find('.cmc-nav-item__summary'),
    getStepSubtitle: () => component.find('.cmc-nav-item__subtitle'),
    getNavItemContainer: () => component.find('.cmc-nav-item'),
  };
};

describe('NavItem', () => {
  const component = setup({ props: defaultProps });

  it('should match default snapshot', () => {
    expect(component.wrapper).toMatchSnapshot();
  });

  it('Always renders a title with the correct icon and text', () => {
    component.wrapper.setProps({ minimizeNav: true });
    expect(component.wrapper.find(Icon)).toExist();
    component.wrapper.setProps({ minimizeNav: false });
    expect(component.getStepTitleContainer().text()).toBe(`<Icon />${defaultProps.title}`);
  });

  describe('prop : isComplete', () => {
    it('Renders a ticked checkbox when true', () => {
      expect(component.getCompleteNavItem().exists()).toBe(false);
      component.wrapper.setProps({ isComplete: true });
      expect(component.getCompleteNavItem().exists()).toBe(true);
    });

    it('Renders a summary/shortSummary with the correct text when true', () => {
      component.wrapper.setProps({ isComplete: false });
      expect(component.getStepSummary().exists()).toBe(false);
      component.wrapper.setProps({ minimizeNav: true, isComplete: true, shortSummary: '£00.00' });
      let summaryNode = component.getStepSummary();
      expect(summaryNode.text()).toBe('£00.00');
      component.wrapper.setProps({ minimizeNav: false, summary: '...' });
      summaryNode = component.getStepSummary();
      expect(summaryNode.text()).toBe('...');
    });
  });

  describe('prop : isActive', () => {
    it('Renders a subTitle with the correct text when true', () => {
      expect(component.getStepSubtitle().exists()).toBe(false);
      component.wrapper.setProps({ isActive: true, subTitle: '...' });
      const summaryNode = component.getStepSubtitle();
      expect(summaryNode.text()).toBe('...');
    });
  });

  describe('prop : onClick', () => {
    it('Calls handler when clicked', () => {
      component.getNavItemContainer().simulate('click');
      expect(defaultProps.handleClick).toBeCalled();
    });
  });

  describe('prop : summaryStyle', () => {
    describe('after-completion', () => {
      it('Renders summary with correct text when isComplete', () => {
        component.wrapper.setProps({ isActive: true, summaryStyle: 'after-completion', isComplete: true });
        expect(component.getStepSummary().text()).toBe('...');
      });
      it('Does not render summary when NOT isComplete', () => {
        component.wrapper.setProps({ isActive: true, summaryStyle: 'after-completion', isComplete: false });
        expect(component.getStepSummary().exists()).toBe(false);
      });
    });
    describe('hide', () => {
      it('Does not render summary when isComplete', () => {
        component.wrapper.setProps({ isActive: true, summaryStyle: 'hide', isComplete: true });
        expect(component.getStepSummary().exists()).toBe(false);
      });
      it('Does not render summary when NOT isComplete', () => {
        component.wrapper.setProps({ isActive: true, summaryStyle: 'hide', isComplete: false });
        expect(component.getStepSummary().exists()).toBe(false);
      });
    });
    describe('real-time', () => {
      it('Renders summary with correct text when isComplete', () => {
        component.wrapper.setProps({ isActive: true, summaryStyle: 'real-time', isComplete: true });
        expect(component.getStepSummary().text()).toBe('...');
      });
      it('Renders summary with correct text when NOT isComplete', () => {
        component.wrapper.setProps({ isActive: true, summaryStyle: 'real-time', isComplete: false });
        expect(component.getStepSummary().text()).toBe('...');
      });
    });
  });
});
