import React from 'react';
import PropTypes from 'prop-types';
import bem from '@argos/utils/esnext/bem';
import './MatrixCell.scss';
import Icon from '@cmc/icon/esnext/Icon';

/**
 * This component displays a simple loading animation
 *
 * @param cell the data in the cell
 * @param columnIndex the column index
 * @param rowIndex the row index
 * @param cellWidth the width of a cell as a percentage
 * @param onClick the method to be called when a cell is clicked
 * @param isActive boolean flagging if the cell is the active cell
 */

const cn = bem({ prefix: 'cmc-', block: 'pagination-matrix' });

const cellTypes = ['disabled', 'red', 'blue', 'original', '', undefined];

const MatrixCell = ({ cell, columnIndex, rowIndex, cellWidth, onClick, isActive }) => {
  let value = cell.value || (isActive && <Icon icon='done' />) || (cell.type === 'original' && <Icon icon='remove' />);
  value = cell.type === 'disabled' ? <Icon icon='block' color='white' /> : value;

  return (
    <div
      className={`${cn('cell', isActive ? 'active' : cell.type)}`}
      style={{ width: `${cellWidth}%` }}
      onClick={cell.type !== 'disabled' && cell.type !== 'original' ? () => onClick(columnIndex, rowIndex) : undefined}
      key={`row-${rowIndex}-column-${columnIndex}`}>
      {value}
    </div>
  );
};

MatrixCell.propTypes = {
  cell: PropTypes.shape({
    value: PropTypes.string,
    type: PropTypes.oneOf(cellTypes),
  }),
  columnIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  cellWidth: PropTypes.number,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
};

export default MatrixCell;
