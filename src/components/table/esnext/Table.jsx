import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import bem from '@argos/utils/esnext/bem';
import './toolbox-table.scss';
import './Table.scss';

const cn = bem({ prefix: 'atc-toolbox-', block: 'table' });

export function rowValidationCheck({ tableData, headings }, propName, componentName) {
  if (tableData instanceof Array) {
    let error = null;
    tableData.forEach((row) => {
      if (Object.keys(row).includes('values')) {
        if (row.values.length !== headings.length) {
          error = new Error(`Invalid prop ${propName} supplied to
                  ${componentName}. Validation failed. All elements of ${propName} should have the same number of elements as headings has`);
        }
      } else {
        error = new Error(`Invalid prop ${propName} supplied to
              ${componentName}. Validation failed. Each row should contain an array of values`);
      }

      if (!Object.keys(row).includes('key')) {
        error = new Error(`Invalid prop ${propName} supplied to
              ${componentName}. Validation failed. Each row should contain a key`);
      }
    });
    return error || null;
  }

  return new Error(`Invalid prop ${propName} supplied to
          ${componentName}. Validation failed. rows should be an array`);
}

const Table = ({ headings, stickyHeader, stickyFirstColumn, tableData, styles, striped, bordered }) => {
  const tblClassNames = classNames('CMCTable', {
    'sticky-header': stickyHeader,
    'sticky-first-column': stickyFirstColumn,
  });
  return (
    <div className={cn(null, null)}>
      <div className={cn('container', null)}>
        <table className={tblClassNames}>
          <thead className={cn('header', null)}>
            <tr>
              {headings &&
                headings.map((heading, index) => (
                  <th
                    className={cn('header__cell', null)}
                    key={`${heading.key ? heading.key : index}`}
                    // TODO: replace styles prop with a more defined prop, currently styles prop is only used to set vertical alignment
                    style={styles && { verticalAlign: `${styles.verticalAlign}` }}>
                    <h3 className={cn('header__cell__label', null)}>{heading.value}</h3>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {tableData &&
              tableData.map((row) => {
                const rowClasses = classNames({
                  [cn('row', 'highlighted')]: row.isHighlighted,
                  [cn('body__row')]: !(striped || row.onRowClick),
                  [cn('body__row', 'striped')]: striped,
                  [cn('body__row', 'hovered')]: row.onRowClick,
                });
                const cellClasses = cn('body__row__cell', bordered ? 'bordered' : '');

                return (
                  <tr key={row.key} onClick={row.onRowClick} className={rowClasses}>
                    {row.values.map((field, i) => {
                      const cellProps = {
                        className: cellClasses,
                        style: styles ? { verticalAlign: `${styles.verticalAlign}` } : {},
                      };

                      const cellContent = field ? <span>{field.value || field}</span> : null;

                      return (
                        <td key={i} {...cellProps}>
                          {cellContent}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Table.propTypes = {
  headings: PropTypes.array,
  tableData: rowValidationCheck,
  stickyHeader: PropTypes.bool,
  stickyFirstColumn: PropTypes.bool,
  styles: PropTypes.shape({
    verticalAlign: PropTypes.oneOf(['middle', 'bottom']),
  }),
};

export default Table;
