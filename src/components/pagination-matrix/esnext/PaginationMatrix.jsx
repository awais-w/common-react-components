import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '@cmc/utils/esnext/isEmpty';
import Loading from '@cmc/loading/esnext/Loading';
import bem from '@argos/utils/esnext/bem';
import Button from '@cmc/cha-button/esnext/Button';
import Notification from '@cmc/cha-notification/esnext/Notification';
import './PaginationMatrix.scss';
import MatrixRow from './components/matrix-row/MatrixRow';
import MatrixHeadings from './components/matrix-headings/MatrixHeadings';

export function checkMatrixData(props, propName, componentName) {
  // get lengths
  const headingsLength = props.matrixData.headings && props.matrixData.headings.length;
  const sideHeadingsLength = props.matrixData.sideHeadings && props.matrixData.sideHeadings.length;
  const rowsLength = props.matrixData.rows && props.matrixData.rows.length;
  // check if data is empty or not
  const headingsEmpty = headingsLength === 0;
  const sideHeadingsEmpty = sideHeadingsLength === 0;
  const rowsEmpty = rowsLength === 0;
  // TODO: remove this variable and rather than assingning values to error we should return
  let error = null;
  // display error if no data is provided at all
  if (headingsEmpty && sideHeadingsEmpty && rowsEmpty) {
    error = new Error(
      `Invalid prop \`${propName}\` supplied to` +
        ` \`${componentName}\`. Validation failed. No data provided to ${propName}`,
    );
  }

  // display error if both headings and rows are empty
  if (headingsEmpty && rowsEmpty) {
    error = new Error(
      `Invalid prop \`${propName}\` supplied to` +
        ` \`${componentName}\`. Validation failed. No headings or rows provided to ${propName}`,
    );
  }

  // display error if there are side headings but not enough rows to match
  if (!sideHeadingsEmpty && props.matrixData.sideHeadings !== undefined) {
    if (sideHeadingsLength !== rowsLength) {
      error = new Error(
        `Invalid prop \`${propName}\` supplied to` +
          ` \`${componentName}\`. Validation failed. Sideheadings and rows should match up in ${propName}`,
      );
    }
  }

  if (!rowsEmpty && !headingsEmpty) {
    props.matrixData.rows.forEach((row) => {
      if (row.length !== headingsLength) {
        error = new Error(
          `Invalid prop \`${propName}\` supplied to` +
            ` \`${componentName}\`. Validation failed. Headings and rows should match up in ${propName}`,
        );
      }
    });
  }

  return error || null;
}

const propTypes = {
  /**
   * This is the data provided to the matrix
   * TODO: Consider validating deeper than this
   */
  matrixData: checkMatrixData,
  /**
   * Maximum number of cells which should be displayed before pagination
   */
  visibleColumns: PropTypes.number,
  /**
   * Show 'previous/next' buttons even if they need to be greyed out
   */
  alwaysShowPaginationButtons: PropTypes.bool,
  /**
   * Click handler for cells
   */
  onClickCell: PropTypes.func,
  /**
   * Determines whether the component is waiting or not
   */
  isLoading: PropTypes.bool,
  /**
   * Will take the place of the increment function if set
   */
  onNextBatchRequest: PropTypes.func,
  /**
   * The text displayed next to the pagination arrows
   */
  nextPageText: PropTypes.string,
  /**
   * Should we show the next button
   */
  shouldShowNextButton: PropTypes.bool,
  /**
   * An error message to display
   */
  error: PropTypes.string,
  /**
   * The column offset of the matrix to display
   */
  columnOffset: PropTypes.number,
};

const defaultProps = {
  matrixData: {},
  visibleColumns: 5,
  alwaysShowPaginationButtons: false,
  onClickCell: () => {},
  isLoading: false,
  onNextBatchRequest: null,
  nextPageText: 'NEXT SLOTS',
  shouldShowNextButton: true,
  error: '',
  hightlightMatrix: false,
  columnOffset: 0,
};

const cn = bem({ prefix: 'cmc-', block: 'pagination-matrix' });

