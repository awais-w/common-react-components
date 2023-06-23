import React from 'react';
import { shallow } from 'enzyme';

import Example from './Example';

describe('Basic unit testing example for Example component', () => {
  const setup = ({ text, isExtraTextDisplayed, onClick }) => {
    const component = shallow(<Example text={text} isExtraTextDisplayed={isExtraTextDisplayed} onClick={onClick} />);
    return {
      wrapper: component,
      getH1: () => component.find('.cmc-example__clickable').find('h1'),
      getClickHandler: () => component.find('.cmc-example__clickable').prop('onClick'),
      findClickableElement: () => component.find('.cmc-example__clickable'),
      findExtraText: () => component.find('.cmc-example__extra-text'),
    };
  };

  describe('With required props', () => {
    const component = setup({ text: 'Text' });
    it('Should render the text prop on an element with Example class', () => {
      expect(component.wrapper).toExist();
      expect(component.wrapper).toHaveClassName('cmc-example');
      expect(component.getH1().text()).toBe('Text');
    });
    it("shouldn't render the extra text", () => {
      expect(component.findExtraText()).not.toExist();
    });
  });

  describe('With an onClick prop', () => {
    const onCLickHandler = jest.fn();
    const component = setup({ text: 'Text', onClick: onCLickHandler });
    it('should attach the same handler I passed as a prop', () => {
      expect(component.getClickHandler()).toBe(onCLickHandler);
    });
    it("shouldn't have called the onClick handler if never clicked", () => {
      expect(component.getClickHandler()).not.toHaveBeenCalled();
    });
    it('should call the onClick handler after clicking', () => {
      component.findClickableElement().simulate('click');
      expect(component.getClickHandler()).toHaveBeenCalled();
    });
  });
  describe('With isExtraTextDisplayed', () => {
    it('should render the extra test', () => {
      const component = setup({ text: 'Text', isExtraTextDisplayed: true });
      expect(component.findExtraText()).toExist();
    });
  });
});
