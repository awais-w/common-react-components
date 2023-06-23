import React from 'react';
import { shallow } from 'enzyme';
import StoresTable from './StoresTable';
import StoreDetails from '../store-details/StoreDetails';

const defaultProps = {
  stores: [
    {
      id: '123',
    },
    {
      id: '234',
    },
  ],
};

describe('StoresTable', () => {
  const component = shallow(<StoresTable {...defaultProps} />);

  it('matches the snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('renders the StoreDetails component with the correct props', () => {
    expect(
      component
        .find(StoreDetails)
        .first()
        .props().id,
    ).toBe(defaultProps.stores[0].id);
  });
});
