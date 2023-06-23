import React from 'react';
import { shallow } from 'enzyme';
import IconLabelValue from '@cmc/icon-label-value/esnext';
import { formatAddress } from '@cmc/utils/esnext';
import AddressCompact from './AddressCompact';

describe('Address', () => {
  const setup = ({ city, country, county, line1, line2, line3, postcode }) => {
    const component = shallow(
      <AddressCompact
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
      getFirstLine: () => component.find('.cmc-compact-address__line1'),
      getSecondLine: () => component.find('.cmc-compact-address__line2'),
      getThirdLine: () => component.find('.cmc-compact-address__country'),
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
      expect(component.getRootContainer()).toHaveClassName('cmc-compact-address'));
  });
  describe('when all fields of an address are provided', () => {
    const component = setup({ ...address });
    it('displays line1, line2 and line3 on the first line', () => {
      const { line1, line2, line3 } = address;
      expect(
        component
          .getFirstLine()
          .find(IconLabelValue)
          .prop('value'),
      ).toBe(formatAddress({ line1, line2, line3 }));
    });
    it('should display an icon on the first line', () =>
      expect(
        component
          .getFirstLine()
          .find(IconLabelValue)
          .prop('icon'),
      ).toBe('business'));
    it('displays postcode, city, county on the second line', () => {
      const { postcode, city, county } = address;
      expect(
        component
          .getSecondLine()
          .find(IconLabelValue)
          .prop('value'),
      ).toBe(formatAddress({ postcode, city, county }));
    });
    it('displays country on the third line', () => {
      const { country } = address;
      expect(
        component
          .getThirdLine()
          .find(IconLabelValue)
          .prop('value'),
      ).toBe(country);
    });
  });
  describe('when country is not provided', () => {
    const { line1, city, postcode } = address;
    const componentNoCountry = setup({ line1, city, postcode });
    it("doesn't display the third line block", () => expect(componentNoCountry.getThirdLine()).not.toExist());
  });
});
