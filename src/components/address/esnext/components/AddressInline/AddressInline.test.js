import React from 'react';
import { shallow } from 'enzyme';
import IconLabelValue from '@cmc/icon-label-value/esnext';
import { formatAddress } from '@cmc/utils/esnext/';
import AddressInline from './AddressInline';

describe('Address', () => {
  const setup = ({ city, country, county, line1, line2, line3, postcode }) => {
    const component = shallow(
      <AddressInline
        line1={line1}
        line2={line2}
        line3={line3}
        city={city}
        county={county}
        country={country}
        postcode={postcode}
      />,
    );
    return {
      wrapper: component,
      getRootContainer: () => component.find('div').first(),
      getAddress: () => component.find(IconLabelValue).prop('value'),
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
    const component = setup({ ...address });
    it('exists', () => expect(component.wrapper).toExist());
    it('has the right class on the container', () =>
      expect(component.getRootContainer()).toHaveClassName('cmc-inline-address'));
    it('displays the value on a single line', () => {
      expect(component.getAddress()).toBe(formatAddress(address));
    });
  });
});
