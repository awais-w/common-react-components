import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import IconLabelValue from '@cmc/icon-label-value/esnext';
import { formatName } from '@cmc/utils/esnext';
import ContactDetails from './ContactDetails';

describe('ContactDetails', () => {
  const setup = ({ person, emails, telephones, business, groupFields }) => {
    const component = shallow(
      <ContactDetails
        person={person}
        emails={emails}
        telephones={telephones}
        business={business}
        groupFields={groupFields}
      />,
    );
    return {
      wrapper: component,
      getFullNameBlock: () => component.find('.ContactDetails__full-name'),
      getFullName: () => component.find('.ContactDetails__full-name').find(IconLabelValue),
      getBusinessBlock: () => component.find('.ContactDetails__business'),
      getBusiness: () => component.find('.ContactDetails__business').find(IconLabelValue),
      getEmailBlock: () => component.find('.ContactDetails__emails'),
      getEmails: () => component.find('.ContactDetails__emails').find(IconLabelValue),
      getTelephoneBlock: () => component.find('.ContactDetails__telephones'),
      getTelephones: () => component.find('.ContactDetails__telephones').find(IconLabelValue),
    };
  };
  const person = { title: 'Mr', name: 'Francisco', surname: 'Lopez', middleName: 'Jose' };
  const emails = [
    { type: 'type1', address: 'address1' },
    { type: 'type2', address: 'address2' },
  ];
  const telephones = [
    { type: 'type1', number: 'number1' },
    { type: 'type2', number: 'number2' },
  ];
  const business = 'My Business';
  describe('renders', () => {
    const component = setup({ person });
    it('exists', () => expect(component.wrapper).toExist());
  });
  describe('full name', () => {
    const component = setup({ person });
    it('renders block', () => expect(component.getFullNameBlock()).toExist());
    it('has the right format', () => expect(component.getFullName().prop('value')).toBe(formatName(person)));
    it('has the right format', () => expect(component.getFullName().prop('icon')).toBe('person'));
  });
  describe('business', () => {
    const component = setup({ person, business });
    it('renders block', () => expect(component.getBusinessBlock()).toExist());
    it('has the right format', () => expect(component.getBusiness().prop('value')).toBe(business));
    it('has the right format', () => expect(component.getBusiness().prop('icon')).toBe('business_center'));
  });
  describe('emails', () => {
    const component = setup({ person, emails });
    it('renders block', () => expect(component.getEmailBlock()).toExist());
    const emailsRendered = component.getEmails();
    it('has the right number of emails', () => expect(emailsRendered.length).toBe(emails.length));
    emailsRendered.forEach((email, index) => {
      describe(`on position ${index}`, () => {
        it('has the right icon', () => expect(email.prop('icon')).toBe('mail'));
        it('has the right label', () => expect(email.prop('label')).toBe(emails[index].type));
        it('has the right value', () => expect(email.prop('value')).toBe(emails[index].address));
      });
    });
  });

  describe('telephones', () => {
    const component = setup({ person, telephones });
    it('renders block', () => expect(component.getTelephoneBlock()).toExist());
    const telephonesRendered = component.getTelephones();
    it('has the right number of telephones', () => expect(telephonesRendered.length).toBe(telephones.length));
    telephonesRendered.forEach((telephone, index) => {
      describe(`on position ${index}`, () => {
        it('has the right icon', () => expect(telephone.prop('icon')).toBe('call'));
        it('has the right label', () => expect(telephone.prop('label')).toBe(telephones[index].type));
        it('has the right value', () => expect(telephone.prop('value')).toBe(telephones[index].number));
      });
    });
  });

  describe('grouping fields', () => {
    describe('disabled', () => {
      const component = setup({ person, emails, telephones, groupFields: false });
      const someTelephonesGrouped = component.getTelephones().someWhere((telephone) => telephone.prop('isInline'));
      const someEmailsGrouped = component.getEmails().someWhere((email) => email.prop('isInline'));
      it("doesn't render all telephones grouped", () => expect(someTelephonesGrouped).toBeFalsy());
      it("doesn't render all emails grouped", () => expect(someEmailsGrouped).toBeFalsy());
    });
    describe('enabled', () => {
      const component = setup({ person, emails, telephones, groupFields: true });
      const emailsRendered = component.getEmails();
      const telephonesRendered = component.getTelephones();
      it('renders all telephones grouped', () =>
        expect(telephonesRendered.everyWhere((telephone) => telephone.prop('isInline'))).toBeTruthy());
      describe('renders icon', () => {
        it('only one icon', () => expect(telephonesRendered.find({ icon: 'call' }).length).toBe(1));
        it('on the first one', () => expect(telephonesRendered.first().prop('icon')).toBe('call'));
      });

      it('renders all emails grouped', () =>
        expect(emailsRendered.everyWhere((email) => email.prop('isInline'))).toBeTruthy());
      describe('renders icon', () => {
        it('only one icon', () => expect(emailsRendered.find({ icon: 'mail' }).length).toBe(1));
        it('on the first one', () => expect(emailsRendered.first().prop('icon')).toBe('mail'));
      });
    });
  });
});
