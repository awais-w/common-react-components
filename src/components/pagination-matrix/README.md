# Pagination Matrix

## Usage

Used to create a selectable paginated matrix component, e.g. for delivery slots.

## Props

- <b>matrixData</b> - An object containing the values to be shown in the matrix

  - <b>headings</b> - An array containing the values to be shown in the top header of the matrix
  - <b>sideHeadings</b> - An array containing the values to be displayed on the side header of the matrix
  - <b>rows</b> - A two dimensional array containing the values to be displayed in the matrix, formatted as an array of rows
    ```javascript
    matrixData: {
        headings: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        sideHeadings: ['07:00', '10:00', '13:00'],
        rows: [ [{ value: '11'}, { value: '12' }, { value: '13' }, { value: '14' }, { value: '15'}],
                [{ value: '16', type='red' }, { value: '17', type='red' }, { value: '18', type='red' }, { value: '19', type='red' }, { value: '20', type='red' }],
                [{ value: '21', type='blue' }, { value: '22', type='blue' }, { value: '22', type='blue' }, { value: '22', type='blue' }, { value: '22', type='blue' }],
                [{ value: '26', type='original' }, { value: '27', type='original' }, { value: '28', type='original' }, { value: '29', type='original' }, { value: '30', type='original' }],
                [{ value: '31', type='disabled' }, { value: '32', type='disabled' }, { value: '33', type='disabled' }, { value: '34', type='disabled' }, { value: '35', type='disabled' }]
        ]
    }
    ```
    - Note: the rows field is an array of arrays containing objects which represent a cell in the matrix.
    - The object contains a `type` field which can be one of the following:
      `['red', 'blue', 'original', 'disabled']` ~ it may also be omitted which results in the default cell value.
    - The structure of this object is
    ```
        {
            value: "10",
            type: "red"
        }
    ```

- <b>isLoading</b> - A boolean flag set to true if loading
- <b>onNextBatchRequest</b> - A function which defines the functionality for getting the next batch
- <b>shouldShowNextButton</b> - A flag to say whether we should show the next button
- <b>error</b> - An error message to display

#### Disabling Cells

To disable a cell the type of the cell should be set to 'disabled'.
