import React from 'react';
import { shallow } from 'enzyme';
import { stub } from 'sinon';
import Icon from './Icon';

describe('Icon', () => {
  it('Has the right icon', () => {
    const cp = shallow(<Icon icon='anyIcon' />);
    expect(cp.find('i')).toExist();
    expect(cp).toHaveText('anyIcon');
  });

  it('Has the right ID', () => {
    expect(shallow(<Icon icon='anyIcon' id='myID' />)).toHaveProp('id', 'myID');
    expect(shallow(<Icon icon='anyIcon' />)).toHaveProp('id', undefined);
  });

  it('Has the right className', () => {
    expect(shallow(<Icon icon='anyIcon' disabled={true} />)).toHaveClassName('cmc-icon disabled');
    expect(shallow(<Icon icon='anyIcon' isCustom={true} />)).toHaveClassName('cmc-icon-custom');
    expect(shallow(<Icon icon='anyIcon' />)).toHaveClassName('cmc-icon');
    expect(shallow(<Icon icon='anyIcon' color='red' />)).toHaveClassName('cmc-icon--red');
  });

  it('Has the right handler', () => {
    const handler = stub();
    expect(shallow(<Icon icon='anyIcon' onClick={handler} />)).toHaveProp('onClick', handler);
  });
});
