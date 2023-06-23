import React from 'react';
import { shallow } from 'enzyme';
import uuid from 'uuid';
import Accordion from './accordion';

const defaultProps = {
  allowMultipleOpen: false,
  moreAvailable: true,
  accordionData: [
    {
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
  ],
};

// Mock the uuid
uuid.v4 = jest.fn(() => '00000000-0000-0000-0000-000000000000');

const setup = ({ props }) => {
  const component = shallow(<Accordion {...props} />);

  return {
    wrapper: component,
  };
};

describe('<AccordionCard />', () => {
  describe('with default props', () => {
    const component = setup({ props: defaultProps });

    it('should match default snapshot', () => {
      expect(component.wrapper).toMatchSnapshot();
    });

    it('exists', () => expect(component.wrapper).toExist());
  });
});
