import React from 'react';
import { shallow } from 'enzyme';
import DeliveryGraph from './DeliveryGraph';

describe('Delivery Graph', () => {
  it('render graph with correct data for 2020-09-11T00:45:00', () => {
    const arrivalTime = '2020-09-11T00:45:00';
    const component = shallow(<DeliveryGraph arrivalTime={arrivalTime} />);

    expect(component.find('.slot-range')).toHaveLength(2);
    expect(component.find('.slot-part')).toHaveLength(2);
    expect(component.find('.slot-line')).toHaveLength(3);

    expect(
      component
        .find('.slot-range')
        .at(0)
        .text(),
    ).toEqual('12am');
    expect(
      component
        .find('.slot-part')
        .at(0)
        .text(),
    ).toEqual('12:20');
    expect(
      component
        .find('.slot-part')
        .at(1)
        .text(),
    ).toEqual('12:40');
    expect(
      component
        .find('.slot-range')
        .at(1)
        .text(),
    ).toEqual('1am');

    expect(component.find('IconLabelValue').prop('value')).toEqual('Sep 11th, 12am-1am, 3rd part of the slot');
  });
});
