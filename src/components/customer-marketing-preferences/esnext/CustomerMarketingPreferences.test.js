import React from 'react';
import { shallow, mount } from 'enzyme';
import CustomerMarketingPreferences from './CustomerMarketingPreferences';
import dummyMarketingPreferences from '../dummyMarketingPreferences';

const defaultProps = {
  email: '',
  consents: [dummyMarketingPreferences.consents[0]],
  updateConsentData: jest.fn(),
};

const setup = ({ props }) => {
  const component = shallow(<CustomerMarketingPreferences {...props} />);

  return {
    wrapper: component,
    getContainer: () => component.find('.cmc-customer-marketing-preferences'),
    getMessageContainer: () => component.find('.cmc-customer-marketing-preferences__message'),
    getMessage: () => component.find('.cmc-customer-marketing-preferences__message').text(),
    getItemContainer: () => component.find('.cmc-customer-marketing-preferences__item-container'),
    getItem: () => component.find('.cmc-customer-marketing-preferences__item'),
  };
};

describe('CustomerMarketingPreferences with default props', () => {
  const component = setup({ props: defaultProps });

  it('should match default snapshot', () => {
    expect(component.wrapper).toMatchSnapshot();
  });

  it('should render a container', () => {
    expect(component.getContainer().exists()).toBe(true);
  });

  it('should render a message container', () => {
    expect(component.getMessageContainer().exists()).toBe(true);
  });

  it('should display the correct marketing preferences message', () => {
    expect(component.getMessage()).toEqual(dummyMarketingPreferences.message);
  });

  it('should render a preferences item container', () => {
    expect(component.getItemContainer().exists()).toBe(true);
  });

  it('should render a single preference', () => {
    expect(component.getItem().length).toBe(1);
  });
});

describe('CustomerMarketingPreferences with varying number of preferences', () => {
  describe('with no preferences', () => {
    const noPreferences = {
      email: dummyMarketingPreferences.email,
      consents: [],
      updateConsentData: jest.fn(),
    };
    const component = setup({ props: noPreferences });

    it('should render no preferences', () => {
      expect(component.getItem().length).toBe(0);
    });
  });

  describe('with two preferences', () => {
    const twoPreferences = {
      email: dummyMarketingPreferences.email,
      consents: dummyMarketingPreferences.consents,
      updateConsentData: jest.fn(),
    };
    const component = setup({ props: twoPreferences });

    it('should render no preferences', () => {
      expect(component.getItem().length).toBe(2);
    });
  });
});

describe('CustomerMarketingPreferences function', () => {
  describe('updateConsent', () => {
    const propsCalledWith = {
      email: defaultProps.email,
      consent: defaultProps.consents[0].missionConsents[0].consent,
      mission: defaultProps.consents[0].mission,
    };

    // Component must be mounted to access function
    const component = mount(<CustomerMarketingPreferences {...defaultProps} />);

    component.find('button[value=true]').simulate('click');

    it('should toggle the marketing preference', () => {
      expect(defaultProps.updateConsentData).toHaveBeenCalled();
    });

    it('should be called with the correct props', () => {
      expect(defaultProps.updateConsentData).toHaveBeenCalledWith(propsCalledWith);
    });

    it('Consent is flipped to Y/N depending on the initial consent value', () => {
      // When consent is set to "Y" originally test we flip it to "N" on our callback
      expect(defaultProps.updateConsentData).toHaveBeenCalledWith(propsCalledWith);

      // When consent is set to "N" originally test we flip it to "Y" on our callback
      const propsWithConsentDefaultedToNo = {
        email: '',
        consents: [dummyMarketingPreferences.consents[1]],
        updateConsentData: jest.fn(),
      };

      const propCallbackStructureWithConsentAsNo = {
        email: defaultProps.email,
        consent: propsWithConsentDefaultedToNo.consents[0].missionConsents[0].consent,
        mission: propsWithConsentDefaultedToNo.consents[0].mission,
      };

      component.setProps(propsWithConsentDefaultedToNo);
      component.find('button[value=false]').simulate('click');

      expect(propsWithConsentDefaultedToNo.updateConsentData).toHaveBeenCalledWith(
        propCallbackStructureWithConsentAsNo,
      );
    });
  });
});
