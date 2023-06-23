import React from 'react';
import { shallow } from 'enzyme';
import uuid from 'uuid';
import ReasonPicker from './ReasonPicker';
import InputSelection from '../../input-selection/esnext/InputSelection';
import { listItems, reasonItems } from './ReasonPicker.data.js';

uuid.v4 = jest.fn(() => '00000000-0000-0000-0000-000000000000');

const defaultProps = {
  inputType: 'radio',
  listItems,
  reasonItems,
  reasonPlaceholderTxt: 'Please state reason',
  onReasonChange: jest.fn(),
  onListItemClick: () => {},
  reasonType: 'list',
};

const setup = (props) => {
  const component = shallow(<ReasonPicker {...props} />);

  return {
    wrapper: component,
    getInputSelect: () => component.find(InputSelection),
    getLine: () => component.find('.cmc-reason-picker__line'),
    getSelection: () => component.find('.cmc-reason-picker__selection'),
    getSelect: () => component.find('select.form-control'),
    getTextArea: () => component.find('textarea.form-control'),
    getTextAreaPlaceholder: () => component.find('textarea.form-control').prop('placeholder'),
  };
};

describe('<ReasonPicker />', () => {
  const component = setup(defaultProps);

  it('should match default snapshot', () => {
    expect(component.wrapper).toMatchSnapshot();
  });

  describe('rendering', () => {
    it('renders the correct number of lines', () => {
      expect(component.getLine()).toHaveLength(3);
    });

    it('renders the correct number of drop downs', () => {
      expect(component.getSelect()).toHaveLength(1);
    });

    it('renders the correct number of textareas', () => {
      component.wrapper.setProps({ reasonType: 'text' });
      expect(component.getTextArea()).toHaveLength(1);
    });

    it('renders placeholder of textarea', () => {
      expect(component.getTextAreaPlaceholder()).toBe('Please state reason');
    });

    it('renders the InputSelect component', () => {
      expect(component.getInputSelect()).toHaveLength(3);
    });
  });
});

describe('reasonChange functionality', () => {
  const component = setup(defaultProps);
  it('onReasonChange function prop is called when the select input is changed', () => {
    component.getSelect().simulate('change');
    expect(defaultProps.onReasonChange).toBeCalled();
  });
  it('onReasonChange function prop is called when the textArea input is changed', () => {
    component.wrapper.setProps({ reasonType: 'text' });
    component.getTextArea().simulate('change');
    expect(defaultProps.onReasonChange).toBeCalled();
  });
});
