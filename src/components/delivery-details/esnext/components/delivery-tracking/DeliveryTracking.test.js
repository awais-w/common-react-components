import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import moment from 'moment';
import IconLabelValue from '@cmc/icon-label-value/esnext';
import DeliveryTracking from './DeliveryTracking';
import DeliveryGraph from './DeliveryGraph';

describe('DeliveryTracking', () => {
  const setup = ({ actualArrival, plannedArrival, dropNumber, bookedSlot, price, origin, instructions }) => {
    const component = shallow(
      <DeliveryTracking
        actualArrival={actualArrival}
        plannedArrival={plannedArrival}
        dropNumber={dropNumber}
        bookedSlot={bookedSlot}
        price={price}
        origin={origin}
        instructions={instructions}
      />,
    );
    return {
      wrapper: component,
      getRootContainer: () => component.find('div').first(),
      getFields: () => component.find(IconLabelValue),
      getPrice: () => component.find(IconLabelValue).find({ value: price }),
      getBookedSlot: () => component.find(IconLabelValue).find({ value: bookedSlot }),
      getActualArrival: () => component.find(IconLabelValue).find({ value: moment(actualArrival).format('h:mma') }),
      getPlannedArrival: () => component.find(IconLabelValue).find({ value: moment(plannedArrival).format('h:mma') }),
      getDropNumber: () => component.find(IconLabelValue).find({ value: dropNumber.toString() }),
      getOrigin: () => component.find(IconLabelValue).find({ label: 'From:' }),
    };
  };
  const deliveryDetails = {
    bookedSlot: '11:00am - 12:00pm',
    price: '£6.98',
    actualArrival: '2019-02-14T07:46:00Z',
    plannedArrival: '2019-02-14T07:45:00Z',
    dropNumber: 26,
    origin: {
      id: '0932',
      name: 'Milton Keynes',
    },
    instructions: 'This is an instruction',
  };
  describe('renders', () => {
    const component = setup({ ...deliveryDetails });
    it('exists', () => expect(component.wrapper).toExist());
    it('has the right class on the container', () =>
      expect(component.getRootContainer()).toHaveClassName('cmc-delivery-tracking'));
    describe('renders all fields', () => {
      it(`renders ${Object.keys(deliveryDetails).length} fields`, () =>
        expect(component.getFields().length).toBe(Object.keys(deliveryDetails).length));
      it('renders price', () => expect(component.getPrice()).toExist());
      it('renders booked slot', () => expect(component.getBookedSlot()).toExist());
      it('renders actual arrival', () => expect(component.getActualArrival()).toExist());
      it('renders planned arrival', () => expect(component.getPlannedArrival()).toExist());
      it('renders drop number', () => expect(component.getDropNumber()).toExist());
      it('renders origin', () => expect(component.getOrigin()).toExist());
      it('renders instruction', () => {
        const instruction = component.wrapper.findWhere(
          (comp) => comp.name() === 'IconLabelValue' && comp.prop('label') === 'Instructions:',
        );
        expect(instruction).toExist();
      });
      it('renders a delivery graphic', () => {
        expect(component.wrapper.find(DeliveryGraph)).toExist();
      });
      it('does not render a delivery graph for click and collect orders', () => {
        component.wrapper.setProps({ isClickAndCollect: true });
        expect(component.wrapper.find(DeliveryGraph)).not.toExist();
      });
    });
  });
  describe('only renders required fields', () => {
    const component = setup({ bookedSlot: 'bookedSlot', price: 'price' });
    it('exists', () => expect(component.wrapper).toExist());
    describe('only renders price and slot', () => {
      it('only renders 2 fields', () => expect(component.getFields().length).toBe(2));
      it('one is price', () => expect(component.getPrice()).toExist());
      it('one is booked slot', () => expect(component.getBookedSlot()).toExist());
    });
  });
  describe('rendered content', () => {
    describe('origin', () => {
      it('renders name and id if both provided', () => {
        const component = setup(deliveryDetails);
        expect(component.getOrigin().prop('value')).toBe('Milton Keynes (0932)');
      });
      it('only renders if name not provided', () => {
        const component = setup({
          ...deliveryDetails,
          origin: {
            id: '0932',
          },
        });
        expect(component.getOrigin().prop('value')).toBe('0932');
      });
    });
  });
});
