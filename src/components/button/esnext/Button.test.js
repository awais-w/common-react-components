import React from 'react';
import { shallow } from 'enzyme';
import IconLabelValue from '@cmc/icon-label-value/esnext/IconLabelValue';
import Button from './Button';

const setup = (props) => {
  const component = shallow(<Button {...props} />);

  return {
    wrapper: component,
    getButton: () => component.find('.cmc-button'),
    getButtonType: () => component.find('.cmc-button').prop('type'),
    isSecondary: () => component.find('.button--secondary'),
    isShort: () => component.find('.button--short'),
    isDisabled: () => component.find('.cmc-button').prop('disabled'),
    getName: () => component.find('.cmc-button').prop('name'),
    getValue: () => component.find('.cmc-button').prop('value'),
    getText: () => component.find(IconLabelValue).prop('label'),
    getOnClick: () => component.find('.cmc-button').prop('onClick'),
    isLoading: () => component.find('.cmc-button__loading'),
    loadingText: () => component.find('.cmc-button__loading--withLabel'),
    splitLeftIcon: () => component.find('.cmc-button__icon--splitLeft'),
    splitRightIcon: () => component.find('.cmc-button__icon--splitRight'),
    halfWidth: () => component.find('.button--half'),
    contentWidth: () => component.find('.button--contentFit'),
    containerWidth: () => component.find('.button--containerFit'),
  };
};

describe('Button', () => {
  describe('with no props', () => {
    const component = setup();

    it('should match default snapshot', () => {
      expect(component.wrapper).toMatchSnapshot();
    });

    it('should render a button', () => {
      expect(component.getButton()).toExist();
    });

    it('should be of type button', () => {
      expect(component.getButtonType()).toBe('button');
    });
  });

  describe('with isSecondary prop', () => {
    const component = setup({ isSecondary: true });

    it('should render a secondary button', () => {
      expect(component.isSecondary()).toExist();
    });
  });

  describe('with isShort prop', () => {
    const component = setup({ isShort: true });

    it('should render a short height button', () => {
      expect(component.isShort()).toExist();
    });
  });

  describe('with isDisabled prop', () => {
    const component = setup({ isDisabled: true });

    it('should render a disabled button', () => {
      expect(component.isDisabled()).toBe(true);
    });
  });

  describe('with name prop', () => {
    const nameProp = 'name';
    const component = setup({ name: nameProp });

    it('should render a name in the button', () => {
      expect(component.getName()).toEqual(nameProp);
    });
  });

  describe('with value prop', () => {
    const valueProp = 'value';
    const component = setup({ value: valueProp });

    it('should render value in the button', () => {
      expect(component.getValue()).toEqual(valueProp);
    });
  });

  describe('with text prop', () => {
    const textProp = 'Hi I am a text prop';
    const component = setup({ text: textProp });

    it('should render text in the button', () => {
      expect(component.getText()).toEqual(textProp);
    });
  });

  describe('with onClick prop', () => {
    const onClickProp = jest.fn();
    const component = setup({ onClick: onClickProp });

    it('should render text in the button', () => {
      expect(component.getOnClick()).toEqual(onClickProp);
    });
  });

  describe('with isLoading prop', () => {
    const component = setup({ isLoading: true });

    it('should render loading button', () => {
      expect(component.isLoading()).toExist();
    });
  });

  describe('with isLoading and and loadingText prop', () => {
    const component = setup({ isLoading: true, loadingText: 'Retrying...' });

    it('should render loading button with text', () => {
      expect(component.isLoading()).toExist();
    });
  });

  describe('with split left icon', () => {
    const props = { icon: 'cancel', iconMode: 'splitLeft', onClick: jest.fn() };
    const component = setup(props);

    it('should render the split left icon', () => {
      expect(component.splitLeftIcon()).toExist();
    });
  });

  describe('with split right icon', () => {
    const props = { icon: 'cancel', iconMode: 'splitRight', onClick: jest.fn() };
    const component = setup(props);

    it('should render the split right icon', () => {
      expect(component.splitRightIcon()).toExist();
    });
  });

  describe('with half width button', () => {
    const component = setup({ buttonWidth: 'half' });

    it('should render the half button', () => {
      expect(component.halfWidth()).toExist();
    });
  });

  describe('with content width button', () => {
    const component = setup({ buttonWidth: 'contentFit' });

    it('should render the content width button', () => {
      expect(component.contentWidth()).toExist();
    });
  });

  describe('with container width button', () => {
    const component = setup({ buttonWidth: 'containerFit' });

    it('should render the container width button', () => {
      expect(component.containerWidth()).toExist();
    });
  });
});
