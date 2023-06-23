import React from 'react';
import { shallow } from 'enzyme';
import InputSelection from './InputSelection';

const defaultProps = {
  checked: true,
  children: 'Label',
  checkboxIconType: 'tick',
  id: 'checkbox-id',
  inputType: 'checkbox',
  name: 'checkbox-name',
  onChange: jest.fn(),
  value: 'something',
};

const setup = (props) => {
  const component = shallow(<InputSelection {...props} />);

  return {
    wrapper: component,
    getCheckbox: () => component.find('.cmc-input-selection'),
    getInput: () => component.find('.cmc-input-selection__input'),
    getLabel: () => component.find('.cmc-input-selection__label'),
  };
};

describe('<InputSelection />', () => {
  const component = setup(defaultProps);

  it('should match default snapshot', () => {
    expect(component.wrapper).toMatchSnapshot();
  });

  describe('rendering', () => {
    it('exists', () => {
      expect(component.getCheckbox().exists()).toBeTruthy();
    });

    it('renders the input', () => {
      expect(component.getInput().exists()).toBe(true);
    });

    it('renders the label', () => {
      expect(component.getLabel().exists()).toBe(true);
    });

    it('should render the children', () => {
      expect(component.getLabel().children()).toHaveLength(1);
    });
  });

  describe('functionality', () => {
    it('is renders an input of type checkbox', () => {
      expect(component.getInput().props().type).toBe('checkbox');
    });

    it('is checked when the checked prop is true', () => {
      expect(component.getInput().props().checked).toBe(true);
    });

    it('is not checked when the checked prop is false', () => {
      const uncheckedComponent = setup({ ...defaultProps, checked: false });
      expect(uncheckedComponent.getInput().props().checked).toBe(false);
    });

    it('calls onChange when the value changes', () => {
      component.getInput().simulate('change');
      expect(defaultProps.onChange).toHaveBeenCalled();
    });

    it('contains the classname tick when passsed icon tick', () => {
      expect(component.getInput().prop('className')).toContain('tick');
    });

    it('contains the classname cross when passsed icon cross', () => {
      const crossProps = { ...defaultProps, checkboxIconType: 'cross' };
      const crossComponent = setup(crossProps);
      expect(crossComponent.getInput().prop('className')).toContain('cross');
    });

    it('contains the classname cross when passsed icon line', () => {
      const lineProps = { ...defaultProps, checkboxIconType: 'line' };
      const crossComponent = setup(lineProps);
      expect(crossComponent.getInput().prop('className')).toContain('line');
    });

    it('is renders an input of type radio', () => {
      const radioProps = { ...defaultProps, inputType: 'radio' };
      const radioComponent = setup(radioProps);
      expect(radioComponent.getInput().props().type).toBe('radio');
    });
  });
});
