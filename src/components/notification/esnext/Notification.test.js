import React from 'react';
import { shallow } from 'enzyme';
import Notification from './Notification';

const setup = (props) => {
  const component = shallow(<Notification {...props} />);

  return {
    wrapper: component,
    getInfoNotification: () => component.find('.cmc-notification--info'),
    getWarningNotification: () => component.find('.cmc-notification--warning'),
    getErrorNotification: () => component.find('.cmc-notification--error'),
    getMessage: () => component.find('.cmc-notification__message'),
  };
};

describe('Notification', () => {
  it('renders', () => {
    const component = setup();
    expect(component.wrapper.exists()).toBeTruthy();
  });

  it('has the correct initial icon alignment class', () => {
    const component = setup();
    expect(component.wrapper.hasClass('icon-alignment-middle')).toBe(true);
  });

  it('has the correct icon alignment class when the prop is provided', () => {
    const props = {
      iconAlignment: 'top',
    };
    const component = setup(props);
    expect(component.wrapper.hasClass('icon-alignment-top')).toBe(true);
  });

  it('renders the correct message', () => {
    const props = {
      children: 'Message',
    };
    const component = setup(props);
    expect(component.getMessage().text()).toBe(props.children);
  });

  it('renders an info Notification', () => {
    const props = {
      mode: 'info',
    };
    const component = setup(props);
    expect(component.getInfoNotification().exists()).toBeTruthy();
  });

  it('renders a warning Notification', () => {
    const props = {
      mode: 'warning',
    };
    const component = setup(props);
    expect(component.getWarningNotification().exists()).toBeTruthy();
  });

  it('renders an error Notification', () => {
    const props = {
      mode: 'error',
    };
    const component = setup(props);
    expect(component.getErrorNotification().exists()).toBeTruthy();
  });
});
