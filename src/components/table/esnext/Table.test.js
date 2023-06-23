import React from 'react';
import { shallow } from 'enzyme';
import Table, { rowValidationCheck } from './Table';
import { HEADINGS, generateTableData } from './MockProps';

const propName = 'tableData';
const componentName = 'CMCTableCP';

const setup = ({ props }) => {
  const component = shallow(<Table {...props} />);

  return {
    wrapper: component,
    getTable: () => component.find('.table'),
    getCMCTable: () => component.find('.CMCTable'),
    getStickyHeader: () => component.find('.sticky-header'),
    getStickyFirstColumn: () => component.find('.sticky-first-column'),
    getTableHeader: () => component.find('thead'),
    getTableHeaderRow: () => component.find('thead tr'),
    getTableHeadings: () => component.find('thead tr th'),
    getTableBody: () => component.find('tbody'),
    getTableBodyRows: () => component.find('tbody tr'),
    getFirstRow: () => component.find('tbody').find('tr').first(),
  };
};

describe('Table', () => {
  const DEFAULT_PROPS = {
    headings: HEADINGS,
    tableData: generateTableData({
      use: 'TEST',
      numberOfRows: 4,
      numberOfColumns: HEADINGS.length,
      rowsWithClickHandler: [0, 1],
      rowsHighlighted: [],
    }),
  };
  const component = setup({ props: DEFAULT_PROPS });

  it('has default classes', () => {
    expect(component.getCMCTable()).toHaveLength(1);
    expect(component.getStickyHeader()).toHaveLength(0);
    expect(component.getStickyFirstColumn()).toHaveLength(0);
  });

  describe('has the correct structure', () => {
    it('has a correct header', () => {
      expect(component.getTableHeader()).toHaveLength(1);
      expect(component.getTableHeaderRow()).toHaveLength(1);
    });

    it('has the correct headings', () => {
      expect(component.getTableHeadings().length).toBe(DEFAULT_PROPS.headings.length);
      component.getTableHeadings().forEach((head, index) => {
        expect(head.text()).toBe(DEFAULT_PROPS.headings[index].value);
      });
    });

    it('has single body item', () => {
      expect(component.getTableBody()).toHaveLength(1);
    });

    test('body has meny rows as elements in row', () => {
      expect(component.getTableBodyRows().length).toBe(DEFAULT_PROPS.tableData.length);
    });
  });

  describe('on each row', () => {
    component.getTableBodyRows().forEach((row, index) => {
      describe(`on row ${index}`, () => {
        if (DEFAULT_PROPS.tableData[index].onRowClick) {
          it('has an uncalled click handler', () => {
            expect(DEFAULT_PROPS.tableData[index].onRowClick).not.toBeCalled();
          });

          it('calls the onClick handler when clicking on row', () => {
            row.simulate('click');
            expect(DEFAULT_PROPS.tableData[index].onRowClick).toBeCalled();
          });
        }
        it(`has as many columns as elements on the array ${index}`, () => {
          expect(row.find('td').length).toBe(DEFAULT_PROPS.tableData[index].values.length);
        });
      });
    });
  });

  describe('with stick header', () => {
    const additionalProps = {
      ...DEFAULT_PROPS,
      stickyHeader: true,
      stickyFirstColumn: true,
    };

    it('loads correct classes', () => {
      expect(setup({ props: additionalProps }).getStickyHeader()).toHaveLength(1);
    });
  });

  describe('loads highlighted row', () => {
    const HIGHLIGHTED_PROPS = {
      headings: HEADINGS,
      tableData: generateTableData({
        use: 'TEST',
        numberOfRows: 4,
        numberOfColumns: HEADINGS.length,
        rowsWithClickHandler: [0, 1],
        rowsHighlighted: [0],
      }),
    };
    const componentWithRowHighlighted = setup({ props: HIGHLIGHTED_PROPS });
    expect(componentWithRowHighlighted.getFirstRow()).toHaveClassName('atc-toolbox-table__row--highlighted');
  });
});

describe('Table rows proptypes validator', () => {
  it('throws error when elements in table data are not same as of headings', () => {
    const oddNumberOfColumns = {
      headings: ['Heading 1', 'Heading 2'],
      tableData: [{ values: [<span key={1}>value1</span>], key: 'key' }],
    };
    const errorMessage = `Invalid prop ${propName} supplied to
                  ${componentName}. Validation failed. All elements of ${propName} should have the same number of elements as headings has`;
    const result = rowValidationCheck(oddNumberOfColumns, propName, componentName);
    expect(result instanceof Error).toBe(true);
    expect(result.message).toBe(errorMessage);
  });

  it('does not throws error when elements in table data are same as of headings', () => {
    const result = rowValidationCheck(
      {
        headings: [1, 2],
        tableData: [
          {
            values: [<span key={1}>value1</span>, <span key={1}>value2</span>],
            key: 'key',
          },
        ],
      },
      propName,
      componentName,
    );
    expect(result).toBeNull();
  });

  it('throws error when row does not contain array of values', () => {
    const missingValuesPropOnRow = {
      headings: ['Heading 1', 'Heading 2'],
      tableData: [{ random: null, key: 'key' }],
    };

    const errorMessage = `Invalid prop ${propName} supplied to
              ${componentName}. Validation failed. Each row should contain an array of values`;

    const result = rowValidationCheck(missingValuesPropOnRow, propName, componentName);
    expect(result instanceof Error).toBe(true);
    expect(result.message).toBe(errorMessage);
  });

  it('throws error when row is an object rather than array', () => {
    const valuesPropNotArray = {
      headings: ['Heading 1', 'Heading 2'],
      tableData: { random: null, key: 'key' },
    };

    const errorMessage = `Invalid prop ${propName} supplied to
          ${componentName}. Validation failed. rows should be an array`;

    const result = rowValidationCheck(valuesPropNotArray, propName, componentName);
    expect(result instanceof Error).toBe(true);
    expect(result.message).toBe(errorMessage);
  });

  it('throws error when row does not contains a key', () => {
    const missingKeyPropOnRow = {
      headings: ['Heading 1', 'Heading 2'],
      tableData: [
        {
          values: [<span key={1}>value1</span>],
        },
      ],
    };

    const errorMessage = `Invalid prop ${propName} supplied to
              ${componentName}. Validation failed. Each row should contain a key`;

    const result = rowValidationCheck(missingKeyPropOnRow, propName, componentName);
    expect(result instanceof Error).toBe(true);
    expect(result.message).toBe(errorMessage);
  });
});
