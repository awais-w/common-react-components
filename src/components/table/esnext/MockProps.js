import { action } from '@storybook/addon-actions';

export function generateTableData({
  use,
  numberOfRows,
  numberOfColumns,
  rowsWithClickHandler = [],
  rowsHighlighted = [],
}) {
  if (rowsWithClickHandler.some((index) => index > numberOfRows)) {
    throw new Error('Wrong arguments: index on rowsWithClickHandler higher than number of rows');
  }
  if (rowsHighlighted.some((index) => index > numberOfRows)) {
    throw new Error('Wrong arguments: index on rowsWithClickHandler higher than number of rows');
  }

  const result = Array.from(Array(numberOfRows).keys()).map((row, rowIndex) => {
    const clickHandler = (() => {
      switch (use) {
        case 'TEST':
          return jest.fn();
        case 'STORY':
          return action();
        default:
          return null;
      }
    })();
    const values = Array.from(Array(numberOfColumns).keys()).map((value, columnIndex) => ({
      key: columnIndex,
      value: `value${columnIndex}`,
    }));
    return {
      onRowClick: rowsWithClickHandler.includes(rowIndex) ? clickHandler : null,
      isHighlighted: rowsHighlighted.includes(rowIndex),
      key: `rowKey${rowIndex}`,
      values,
    };
  });
  return result;
}

export const HEADINGS = [
  {
    value: 'Heading 1',
    key: 'Heading 1',
  },
  {
    value: 'Heading 2',
    key: 'Heading 2',
  },
  {
    value: 'Heading 3',
    key: 'Heading 3',
  },
];
