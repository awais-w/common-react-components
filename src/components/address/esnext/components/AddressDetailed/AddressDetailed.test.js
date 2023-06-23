import React from 'react';
import { shallow } from 'enzyme';
import IconLabelValue from '@cmc/icon-label-value/esnext';
import AddressDetailed from './AddressDetailed';

describe('Address', () => {
  const setup = ({ city, country, county, line1, line2, line3, postcode }) => {
    const component = shallow(
      <AddressDetailed
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
      getLine1Container: () => component.find('.cmc-detailed-address__line1'),
      getLine2Container: () => component.find('.cmc-detailed-address__line2'),
      getLine3Container: () => component.find('.cmc-detailed-address__line3'),
      getCityContainer: () => component.find('.cmc-detailed-address__city'),
      getPostcodeContainer: () => component.find('.cmc-detailed-address__postcode'),
      getCountyContainer: () => component.find('.cmc-detailed-address__county'),
      getCountryContainer: () => component.find('.cmc-detailed-address__country'),
      getLine1Value: () =>
        component
          .find('.cmc-detailed-address__line1')
          .find(IconLabelValue)
          .prop('value'),
      getLine2Value: () =>
        component
          .find('.cmc-detailed-address__line2')
          .find(IconLabelValue)
          .prop('value'),
      getLine3Value: () =>
        component
          .find('.cmc-detailed-address__line3')
          .find(IconLabelValue)
          .prop('value'),
      getCityValue: () =>
        component
          .find('.cmc-detailed-address__city')
          .find(IconLabelValue)
          .prop('value'),
      getPostcodeValue: () =>
        component
          .find('.cmc-detailed-address__postcode')
          .find(IconLabelValue)
          .prop('value'),
      getCountyValue: () =>
        component
          .find('.cmc-detailed-address__county')
          .find(IconLabelValue)
          .prop('value'),
      getCountryValue: () =>
        component
          .find('.cmc-detailed-address__country')
          .find(IconLabelValue)
          .prop('value'),
      getLine1Label: () =>
        component
          .find('.cmc-detailed-address__line1')
          .find(IconLabelValue)
          .prop('label'),
      getLine2Label: () =>
        component
          .find('.cmc-detailed-address__line2')
          .find(IconLabelValue)
          .prop('label'),
      getLine3Label: () =>
        component
          .find('.cmc-detailed-address__line3')
          .find(IconLabelValue)
          .prop('label'),
      getCityLabel: () =>
        component
          .find('.cmc-detailed-address__city')
          .find(IconLabelValue)
          .prop('label'),
      getPostcodeLabel: () =>
        component
          .find('.cmc-detailed-address__postcode')
          .find(IconLabelValue)
          .prop('label'),
      getCountyLabel: () =>
        component
          .find('.cmc-detailed-address__county')
          .find(IconLabelValue)
          .prop('label'),
      getCountryLabel: () =>
        component
          .find('.cmc-detailed-address__country')
          .find(IconLabelValue)
          .prop('label'),
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
    const { line1, city, postcode } = address;
    const component = setup({ line1, city, postcode });
    it('exists', () => expect(component.wrapper).toExist());
    it('has the right class on the container', () =>
      expect(component.getRootContainer()).toHaveClassName('cmc-detailed-address'));
  });
  describe('when provided', () => {
    const component = setup(address);

    describe('line1', () => {
      it('displays container', () => expect(component.getLine1Container()).toExist());
      it('displays the label', () => expect(component.getLine1Label()).toBe('Line 1:'));
      it('displays the value', () => expect(component.getLine1Value()).toBe(address.line1));
    });
    describe('line2', () => {
      it('displays container', () => expect(component.getLine2Container()).toExist());
      it('displays the label', () => expect(component.getLine2Label()).toBe('Line 2:'));
      it('displays the value', () => expect(component.getLine2Value()).toBe(address.line2));
    });
    describe('line3', () => {
      it('displays container', () => expect(component.getLine3Container()).toExist());
      it('displays the label', () => expect(component.getLine3Label()).toBe('Line 3:'));
      it('displays the value', () => expect(component.getLine3Value()).toBe(address.line3));
    });
    describe('city', () => {
      it('displays container', () => expect(component.getCityContainer()).toExist());
      it('displays the label', () => expect(component.getCityLabel()).toBe('City:'));
      it('displays the value', () => expect(component.getCityValue()).toBe(address.city));
    });
    describe('county', () => {
      it('displays container', () => expect(component.getCountyContainer()).toExist());
      it('displays the label', () => expect(component.getCountyLabel()).toBe('County:'));
      it('displays the value', () => expect(component.getCountyValue()).toBe(address.county));
    });
    describe('postcode', () => {
      it('displays container', () => expect(component.getPostcodeContainer()).toExist());
      it('displays the label', () => expect(component.getPostcodeLabel()).toBe('Postcode:'));
      it('displays the value', () => expect(component.getPostcodeValue()).toBe(address.postcode));
    });
    describe('country', () => {
      it('displays container', () => expect(component.getCountryContainer()).toExist());
      it('displays the label', () => expect(component.getCountryLabel()).toBe('Country:'));
      it('displays the value', () => expect(component.getCountryValue()).toBe(address.country));
    });
  });
  describe('when not provided', () => {
    const { line1, city, postcode } = address;
    const component = setup({ line1, city, postcode });
    it('line2 is not displayed', () => expect(component.getLine2Container()).not.toExist());
    it('line3 is not displayed', () => expect(component.getLine3Container()).not.toExist());
    it('county is not displayed', () => expect(component.getCountyContainer()).not.toExist());
    it('country is not displayed', () => expect(component.getCountryContainer()).not.toExist());
  });
});
