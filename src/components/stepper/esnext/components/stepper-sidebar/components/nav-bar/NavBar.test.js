/* global jest, describe, it */

import React from 'react';
import { shallow } from 'enzyme';
import NavItem from './components/nav-item';
import NavBar from './NavBar';

const defaultProps = {
  title: '',
  onClick: jest.fn(),
  isActive: false,
};

const setup = ({ props }) => {
  const component = shallow(
    <NavBar activeStepIndex={0}>
      <NavItem {...props} />
      <NavItem {...props} />
      <NavItem {...props} />
    </NavBar>,
  );

  return {
    wrapper: component,
    getStepTitleContainer: () => component.find('.step-title-container__title'),
    getCompleteNavItem: () => component.find('.step-title-container__complete'),
    getStepSummary: () => component.find('.step-title-container__summary'),
    getStepSubtitle: () => component.find('.step-title-container__subtitle'),
    getStepContainer: () => component.find('.step-title-container'),
  };
};

describe('NavItem', () => {
  const component = setup({ props: defaultProps });

  it('should match default snapshot', () => {
    expect(component.wrapper).toMatchSnapshot();
  });

  it("Returns a collection of <NavItem/>'s", () => {
    expect(component.wrapper.find(NavItem)).toHaveLength(3);
  });

  describe('prop : activeStepIndex', () => {
    it('Provides an "isActive" prop of true to the correct NavItem', () => {
      expect(component.wrapper.find(NavItem).get(2).props.isActive).toBe(false);
      component.wrapper.setProps({ activeStepIndex: 2 });
      expect(component.wrapper.find(NavItem).get(2).props.isActive).toBe(true);
    });
  });
});
