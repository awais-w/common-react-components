import { mount } from 'enzyme';
import React from 'react';
import Popover from './Popover';

describe('Popover', () => {
  const parent = document.createElement('div');

  let component;
  beforeEach(() => {
    component = mount(<Popover>Hi</Popover>);
    component.instance().getParentElement = jest.fn().mockImplementation(() => parent);
  });

  it('sets popover to visible when handleParentMouseOver is called', () => {
    component.instance().setState({ isVisible: false }, async () => {
      expect(component.state('isVisible')).toBeFalsy();
      await component.instance().handleParentMouseOver();
      expect(component.state('isVisible')).toBeTruthy();
    });
  });

  it('sets popover to not visible when handleParentMouseOut is called', () => {
    component.instance().setState({ isVisible: true }, async () => {
      expect(component.state('isVisible')).toBeTruthy();
      await component.instance().handleParentMouseOut();
      expect(component.state('isVisible')).toBeFalsy();
    });
  });

  it('has the correct classname when isVisible is false', async () => {
    component.instance().setState({ isVisible: false }, async () => {
      component.instance().forceUpdate();
      expect(component.find('.cmc-popover--hidden').exists()).toBeTruthy();
    });
  });

  it('has the correct classname when isVisible is true', () => {
    component.instance().setState({ isVisible: true }, async () => {
      component.instance().forceUpdate();
      expect(component.find('.cmc-popover--visible').exists()).toBeTruthy();
    });
  });
});
