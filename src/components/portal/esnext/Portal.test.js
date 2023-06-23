import { shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import Portal from './Portal';

ReactDOM.createPortal = jest.fn(() => new Error());

const children = <p>Render me!</p>;

describe('Portal', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Portal>{children}</Portal>);
  });

  it('exists', () => {
    expect(component).toExist();
  });

  it('defaults to body if the desired query selector is not found', () => {
    const containerElement = document.querySelector('body');
    expect(ReactDOM.createPortal).toHaveBeenLastCalledWith(children, containerElement);
  });
});
