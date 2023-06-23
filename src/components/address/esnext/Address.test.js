import React from 'react';
import { shallow } from 'enzyme';
import Address from './Address';
import AddressCompact from './components/AddressCompact';
import AddressDetailed from './components/AddressDetailed';
import AddressInline from './components/AddressInline';

describe('Address', () => {
  const setup = ({ address, mode }) => {
    const component = shallow(<Address address={address} mode={mode} />);
    return {
      wrapper: component,
      getRootContainer: () => component.find('div').first(),
    };
  };
  const address = {
    city: 'city',
    country: 'country',
    county: 'county',
    line1: 'line1',
    line2: 'line2',
    line3: 'line3',
    postcode: 'postcode',
  };

  describe('renders', () => {
    const component = setup({ address });
    it('exists', () => expect(component.wrapper).toExist());
    it('has the right class on the container', () =>
      expect(component.getRootContainer()).toHaveClassName('cmc-address'));
  });
  describe('view mode', () => {
    it('INLINE', () => {
      const component = setup({ address, mode: 'INLINE' });
      expect(component.wrapper.containsMatchingElement(<AddressInline {...address} />)).toBe(true);
    });
    it('COMPACT', () => {
      const component = setup({ address, mode: 'COMPACT' });
      expect(component.wrapper.containsMatchingElement(<AddressCompact {...address} />)).toBe(true);
    });
    it('INLINE', () => {
      const component = setup({ address, mode: 'DETAILED' });
      expect(component.wrapper.containsMatchingElement(<AddressDetailed {...address} />)).toBe(true);
    });
  });
});
