import React from 'react';
import { shallow } from 'enzyme';
import CreditCardDetails from './CreditCardDetails';

const allProps = {
  type: 'Argos Card',
  number: 'XXXX-XXXX-XXXX-1234',
  startDate: '2019-01-14T05:32:45Z',
  expiryDate: '2099-05-14T05:32:45Z',
  name: 'Mr Test Person',
};

describe('CreditCardDetails', () => {
  const component = shallow(<CreditCardDetails {...allProps} />);

  it('should match all props snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('should match required props snapshot', () => {
    const onlyRequiredProps = {
      number: 'XXXX-XXXX-XXXX-1234',
    };
    const updatedComponent = shallow(<CreditCardDetails {...onlyRequiredProps} />);
    expect(updatedComponent).toMatchSnapshot();
  });

  it('has the credit card icon', () => {
    expect(component.find('.cmc-icon').exists()).toBeTruthy();
  });

  describe('date options', () => {
    it('should render the correct date', () => {
      expect(component.find('span[children="01/19 - 05/99"]').exists()).toBeTruthy();
    });

    it('should render only startDate with no expiryDate', () => {
      const updatedProps = { ...allProps, expiryDate: '' };
      const noExpiryComponent = shallow(<CreditCardDetails {...updatedProps} />);
      expect(noExpiryComponent.find('span[children="01/19 - No expiration"]').exists()).toBeTruthy();
    });

    it('should render only expiryDate with no startDate', () => {
      const updatedProps = { ...allProps, startDate: '' };
      const noStartComponent = shallow(<CreditCardDetails {...updatedProps} />);
      expect(noStartComponent.find('span[children="Expiration date - 05/99"]').exists()).toBeTruthy();
    });

    it('should render only the fallback message', () => {
      const updatedProps = { ...allProps, startDate: '', expiryDate: '' };
      const noDatesComponent = shallow(<CreditCardDetails {...updatedProps} />);
      expect(noDatesComponent.find('span[children="No expiration provided"]').exists()).toBeTruthy();
    });
  });
});
