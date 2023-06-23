import React from 'react';
import { shallow } from 'enzyme';
import Icon from '@cmc/icon/esnext/Icon';
import Textfield from './Textfield';

const defaultProps = {
  label: '',
  id: 'default',
  errorMessage: '',
  value: '',
  handleChange: jest.fn(),
  handleBlur: jest.fn(),
  isDisabled: false,
  name: 'TextfieldName',
  isMandatory: false,
  placeholder: 'Insert content',
};

describe('Textfield', () => {
  let component;
  beforeEach(() => {
    component = shallow(<Textfield {...defaultProps} />);
  });
  it('exists', () => {
    expect(component.exists()).toBeTruthy();
  });
  it('renders a label if present', () => {
    expect(component.find('label').length).toEqual(0);
    component.setProps({ label: 'A label' }, () => {
      expect(component.find('label').text()).toEqual('A label');
    });
  });
  it('renders the icon on the right if present', () => {
    expect(component.find(Icon).length).toEqual(0);
    component.setProps({ rightIcon: { icon: 'icon-address-lookup' } }, () => {
      expect(component.find(Icon).length).toEqual(1);
    });
  });
  it('appends a * to the label if mandatory', () => {
    component.setProps({ label: 'A mandatory field', isMandatory: true }, () => {
      expect(component.find('label').first().text()).toEqual('A mandatory field *');
    });
  });
  it('calls handleChange when changed', () => {
    const event = { target: { value: 'new' } };
    component.find('input').props().onChange(event);
    expect(defaultProps.handleChange).toHaveBeenCalledWith(event);
  });
  it('calls handleBlur when blurred', () => {
    const event = { target: { value: 'new' } };
    component.find('input').props().onBlur(event);
    expect(defaultProps.handleBlur).toHaveBeenCalledWith(event);
  });
  it('renders an error message if not valid', () => {
    expect(component.find('.cmc-textfield__help-block').length).toEqual(0);
    component.setProps({ errorMessage: 'broken' }, () => {
      expect(component.find('.cmc-textfield__help-block').text()).toEqual('broken');
    });
  });
  it('adds an applied class if required', () => {
    component.setProps({ applied: true }, () => {
      expect(component.hasClass('applied')).toBeTruthy();
    });
  });
});
