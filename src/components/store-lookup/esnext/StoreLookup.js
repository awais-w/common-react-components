import React, { Component } from 'react';
import Loading from '@cmc/loading/esnext';
import Notification from '@cmc/cha-notification/esnext/Notification';
import propTypes from './StoreLookup.propTypes';
import StoresTable from './components/stores-table/StoresTable';
import './StoreLookup.scss';

class StoreLookup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      stores: [],
    };
  }

  componentDidMount() {
    this.fetchStores();
  }

  componentDidUpdate(prevProps) {
    if (this.props.postcode !== prevProps.postcode) {
      this.fetchStores();
    }
  }

  fetchStores = () => {
    this.setState({ isLoading: true });
    const { authToken, postcode, storesEndpoint } = this.props;
    const cleanPostcode = postcode.replace(/\s/g, '');

    fetch(`${storesEndpoint}?postcode=${cleanPostcode}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const stores = data.map((store) => ({
          id: store.id,
          name: store.name,
          distance: `${store.distance.value} ${store.distance.units}`,
          address: `${store.address.line1}, ${store.address.town}, ${store.address.county}, ${store.address.country}, ${store.address.postCode}`,
          phoneNumber: store.telephone.number,
          openingHours: store.openingHours,
        }));

        this.setState({
          isLoading: false,
          stores,
        });
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { isLoading, stores } = this.state;
    const { errorMessage } = this.props;

    return isLoading ? (
      <Loading />
    ) : stores.length ? (
      <StoresTable stores={stores} />
    ) : (
      <Notification mode='error'>
        <span>Unable to load the stores.</span>
        <span onClick={this.fetchStores} className={'cmc-store-lookup__retry'}>
          Retry
        </span>
        <span>{errorMessage}</span>
      </Notification>
    );
  }
}

StoreLookup.propTypes = propTypes;
export default StoreLookup;
