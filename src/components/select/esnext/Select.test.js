import React from 'react';
import { shallow } from 'enzyme';
import Select from './Select';

const defaultProps = {
  label: '',
  id: 'default',
  errorMessage: '',
  value: '',
  handleChange: jest.fn(),
  handleBlur: jest.fn(),
  isDisabled: false,
  options: ['First', 'Second', 'Third'],
  optionsWithValues: undefined,
  name: 'SelectName',
  isMandatory: false,
  applied: false,
};

describe('Select', () => {
  let component;
  beforeEach(() => {
    component = shallow(<Select {...defaultProps} />);
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
    const event = { target: { value: 3 } };
    component.find('select').props().onChange(event);
    expect(defaultProps.handleChange).toHaveBeenCalledWith(event);
  });
  it('calls handleBlur when blurred', () => {
    const event = { target: { value: 3 } };
    component.find('select').props().onBlur(event);
    expect(defaultProps.handleBlur).toHaveBeenCalledWith(event);
  });
  it('renders an empty first option if required', () => {
    component.setProps({ firstOptionEmpty: true }, () => {
      expect(component.find('option').first().text()).toEqual('Select option');
    });
  });
  it('renders a placeholder for the first option', () => {
    component.setProps({ firstOptionEmpty: true, placeholder: 'Choose a thing' }, () => {
      expect(component.find('option').first().text()).toEqual('Choose a thing');
    });
  });
  it('renders a unique option for each of options prop', () => {
    component.setProps({ firstOptionEmpty: false, options: ['a', 'b', 'c', 'a', 'c'] }, () => {
      expect(component.find('option').length).toEqual(3);
    });
  });
  it('renders an option for each of optionsWithValues prop', () => {
    component.setProps(
      {
        firstOptionEmpty: false,
        optionsWithValues: [
          { option: 'First', value: 1 },
          { option: 'Second', value: 2 },
          { option: 'Third', value: 3 },
          { option: 'Fourth', value: 4 },
        ],
      },
      () => {
        expect(component.find('option').length).toEqual(4);
      },
    );
  });
  it('renders an error message if not valid', () => {
    expect(component.find('.cmc-select__help-block').length).toEqual(0);
    component.setProps({ errorMessage: 'broken' }, () => {
      expect(component.find('.cmc-select__help-block').text()).toEqual('broken');
    });
  });
  it('adds an applied class if required', () => {
    component.setProps({ applied: true }, () => {
      expect(component.hasClass('applied')).toBeTruthy();
    });
  });
});
