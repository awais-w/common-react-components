import React from 'react';
import { shallow } from 'enzyme';
import Loading from '@cmc/loading/esnext/Loading';
import Notification from '@cmc/cha-notification/esnext/Notification';
import StoreLookup from './StoreLookup';
import StoresTable from './components/stores-table/StoresTable';

const defaultProps = {
  postcode: 'NE1 1EE',
};

const setup = (props) => {
  const component = shallow(<StoreLookup {...props} />);

  return {
    wrapper: component,
    getLoading: () => component.find(Loading),
    getNotification: () => component.find(Notification),
    getStoreTable: () => component.find(StoresTable),
    getRetry: () => component.find('.cmc-store-lookup__retry'),
  };
};

describe('Store Lookup', () => {
  const component = setup(defaultProps);

  it('renders Loading component when loading', () => {
    expect(component.getLoading().exists).toBeTruthy();
  });

  it('renders StoresTable when not loading and has stores', () => {
    component.wrapper.setState({
      isLoading: false,
      stores: [1, 2, 3],
    });
    expect(component.getStoreTable().exists).toBeTruthy();
  });

  it('renders Notification when not loading and no stores', () => {
    component.wrapper.setState({
      isLoading: false,
      stores: [],
    });
    expect(component.getNotification().exists).toBeTruthy();
  });

  it('renders the retry when not loading and no stores', () => {
    component.wrapper.setState({
      isLoading: false,
      stores: [],
    });
    expect(component.getRetry().exists).toBeTruthy();
  });
});
