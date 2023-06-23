import React from 'react';
import { shallow } from 'enzyme';
import Icon from '@cmc/icon/esnext/Icon';
import Chip from './Chip';

const setup = (props) => {
  const component = shallow(<Chip {...props} />);

  return {
    wrapper: component,
    getChip: () => component.find('.cmc-chip'),
    getIcon: () => component.find(Icon),
    getLabel: () => component.find('.cmc-chip__label'),
    getOnClick: () => component.find('.cmc-chip').prop('onClick'),
  };
};

describe('Chip', () => {
  describe('with props', () => {
    const component = setup({
      icon: {
        name: 'icon-name',
        isCustom: false,
      },
      label: 'Chip label',
      color: 'red',
    });

    it('should match default snapshot', () => {
      expect(component.wrapper).toMatchSnapshot();
    });

    it('should render the chip component', () => {
      expect(component.getChip()).toExist();
    });

    it('should render correct color class', () => {
      expect(component.getChip().hasClass('cmc-chip--red')).toBeTruthy();
    });

    it('should render an icon with correct icon name', () => {
      expect(component.getIcon()).toExist();
      expect(component.getIcon().props().icon).toBe('icon-name');
    });

    it('should render a label', () => {
      expect(component.getLabel()).toExist();
      expect(component.getLabel().text()).toBe('Chip label');
    });
  });

  describe('with custom icon', () => {
    const component = setup({
      icon: {
        name: 'custom-icon',
        isCustom: true,
      },
    });

    it('should render a custom icon with correct name', () => {
      expect(component.getChip().find(Icon).props().isCustom).toBe(true);
      expect(component.getChip().find(Icon).props().icon).toBe('custom-icon');
    });
  });

  describe('with onClick prop', () => {
    const onClickProp = jest.fn();
    const component = setup({ onClick: onClickProp });

    it('should have an onClick function', () => {
      expect(component.getOnClick()).toEqual(onClickProp);
    });
  });
});
