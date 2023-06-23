import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, boolean, number, text } from '@storybook/addon-knobs';
import PaginationMatrix from './PaginationMatrix';

import README from '../README.md';

storiesOf('Components|PaginationMatrix', module)
  .addParameters({
    options: { theme: {} },
  })
  .addDecorator(withReadme(README))
  .addDecorator(withKnobs)
  .add('paginationMatrix', () => {
    class PaginationMatrixStory extends Component {
      constructor(props) {
        super(props);
        this.updateStateWithMoreColumns = this.updateStateWithMoreColumns.bind(this);

        const rowData = [
          ['11', '12', undefined, '14', '15', '16', '17', '18', '19', '20'],
          ['21', '22', undefined, '24', '25', '26', '27', '28', '29', '30'],
          ['31', '32', undefined, '34', '35', '36', '37', '38', '39', '40'],
          ['41', '42', undefined, '44', '45', '46', '47', '48', '49', '50'],
          ['51', '52', undefined, '54', '55', '56', '57', '58', '59', '60'],
        ];

        const regularRow = rowData[0].map((x) => ({ value: x }));

        const redRow = rowData[1].map((x) => ({ value: x, type: 'red' }));

        const blueRow = rowData[2].map((x) => ({ value: x, type: 'blue' }));

        const originalRow = rowData[4].map((x) => ({ value: x, type: 'original' }));

        const disabledRow = rowData[3].map((x) => ({ value: x, type: 'disabled' }));

        const formattedRows = [regularRow, redRow, blueRow, originalRow, disabledRow];

        this.state = {
          isLoading: false,
          matrixData: {
            headings: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            sideHeadings: ['07:00 - 10:00', '10:00 - 13:00', '13:00 - 15:00', '15:00 - 17:00', '17:00 - 20:00'],
            rows: formattedRows,
          },
        };
      }

      updateStateWithMoreColumns() {
        this.setState({ isLoading: true });

        const rowData = [
          ['11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'],
          ['21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'],
          ['31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45'],
          ['41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55'],
          ['51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65'],
        ];

        const regularRow = rowData[0].map((x) => ({ value: x }));

        const redRow = rowData[1].map((x) => ({ value: x, type: 'red' }));

        const blueRow = rowData[2].map((x) => ({ value: x, type: 'blue' }));

        const originalRow = rowData[4].map((x) => ({ value: x, type: 'original' }));

        const disabledRow = rowData[3].map((x) => ({ value: x, type: 'disabled' }));

        const formattedRows = [regularRow, redRow, blueRow, originalRow, disabledRow];

        setTimeout(() => {
          this.setState({
            isLoading: false,
            matrixData: {
              headings: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
              sideHeadings: ['07:00 - 10:00', '10:00 - 13:00', '13:00 - 15:00', '15:00 - 17:00', '17:00 - 20:00'],
              rows: formattedRows,
            },
          });
        }, 5000);
      }

      render() {
        return (
          <PaginationMatrix
            matrixData={this.state.matrixData}
            isLoading={boolean('Loading', this.state.isLoading)}
            onNextBatchRequest={this.updateStateWithMoreColumns}
            visibleColumns={number('Visible Columns', 5)}
            nextPageText={text('Next Page Text', 'NEXT SLOTS')}
            shouldShowNextButton={boolean('Show Next Button')}
            error={text('Error', '')}
            hightlightMatrix={boolean('Highlight matrix')}
          />
        );
      }
    }

    return <PaginationMatrixStory />;
  });
