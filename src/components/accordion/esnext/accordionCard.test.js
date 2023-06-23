import React from 'react';
import { shallow } from 'enzyme';
import AccordionCard from './accordionCard';

const defaultProps = {
  allowMultipleOpen: true,
  indx: 0,
  cardData: {
    header: {
      icon: 'forum',
      title1: '13 Jan 2020, 00:32:21',
      title2: 'Order Number: 6000002600',
      actions: [
        { icon: 'icon-url', isCustom: true, color: 'blue', tooltip: 'copy url' },
        { icon: 'zoom_out_map', color: 'blue', tooltip: 'expand transcript' },
      ],
    },
    body: 'This is card content.',
  },
  isExpanded: false,
  onCardClick: jest.fn(),
};

const setup = ({ props }) => {
  const component = shallow(<AccordionCard {...props} />);

  return {
    wrapper: component,
  };
};

describe('<AccordionCard />', () => {
  describe('with default props', () => {
    const component = setup({ props: defaultProps });

    it('handleClick', async () => {
      await component.wrapper.instance().handleClick();
      expect(component.wrapper.state().isExpanded).toEqual(true);
    });

    it('showLoadContent', async () => {
      const newComponent = setup({ props: defaultProps });
      const shouldLoadcontent = await newComponent.wrapper.instance().shouldLoadcontent();
      expect(shouldLoadcontent).toEqual(false);
    });

    it('componentDidUpdate', async () => {
      const oldProps = {
        ...defaultProps,
        isExpanded: true,
      };
      await component.wrapper.instance().componentDidUpdate(oldProps);
      expect(component.wrapper.state().isExpanded).toEqual(false);
    });

    it('should match the default snapshot', () => {
      expect(component.wrapper).toMatchSnapshot();
    });

    it('exists', () => expect(component.wrapper).toExist());
  });
});
