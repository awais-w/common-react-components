import React from 'react';
import PropTypes from 'prop-types';
import bem from '@argos/utils/esnext/bem';
import InputSelection from '@cmc/input-selection/esnext/InputSelection';
import uuid from 'uuid';
import './ReasonPicker.scss';

const cn = bem({ prefix: 'cmc', block: '-reason-picker' });

const ReasonPicker = ({
  listItems,
  reasonItems,
  reasonPlaceholderTxt,
  onListItemClick,
  onReasonChange,
  checkboxIconType,
  inputType,
  reasonType,
}) => {
  const dropDown = (listItemId, reasonSelectedId) => {
    const selectedReason = reasonItems.find((reason) =>
      reasonSelectedId ? reason.id === reasonSelectedId : reason.selected,
    );
    return (
      <select
        className='form-control'
        defaultValue={selectedReason && selectedReason.id}
        onChange={(event) => onReasonChange(event, listItemId)}>
        {reasonItems.map((reason) => {
          const { id, description } = reason;
          return (
            <option value={id} key={`option-${id}`}>
              {description}
            </option>
          );
        })}
      </select>
    );
  };

  const uniqueId = uuid.v4();

  return (
    <div className={cn()}>
      <ul>
        {listItems.map((item) => {
          const { id, content, reasonSelectedId, selected } = item;
          return (
            <li className={cn('line')} key={id}>
              <InputSelection
                checkboxIconType={checkboxIconType}
                id={`input-${uuid.v4()}`}
                inputType={inputType}
                value={id}
                name={inputType === 'radio' ? `radio-selection-${uniqueId}` : `checkbox-${uuid.v4()}`}
                onChange={(event) => onListItemClick(event, id, inputType)}
                checked={!!selected}>
                {content.map((token, index) => (
                  <span key={`${id}-${index}`}>
                    <strong>{token.key}</strong>
                    {token.value}
                  </span>
                ))}
              </InputSelection>
              {!!selected && (
                <React.Fragment key={`select-${id}`}>
                  {reasonType === 'list' ? (
                    dropDown(id, reasonSelectedId)
                  ) : (
                    <span className={cn('textarea')}>
                      <textarea
                        className='form-control'
                        name={`textarea-${uuid.v4()}`}
                        placeholder={reasonPlaceholderTxt}
                        id={`textarea-${id}`}
                        onChange={(event) => onReasonChange(event, id)}
                      />
                    </span>
                  )}
                </React.Fragment>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

ReasonPicker.propTypes = {
  listItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
        }),
      ),
      selected: PropTypes.bool,
      reasonSelectedId: PropTypes.string,
    }),
  ),
  reasonItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      selected: PropTypes.bool,
    }),
  ),
  onListItemClick: PropTypes.func,
  onReasonChange: PropTypes.func,
  reasonPlaceholderTxt: PropTypes.string,
  checkboxIconType: PropTypes.oneOf(['tick', 'cross']),
  inputType: PropTypes.oneOf(['checkbox', 'radio']).isRequired,
  reasonType: PropTypes.oneOf(['list', 'text']).isRequired,
};

ReasonPicker.defaultProps = {
  inputType: 'radio',
  reasonType: 'list',
  listItems: [],
  reasonItems: [],
  isItemChecked: () => {},
  onListItemClick: () => {},
  onReasonChange: () => {},
};

export default ReasonPicker;
