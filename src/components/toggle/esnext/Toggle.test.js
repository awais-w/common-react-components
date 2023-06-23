import React from 'react';
import { shallow } from 'enzyme';
import uuid from 'uuid';
import Toggle from './Toggle';

const defaultProps = {
  checked: false,
  disabled: false,
  selected: null,
  onSelect: jest.fn(),
  text: '',
  yes: 'yes',
  no: 'no',
};
// Mock the uuid used in IconLabelValue
uuid.v4 = jest.fn(() => '00000000-0000-0000-0000-000000000000');

const setup = (props) => {
  const component = shallow(<Toggle {...props} />);

  return {
    wrapper: component,
    getContainer: () => component.find('.cmc-toggle'),
    getButtons: () => component.find('.buttons'),
    getToggleWrapper: () => component.find('.toggle'),
    getCheckboxToggle: () => component.find('.toggle__switch'),
    getNoButton: () => component.find('button[value=false]'),
    getYesButton: () => component.find('button[value=true]'),
    getToggleStatus: () => component.find({ type: 'checkbox' }),
    getText: () => component.find('.cmc-toggle__label'),
  };
};

describe('Toggle with default props', () => {
  it('should match default snapshot', () => {
    const component = setup(defaultProps);
    expect(component.wrapper).toMatchSnapshot();
  });

  it('should render a container', () => {
    const component = setup(defaultProps);
    expect(component.getContainer().exists()).toBe(true);
  });

  it('should render a .buttons wrapper with no text label', () => {
    const component = setup(defaultProps);
    expect(component.getButtons().exists()).toBe(true);
    expect(component.getText().exists()).toBe(false);
  });

  it('should render a yes button', () => {
    const component = setup(defaultProps);
    expect(component.getYesButton().exists()).toBe(true);
  });

  it('should render a no button', () => {
    const component = setup(defaultProps);
    expect(component.getNoButton().exists()).toBe(true);
  });

  it('should render a texfield if text supplied', () => {
    const component = setup({ ...defaultProps, text: 'some text' });
    expect(component.getText().exists()).toBe(true);
  });

  it('should have a disabled class if disabled = true', () => {
    const component = setup({ ...defaultProps, disabled: true });
    expect(component.getButtons().hasClass('disabled')).toBe(true);
  });

  it('should default to true if selected = true', () => {
    const component = setup({ ...defaultProps, selected: true });
    expect(component.getButtons().hasClass('trueactive')).toBe(true);
  });

  it('should default to false if selected = false', () => {
    const component = setup({ ...defaultProps, selected: false });
    expect(component.getButtons().hasClass('falseactive')).toBe(true);
  });

  it('should not add a selected class if one has not been passed', () => {
    const component = setup({ ...defaultProps });
    expect(component.getButtons().hasClass('trueactive')).toBe(false);
    expect(component.getButtons().hasClass('falseactive')).toBe(false);
  });

  it('should set trueactive class when yes is clicked', () => {
    const component = setup(defaultProps);
    component.getYesButton().simulate('click');
    expect(component.getButtons().hasClass('trueactive')).toBe(true);
  });

  it('should set falseactive class when no is clicked', () => {
    const component = setup(defaultProps);
    component.getNoButton().simulate('click');
    expect(component.getButtons().hasClass('falseactive')).toBe(true);
  });

  it('should call onSelect function when clicked', () => {
    const component = setup(defaultProps);
    component.getNoButton().simulate('click');
    expect(defaultProps.onSelect).toHaveBeenCalled();
  });
});
