import React from 'react';
import ReasonPicker from './ReasonPicker';
import { listItems, reasonItems } from './ReasonPicker.data.js';

class ReasonPickerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItems,
      reasonItems,
    };
  }

  handleListItemClick = (event, lineId, inputType) => {
    const checked = event.target.checked;
    this.setState((prevState) => {
      let newListItems = prevState.listItems;
      const itemLine = newListItems.find((item) => item.id === lineId);
      if (inputType === 'radio') {
        newListItems = newListItems.map((item) => {
          item.selected = item.id === lineId ? checked : !checked;
          if (item.id !== lineId) {
            item.reasonSelectedId = '';
          }
          return item;
        });
      } else {
        itemLine.selected = checked;
        itemLine.reasonSelectedId = checked ? itemLine.reasonSelectedId : '';
      }
      return {
        listItems: newListItems,
      };
    });
  };

  handleReasonChange = (event, lineId) => {
    const reasonId = event.target.value;
    this.setState((prevState) => {
      const newListItems = prevState.listItems;
      const itemLine = newListItems.find((item) => item.id === lineId);
      itemLine.reasonSelectedId = reasonId;
      return {
        listItems: newListItems,
      };
    });
  };

  render() {
    return (
      <ReasonPicker
        inputType={this.props.inputType}
        reasonType={this.props.reasonType}
        checkboxIconType={this.props.checkboxIconType}
        listItems={this.state.listItems}
        reasonItems={this.state.reasonItems}
        reasonPlaceholderTxt={this.props.reasonPlaceholderTxt}
        onReasonChange={this.handleReasonChange}
        onListItemClick={this.handleListItemClick}
      />
    );
  }
}

export default ReasonPickerContainer;
