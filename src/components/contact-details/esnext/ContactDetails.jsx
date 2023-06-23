import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import IconLabelValue from '@cmc/icon-label-value/esnext';
import bem from '@argos/utils/esnext/bem';
import { formatName } from '@cmc/utils/esnext';

const cn = bem({ block: 'ContactDetails' });

const ContactDetails = ({ telephones = [], emails = [], person = {}, business, groupFields }) => {
  const telephoneCPs = telephones.map((telephone, index) => (
    <IconLabelValue
      isInline={groupFields}
      icon={groupFields && index ? '' : 'call'}
      label={telephones.length > 1 && telephone.type}
      value={telephone.number}
      key={`telephone-${telephone.number}`}
    />
  ));
  const emailCPs = emails.map((email, index) => (
    <IconLabelValue
      isInline={groupFields}
      icon={groupFields && index ? '' : 'mail'}
      label={emails.length > 1 && email.type}
      value={email.address}
      key={`email-${email.address}`}
    />
  ));

  return (
    <Fragment>
      {business && (
        <div className={cn('business')}>
          <IconLabelValue icon='business_center' value={business} />
        </div>
      )}
      <div className={cn('full-name')}>
        <IconLabelValue icon='person' value={(person.name || person.surname) && formatName({ ...person })} />
      </div>
      <div className={cn('telephones')}>{telephoneCPs}</div>
      <div className={cn('emails')}>{emailCPs}</div>
    </Fragment>
  );
};

ContactDetails.propTypes = {
  business: PropTypes.string,
  person: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string.isRequired,
    middleName: PropTypes.string,
    surname: PropTypes.string.isRequired,
  }).isRequired,
  emails: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      address: PropTypes.string.isRequired,
    }),
  ),
  telephones: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      number: PropTypes.string.isRequired,
    }),
  ),
  groupFields: PropTypes.bool,
};
export default ContactDetails;
