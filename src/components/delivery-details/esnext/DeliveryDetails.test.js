import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import Skeleton from 'react-loading-skeleton';
import Pane from '@cmc/pane/esnext/pane';
import ContactDetails from '@cmc/contact-details/esnext';
import Address from '@cmc/address/esnext';
import DeliveryDetails from './DeliveryDetails';
import DeliveryTracking from './components/delivery-tracking';

describe('DeliveryDetails', () => {
  const setup = ({ contact, address, deliveryTracking }) => {
    const component = shallow(
      <DeliveryDetails contact={contact} address={address} deliveryTracking={deliveryTracking} />,
    );
    const block = 'cmc-delivery-details';
    return {
      wrapper: component,
      getPane: () => component.find(Pane),
      getContactDetailsCard: () =>
        component.findWhere((element) => element.name() === 'Card' && element.prop('title1').endsWith('Contact')),
      getDeliveryDetailsCard: () =>
        component.findWhere((element) => element.name() === 'Card' && element.prop('title1').endsWith('Info')),
      getContactDetails: () => component.find(`.${block}__contact-details`),
      getAddress: () => component.find(`.${block}__address`),
      getInstructions: () => component.find('.cmc-address'),
      getDeliveryTracking: () => component.find(`.${block}__delivery-tracking`),
      getSkeleton: () => component.find(Skeleton),
    };
  };
  const contact = {
    business: 'My business',
    person: { title: 'Mr', name: 'Francisco', surname: 'Lopez', middleName: 'Jose' },
    emails: [
      { type: 'type1', address: 'address1' },
      { type: 'type2', address: 'address2' },
    ],
    telephones: [
      { type: 'type1', number: 'number1' },
      { type: 'type2', number: 'number2' },
    ],
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
  const deliveryTracking = {
    bookedSlot: '11:00am - 12:00pm',
    price: '£6.98',
    actualArrival: '7:46am',
    plannedArrival: '7:45am',
    dropNumber: 26,
    origin: '0932',
    instructions: 'instructions',
  };

  describe('renders', () => {
    const component = setup({ contact, address, deliveryTracking });
    it('exists', () => expect(component.wrapper).toExist());
    it('should match default snapshot', () => {
      expect(component.wrapper).toMatchSnapshot();
    });
  });

  describe('renders when no props provided', () => {
    const component = setup({});
    it('exists', () => expect(component.wrapper).toExist());
  });

  describe('content', () => {
    const component = setup({ contact, address, deliveryTracking });
    describe('contact details', () => {
      const contactDetailsBlock = component.getContactDetails();
      it('renders the block', () => {
        expect(contactDetailsBlock).toExist();
      });
      it('renders contact details', () => {
        expect(contactDetailsBlock.containsMatchingElement(<ContactDetails {...contact} />)).toBe(true);
      });
    });
    describe('address', () => {
      const contactDetailsBlock = component.getContactDetails();
      it('renders the block', () => {
        expect(contactDetailsBlock).toExist();
      });
      it('renders the address', () => {
        expect(contactDetailsBlock.containsMatchingElement(<Address address={address} mode={'INLINE'} />)).toBe(true);
      });
    });
    describe('delivery tracking', () => {
      const deliveryTrackingBlock = component.getDeliveryTracking();
      it('renders the block', () => {
        expect(deliveryTrackingBlock).toExist();
      });
      it('renders the delivery tracking', () => {
        expect(deliveryTrackingBlock.containsMatchingElement(<DeliveryTracking {...deliveryTracking} />)).toBe(true);
      });
      it('if instructions are not provided, passes instructions prop with value "Not provided"', () => {
        const withoutInstructions = { ...deliveryTracking, instructions: '' };
        const componentWithoutInstructions = setup({ contact, address, deliveryTracking: withoutInstructions });
        const deliveryTrackingComp = componentWithoutInstructions.getDeliveryTracking();
        expect(
          deliveryTrackingComp.containsMatchingElement(
            <DeliveryTracking {...deliveryTracking} instructions='Not provided' />,
          ),
        ).toBe(true);
      });
    });
  });

  describe('when isLoading', () => {
    const component = setup({});
    it('renders a skeleton', () => {
      component.wrapper.setProps({ isLoading: true });
      expect(component.getSkeleton().exists()).toBeTruthy();
    });
  });
});
