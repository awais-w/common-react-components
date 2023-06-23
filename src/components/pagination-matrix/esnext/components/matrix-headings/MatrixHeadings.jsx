import React from 'react';
import PropTypes from 'prop-types';
import bem from '@argos/utils/esnext/bem';
import './MatrixHeadings.scss';

/**
 * This component displays a simple loading animation
 *
 * @param headings the data to be displayed in the headers
 * @param columnOffset the first cell index to be displayed in the row
 * @param visibleColumns the number of columns to be displayed
 * @param activeSetting an object containing the row and column index of the currently selected cell
 * @param cellWidth the width of each cell
 * @param hasSideHeaders a boolean flag set to true when the matrix has side headers
 */

const cn = bem({ prefix: 'cmc-', block: 'pagination-matrix' });

const MatrixHeadings = ({ headings, columnOffset, visibleColumns, activeSetting, cellWidth, hasSideHeaders }) => {
  const matrixHeadings = headings.map(
    (heading, headingIndex) =>
      // Check if the header cell should be displayed
      headingIndex >= columnOffset &&
      headingIndex < visibleColumns && (
        <div
          className={`${cn('heading', activeSetting.columnId === headingIndex ? 'active' : '')}`}
          style={{ width: `${cellWidth}%` }}
          key={`heading-${headingIndex}`}
          id={`heading-${headingIndex}`}>
          {heading}
        </div>
      ),
  );

  return (
    <div className={cn('row')}>
      {hasSideHeaders && <div className={cn('blank')} style={{ width: `${cellWidth}%` }} />}
      {matrixHeadings}
    </div>
  );
};

MatrixHeadings.propTypes = {
  headings: PropTypes.array,
  columnOffset: PropTypes.number,
  visibleColumns: PropTypes.number,
  activeSetting: PropTypes.object,
  cellWidth: PropTypes.number,
  hasSideHeaders: PropTypes.bool,
};

export default MatrixHeadings;
