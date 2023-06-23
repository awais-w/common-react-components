import React from 'react';
import { shallow } from 'enzyme';
import Dot from './Dot';

const setup = ({ props }) => shallow(<Dot {...props} />);

describe('Dot', () => {
  it('should match default snapshot', () => {
    const component = setup({ props: {} });
    expect(component).toMatchSnapshot();
  });

  it('renders correct color', () => {
    const component = setup({ props: { color: 'yellow' } });
    expect(component.find('.cmc-dot--yellow')).toExist();
  });

  it('renders correct text', () => {
    const component = setup({ props: { value: '5' } });
    expect(component.find('span').text()).toBe('5');
  });
});
