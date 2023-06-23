import React from 'react';
import PropTypes from 'prop-types';
import bem from '@argos/utils/esnext/bem';
import Toggle from '@cmc/toggle/esnext/Toggle';
import './CustomerMarketingPreferences.scss';
import Button from '@cmc/cha-button/esnext/Button';

const cn = bem({ prefix: 'cmc-', block: 'customer-marketing-preferences' });

const propTypes = {
  /**
   * Email to be updated with preferences
   */
  email: PropTypes.string,
  /**
   * Array of all consent types, each element is it's own mission, AFS, ARGOS, BANK, etc.
   */
  consents: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Mission types, AFS, ARGOS, BANK, etc.
       */
      mission: PropTypes.string,
      /**
       * Array of mission types, email, phone, etc.
       */
      missionConsents: PropTypes.arrayOf(
        PropTypes.shape({
          /**
           * Communication channel, email, phone, etc.
           */
          communicationChannel: PropTypes.string,
          /**
           * Consent Enum, Y, N, etc.
           */
          consent: PropTypes.string,
        }),
      ),
    }),
  ),
  /**
   * Helper function to update consent data for specific email and missions
   */
  updateConsentData: PropTypes.func.isRequired,
};

const defaultProps = {
  consents: [],
  email: '',
};

const CustomerMarketingPreferences = ({ consents, email, updateConsentData }) => (
  <div className={`${cn()} container`}>
    <p className={cn('message')}>
      When you opt in, we will send you information on promotions and special offers. This could be through, post, by
      email, text message or push notifications on our apps. Make sure you don&apos;t miss out.
    </p>

    <article>
      <ul className={cn('item-container')}>
        {consents.map((consentTypes) =>
          consentTypes.missionConsents.map((missionConsent) => {
            const { consent, communicationChannel } = missionConsent;
            // mission only exists on higher node consentTypes, so is de-structured from consentTypes
            const { mission } = consentTypes;
            const selected = consent === 'Y';
            const toggleLabel = `${mission} - ${communicationChannel}`;

            // Consent is unset, show button
            if (consent === null) {
              const updateConsent = () => {
                // Default initialise to Y
                updateConsentData({
                  email,
                  mission,
                  consent: 'Y',
                });
              };

              return (
                <li key={`${mission}${communicationChannel}-unset`} className={cn('item')}>
                  <span className={cn('item-label')}>{`${toggleLabel} is not set`}</span>
                  <span>
                    <Button onClick={updateConsent} text={'Set Preference'} />
                  </span>
                </li>
              );
            }

            // Consent is set, show toggle
            const updateConsent = (value) => {
              updateConsentData({
                email,
                mission,
                consent: value === true ? 'Y' : 'N',
              });
            };

            return (
              <li key={`${mission}${communicationChannel}`} className={cn('item')}>
                <Toggle selected={selected} onSelect={updateConsent} text={toggleLabel} />
              </li>
            );
          }),
        )}
      </ul>
    </article>
  </div>
);

CustomerMarketingPreferences.propTypes = propTypes;
CustomerMarketingPreferences.defaultProps = defaultProps;
export default CustomerMarketingPreferences;
