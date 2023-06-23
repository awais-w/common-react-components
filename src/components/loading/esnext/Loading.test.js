import React from 'react';
import { shallow } from 'enzyme';
import Loading from './Loading';

const defaultProps = {
  fullScreen: true,
};

const setup = ({ props }) => {
  const component = shallow(<Loading {...props} />);
  return {
    wrapper: component,
    getLoadingText: () => component.find('.loader-text'),
    getLargeSpinner: () => component.find('.loader-svg-lg'),
    getMediumSpinner: () => component.find('.loader-svg-md'),
    getSmallSpinner: () => component.find('.loader-svg-sm'),
  };
};

describe('Loading', () => {
  const component = setup({ defaultProps });
  it('exists', () => expect(component.wrapper).toExist());

  it('renders the loading text', () => {
    component.wrapper.setProps({ text: 'loading' });
    expect(component.getLoadingText().text()).toBe('loading');
  });
  it('renders the large spinner', () => {
    component.wrapper.setProps({ size: 'lg' });
    expect(component.getLargeSpinner()).toExist();
  });
  it('renders the medium spinner', () => {
    component.wrapper.setProps({ size: 'md' });
    expect(component.getMediumSpinner()).toExist();
  });
  it('renders the small spinner', () => {
    component.wrapper.setProps({ size: 'sm' });
    expect(component.getSmallSpinner()).toExist();
  });
});
