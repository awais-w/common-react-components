import React, { PureComponent } from 'react';
import CustomerMarketingPreferences from './esnext/CustomerMarketingPreferences';
import dummyMarketingPreferences from './dummyMarketingPreferences';

class CustomerMarketingPreferencesWrapper extends PureComponent {
  state = {
    email: dummyMarketingPreferences.email,
    consents: dummyMarketingPreferences.consents,
  };

  handleUpdateConsent = () => {
    this.setState({
      consents: [
        {
          mission: 'AFS',
          missionCustomerId: null,
          missionConsents: [
            {
              id: 11804,
              communicationChannel: 'EMAIL',
              mission: 'AFS',
              touchpoint: 'Guest Checkout',
              consent: 'N',
              datetime: 1501072010573,
            },
          ],
        },
        {
          mission: 'ARGOS',
          missionConsents: [
            {
              consent: 'N',
              communicationChannel: 'Email',
            },
          ],
        },
      ],
    });
  };

  render() {
    return (
      <CustomerMarketingPreferences
        email={this.state.email}
        consents={this.state.consents}
        updateConsentData={this.handleUpdateConsent}
      />
    );
  }
}

export default CustomerMarketingPreferencesWrapper;
