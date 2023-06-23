import React from 'react';
import { shallow } from 'enzyme';
import ReactTooltip from 'react-tooltip';
import Icon from '@cmc/icon/esnext/Icon';
import MaterialIconWithValue from './IconLabelValue';

describe('IconLabelValue', () => {
  const setup = ({ icon, label, value, isInline, onClick, tooltipValue }) => {
    const component = shallow(
      <MaterialIconWithValue
        icon={icon}
        label={label}
        value={value}
        isInline={isInline}
        onClick={onClick}
        tooltipValue={tooltipValue}
      />,
    );
    return {
      wrapper: component,
      getIcon: () => component.find(Icon),
      getValue: () => component.find('.cmc-icon-label-value__value'),
      getValueMulti: () => component.find('.cmc-icon-label-value__value-multi'),
      getLabel: () => component.find('.cmc-icon-label-value__label'),
      click: () => component.find('.cmc-icon-label-value').simulate('click'),
      clickValue: ({ index = 0 }) => {
        component.find('.cmc-icon-label-value__value').at(index).simulate('click');
      },
      getInline: () => component.find('.cmc-icon-label-value--inline'),
      getTooltipDataFor: () => component.prop('data-for'),
      getTooltip: () => component.find(ReactTooltip),
      getTooltipValue: () => component.prop('data-tip'),
    };
  };

  describe('when icon prop', () => {
    describe('is provided', () => {
      const component = setup({
        icon: 'icon',
        iconSource: 'google',
      });
      it('exists', () => expect(component.wrapper).toExist());
      it('renders an icon', () => expect(component.getIcon().length).toBe(1));
    });

    describe('is not provided', () => {
      const component = setup({});
      it('exists', () => expect(component.wrapper).toExist());
      it("doesn't renders an icon", () => expect(component.getIcon().length).toBe(0));
    });
  });

  describe('when value prop', () => {
    describe('is not provided', () => {
      const component = setup({});
      it('exists', () => expect(component.wrapper).toExist());
      it("doesn't render value", () => expect(component.getValue().length).toBe(0));
    });
  });
  describe('is provided', () => {
    describe('as a string', () => {
      const props = {
        value: 'value',
      };
      const component = setup(props);
      it('exists', () => expect(component.wrapper).toExist());
      it('renders the value', () => expect(component.getValue().text()).toBe(props.value));
    });
    describe('as an array', () => {
      describe('without onClick handlers', () => {
        const values = [
          { value: 'value1', key: 'value1' },
          { value: 'value2', key: 'value2' },
        ];
        const component = setup({
          value: values,
        });
        it('exists', () => expect(component.wrapper).toExist());
        it('renders the right amount', () => expect(component.getValueMulti().length).toBe(2));
        component.getValue().forEach((value, index) => {
          it(`renders the right value on position ${index}`, () => expect(value.text()).toBe(values[index].value));
        });
      });
      describe('with onClick handlers', () => {
        const values = [
          { value: 'value1', key: 'value1', onClick: jest.fn() },
          { value: 'value2', key: 'value2', onClick: jest.fn() },
        ];
        const component = setup({
          value: values,
        });
        it('exists', () => expect(component.wrapper).toExist());
        it('renders the right amount', () => expect(component.getValueMulti().length).toBe(2));
        component.getValue().forEach((value, index) => {
          it(`renders the right value on position ${index}`, () => expect(value.text()).toBe(values[index].value));

          it(`renders the right class ${index}`, () =>
            expect(value).toHaveClassName('cmc-icon-label-value__value--clickable'));
          it(`handler is not called on value ${index}`, () => expect(values[index].onClick).not.toBeCalled());
          it(`handler is called on click ${index}`, () => {
            component.clickValue({ index });
            expect(values[index].onClick).toBeCalled();
          });
        });
      });
    });
  });

  describe('when label prop', () => {
    describe('is provided', () => {
      const props = {
        label: 'label',
      };
      const component = setup(props);
      it('exists', () => expect(component.wrapper).toExist());
      it('renders  the label', () => expect(component.getLabel().text()).toBe(props.label));
    });

    describe('is not provided', () => {
      const component = setup({});
      it('exists', () => expect(component.wrapper).toExist());
      it("doesn't render label", () => expect(component.getLabel().length).toBe(0));
    });
  });

  describe('when onClick prop', () => {
    describe('is provided', () => {
      const props = {
        onClick: jest.fn(),
      };
      const component = setup(props);
      it('exists', () => expect(component.wrapper).toExist());
      it('handler is not clicked by default', () => expect(props.onClick).not.toBeCalled());
      it('calls the handler when clicked', () => {
        component.click();
        expect(props.onClick).toBeCalled();
        props.onClick.mockClear();
      });
    });
    describe('is not provided', () => {
      const component = setup({});
      it('exists', () => expect(component.wrapper).toExist());
    });
  });

  describe('when isInline prop', () => {
    describe('is provided', () => {
      const props = {
        isInline: true,
      };
      const component = setup(props);

      it(`renders the inline class modifier`, () => {
        expect(component.getInline()).toExist();
      });
    });

    describe('is not provided', () => {
      const component = setup({});
      it(`does not render the inline class modifier`, () => expect(component.getInline()).not.toExist());
    });
  });

  describe('when tooltip props are provided', () => {
    describe('is provided', () => {
      const props = {
        tooltipValue: 'Substitute',
      };
      const component = setup(props);

      it(`adds a data-for prop equal to the ReactTooltip id`, () => {
        expect(component.getTooltipDataFor()).toEqual(component.getTooltip().prop('id'));
      });

      it(`adds a data-tip prop`, () => {
        expect(component.getTooltipValue()).toEqual(props.tooltipValue);
      });
    });

    describe('is not provided', () => {
      const component = setup({});

      it(`adds a data-tip prop`, () => {
        expect(component.getTooltipValue()).toEqual(undefined);
      });

      it(`does not render a ReactTooltip`, () => {
        expect(component.getTooltip()).not.toExist();
      });
    });
  });
});