class PaginationMatrix extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleColumns: this.props.visibleColumns,
      columnOffset: this.props.columnOffset,
      columnsShouldIncrementBy: this.props.visibleColumns - this.props.columnOffset,
      activeSetting: {
        rowId: null,
        columnId: null,
      },
    };

    this.handleShouldPageUpdate = this.handlePageUpdate.bind(this);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handlePrevPageClick = this.handlePrevPageClick.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!this.props.isLoading && prevProps.matrixData.headings.length !== this.props.matrixData.headings.length) {
      this.handlePageUpdate({ desiredDirection: 'next', newHeadings: prevProps.matrixData.headings });
    }
  }

  handlePrevPageClick() {
    this.handlePageUpdate({ desiredDirection: 'prev' });
  }

  handleNextPageClick() {
    this.handlePageUpdate({ desiredDirection: 'next' });
  }

  handlePageUpdate({ desiredDirection, newHeadings }) {
    const {
      onNextBatchRequest,
      matrixData: { headings },
    } = this.props;
    const { columnOffset, columnsShouldIncrementBy, visibleColumns } = this.state;

    /**
     * Based on the direction, we either add or subtract the incrementation number from the offset
     * This redraws the grid with new positional numbers
     */
    const directionalOffset = desiredDirection === 'prev' ? -columnsShouldIncrementBy : columnsShouldIncrementBy;
    const newOffset = columnOffset + directionalOffset;
    const newVisibleColumns = visibleColumns + directionalOffset;

    /**
     * After we've calculated the new positions above, we need check if there is data for those positions
     * We look to see if there is a heading in the heading array (first check in new prop heading array) for the new position
     * If there is, we redraw the table with that data
     * Otherwise we will call onNextBatchRequest to get more data
     */
    if ((!isEmpty(newHeadings) && newHeadings[newOffset]) || headings[newOffset]) {
      this.setState(() => ({
        columnOffset: newOffset,
        visibleColumns: newVisibleColumns,
      }));
    } else {
      onNextBatchRequest();
    }
  }

  handleCellClick(columnIndex, rowIndex) {
    this.props.onClickCell({ columnIndex, rowIndex });

    this.setState(() => ({
      activeSetting: {
        rowId: rowIndex,
        columnId: columnIndex,
      },
    }));
  }

  render() {
    const {
      matrixData: { headings, rows, sideHeadings },
      onNextBatchRequest,
      isLoading,
      alwaysShowPaginationButtons,
      nextPageText,
      shouldShowNextButton,
      error,
      hightlightMatrix,
    } = this.props;
    const { activeSetting, visibleColumns, columnOffset, columnsShouldIncrementBy } = this.state;
    // cell size is calculated based on how many cells should be shown
    const cellWidth = 100 / (columnsShouldIncrementBy + 1);

    const matrixHeadings = headings && (
      <MatrixHeadings
        headings={headings}
        columnOffset={columnOffset}
        visibleColumns={visibleColumns}
        activeSetting={activeSetting}
        cellWidth={cellWidth}
        hasSideHeaders={!isEmpty(sideHeadings)}
      />
    );

    const matrixRows =
      rows &&
      rows.map((row, rowIndex) => (
        <MatrixRow
          row={row}
          sideHeading={!isEmpty(sideHeadings) ? sideHeadings[rowIndex] : undefined}
          rowIndex={rowIndex}
          columnOffset={columnOffset}
          visibleColumns={visibleColumns}
          activeSetting={activeSetting}
          cellWidth={cellWidth}
          handleCellClick={this.handleCellClick}
          key={`row-${rowIndex}`}
        />
      ));

    // if headings are empty we still need to get a length.
    // We check the first row because if there are rows, the first one should be populated
    const incrementCheck = headings ? headings.length : rows && rows[0].length;
    const shouldTableDecrement = this.state.visibleColumns > columnsShouldIncrementBy;
    const shouldTableIncrement = onNextBatchRequest || incrementCheck > visibleColumns; // onNextBatchRequest !== null || incrementCheck > visibleColumns;

    const loading = (
      <div className={cn('row')}>
        <Loading height={170} fullScreen={false} />
      </div>
    );
    const matrix = (
      <Fragment>
        {error && <Notification mode='error'>{error}</Notification>}
        <div className={cn('table')}>
          {!isEmpty(headings) && matrixHeadings}
          {matrixRows}
          <div className={cn('arrow-container')}>
            {(this.props.alwaysShowPaginationButtons || shouldTableDecrement) && (
              <div className={cn('prev-arrow')}>
                <Button
                  isSecondary
                  isShort
                  buttonWidth='contentFit'
                  icon='navigate_before'
                  onClick={this.handlePrevPageClick}
                />
              </div>
            )}
            {(alwaysShowPaginationButtons || shouldTableIncrement || onNextBatchRequest) && shouldShowNextButton && (
              <div className={cn('next-arrow')}>
                <Button
                  isSecondary
                  isShort
                  buttonWidth='contentFit'
                  text={nextPageText}
                  icon='navigate_next'
                  iconMode='right'
                  onClick={this.handleNextPageClick}
                />
              </div>
            )}
          </div>
        </div>
      </Fragment>
    );
    return <div className={cn('matrix-grid', hightlightMatrix ? 'highlight' : '')}>{isLoading ? loading : matrix}</div>;
  }
}

PaginationMatrix.propTypes = propTypes;
PaginationMatrix.defaultProps = defaultProps;
export default PaginationMatrix;
