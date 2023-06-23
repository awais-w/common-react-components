import React from 'react';
import { shallow } from 'enzyme';
import Textarea from './Textarea';

const defaultProps = {
  label: '',
  id: 'default',
  errorMessage: '',
  value: '',
  handleChange: jest.fn(),
  handleBlur: jest.fn(),
  isDisabled: false,
  name: 'TextareaName',
  isMandatory: false,
  placeholder: 'Insert content',
};

describe('Textarea', () => {
  let component;
  beforeEach(() => {
    component = shallow(<Textarea {...defaultProps} />);
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
  it('appends a * to the label if mandatory', () => {
    component.setProps({ label: 'A mandatory field', isMandatory: true }, () => {
      expect(component.find('label').first().text()).toEqual('A mandatory field *');
    });
  });
  it('calls handleChange when changed', () => {
    const event = { target: { value: 'new' } };
    component.find('textarea').props().onChange(event);
    expect(defaultProps.handleChange).toHaveBeenCalledWith(event);
  });
  it('calls handleBlur when changed', () => {
    const event = { target: { value: 'new' } };
    component.find('textarea').props().onBlur(event);
    expect(defaultProps.handleBlur).toHaveBeenCalledWith(event);
  });
  it('renders an error message if not valid', () => {
    expect(component.find('.cmc-textarea__help-block').length).toEqual(0);
    component.setProps({ errorMessage: 'broken' }, () => {
      expect(component.find('.cmc-textarea__help-block').text()).toEqual('broken');
    });
  });
  it('adds the right resize class', () => {
    component.setProps({ resizeDirection: 'vertical' }, () => {
      expect(component.find('textarea').hasClass('cmc-textarea--resize-vertical')).toBeTruthy();
    });
  });
});
