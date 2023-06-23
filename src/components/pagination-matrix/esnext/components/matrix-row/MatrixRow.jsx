import React from 'react';
import PropTypes from 'prop-types';
import bem from '@argos/utils/esnext/bem';
import './MatrixRow.scss';
import MatrixCell from '../matrix-cell/MatrixCell';

/**
 * This component displays a simple loading animation
 *
 * @param row the data for the row
 * @param sideHeading the data for row header
 * @param rowIndex the index for the row
 * @param columnOffset the first cell index to be displayed in the row
 * @param visibleColumns the number of columns to be displayed
 * @param activeSetting an object containing the row and column index of the currently selected cell
 * @param cellWidth the width of each cell
 * @param handleCellClick the function to be called when a cell is clicked
 */

const cn = bem({ prefix: 'cmc-', block: 'pagination-matrix' });

const MatrixRow = ({
  row,
  sideHeading,
  rowIndex,
  columnOffset,
  visibleColumns,
  activeSetting,
  cellWidth,
  handleCellClick,
}) => {
  const isActiveRow = activeSetting.rowId === rowIndex;

  const rowStart = sideHeading && (
    <div
      className={`${cn('side-heading', isActiveRow ? 'active' : '')}`}
      style={{ width: `${cellWidth}%` }}
      key={`sideheading-${rowIndex}`}
      id={`sideheading-${rowIndex}`}>
      {sideHeading}
    </div>
  );

  const cells = row.map(
    (cell, columnIndex) =>
      // We look to see if the cell should be shown, based on it's position
      columnIndex >= columnOffset &&
      columnIndex < visibleColumns && (
        <MatrixCell
          cell={cell}
          columnIndex={columnIndex}
          rowIndex={rowIndex}
          cellWidth={cellWidth}
          onClick={handleCellClick}
          isActive={isActiveRow && activeSetting.columnId === columnIndex}
          key={`row-${rowIndex}-column${columnIndex}`}
        />
      ),
  );

  return (
    <div className={cn('row')} key={`row-${rowIndex}`} id={`row-${rowIndex}`}>
      {rowStart}
      {cells}
    </div>
  );
};

MatrixRow.propTypes = {
  row: PropTypes.array,
  sideHeading: PropTypes.string,
  rowIndex: PropTypes.number,
  columnOffset: PropTypes.number,
  visibleColumns: PropTypes.number,
  activeSetting: PropTypes.object,
  cellWidth: PropTypes.number,
  handleCellClick: PropTypes.func,
};

export default MatrixRow;
