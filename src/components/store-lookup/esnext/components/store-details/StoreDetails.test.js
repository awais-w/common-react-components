import { shallow } from 'enzyme';
import React from 'react';
import StoreDetails from '../store-details/StoreDetails';

const defaultProps = {
  id: 2224,
  name: 'Bletchley Collect in Sainsburys',
  distance: '3.08 miles',
  address: '2 Engaine Drive, Milton Keynes, MK5 6JU',
  phoneNumber: '0346 266 1332',
  openingHours: [
    { day: 'Monday', from: '09:00', to: '19:00' },
    { day: 'Tuesday', from: '07:00', to: '23:00' },
    { day: 'Wednesday', from: '07:00', to: '23:00' },
    { day: 'Thursday', from: '07:00', to: '23:00' },
    { day: 'Friday', from: '07:00', to: '23:00' },
    { day: 'Saturday', from: '07:00', to: '22:00' },
    { day: 'Sunday', from: '11:00', to: '17:00' },
  ],
};

describe('StoreDetails', () => {
  const setup = (props) => {
    const component = shallow(<StoreDetails {...props} />);
    return {
      wrapper: component,
      getStoreName: () => component.find('.cmc-store-details__store-name'),
      getStoreId: () => component.find('.cmc-store-details__store-id'),
      getDistance: () => component.find('.cmc-store-details__distance'),
      getAddress: () => component.find('.cmc-store-details__address'),
      getPhoneNumber: () => component.find('.cmc-store-details__phone-number'),
      getTimeToggle: () => component.find('.cmc-store-details__toggle-opening-times'),
      getOpeningTimesTable: () => component.find('.cmc-store-details__opening-times-table'),
    };
  };

  let component;
  beforeEach(() => {
    component = setup(defaultProps);
  });

  it('renders', () => {
    expect(component.wrapper.exists()).toBeTruthy();
  });

  it('renders the store name', () => {
    expect(component.getStoreName().text()).toBe(defaultProps.name);
  });

  it('renders the store id', () => {
    expect(component.getStoreId().text()).toBe(`Store: ${defaultProps.id}`);
  });

  it('renders the store distance', () => {
    expect(component.getDistance().text()).toBe(defaultProps.distance);
  });

  it('renders the store address', () => {
    expect(component.getAddress().text()).toBe(defaultProps.address);
  });

  it('renders the store phone number', () => {
    expect(component.getPhoneNumber().text()).toBe(defaultProps.phoneNumber);
  });
});
