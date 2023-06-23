import React from 'react';
import { shallow } from 'enzyme';
import MatrixRow from './MatrixRow';

const stubFunction = jest.fn();

const inactiveRowProps = {
  row: [{ value: '1' }, { value: '2' }, { value: '3' }, { value: '4' }],
  sideHeading: '10:30am',
  rowIndex: 0,
  columnOffset: 0,
  visibleColumns: 4,
  activeSetting: {
    rowId: 1,
    columnId: 0,
  },
  cellWidth: 25,
  handleCellClick: stubFunction,
};

const activeRowProps = {
  ...inactiveRowProps,
  rowIndex: 0,
  activeSetting: {
    rowId: 0,
    columnId: 0,
  },
};

const setup = ({ props }) => {
  const component = shallow(<MatrixRow {...props} />);
  return {
    wrapper: component,
    getSideHeading: () => component.find('.cmc-pagination-matrix__side-heading'),
    getCells: () => component.find('MatrixCell'),
  };
};

describe('<MatrixRow />', () => {
  describe('with props set using inactive row props', () => {
    const component = setup({ props: inactiveRowProps });
    describe('the row', () => {
      it('should have the correct values in each cell', () => {
        const rowCells = component.getCells();

        rowCells.forEach((cell, cellIndex) => {
          const cellValueFromRender = cell.props().cell;
          const cellValueFromProps = inactiveRowProps.row[cellIndex];
          expect(cellValueFromRender).toBe(cellValueFromProps);
        });
      });

      it('should pass the cell the correct cell width', () => {
        expect(
          component
            .getCells()
            .at(0)
            .props().cellWidth,
        ).toBe(inactiveRowProps.cellWidth);
      });

      it('sets isActive to false', () => {
        expect(
          component
            .getCells()
            .at(0)
            .props().isActive,
        ).toEqual(false);
      });
    });

    describe('the side header', () => {
      it('should have the correct width', () => {
        expect(component.getSideHeading().props().style.width).toBe(`${inactiveRowProps.cellWidth}%`);
      });

      it('should have the correct class name', () => {
        expect(component.getSideHeading().props().className).toContain('cmc-pagination-matrix__side-heading');
      });
    });
  });

  describe('with props set using active row props', () => {
    const component = setup({ props: activeRowProps });
    it('sets isActive to true for the active cell', () => {
      expect(
        component
          .getCells()
          .at(0)
          .props().isActive,
      ).toEqual(true);
    });
    it('should have the correct class name', () => {
      expect(component.getSideHeading().props().className).toContain('cmc-pagination-matrix__side-heading--active');
    });
  });
});
