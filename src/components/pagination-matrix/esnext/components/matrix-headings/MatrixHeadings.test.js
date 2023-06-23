import React from 'react';
import { shallow } from 'enzyme';
import MatrixHeadings from './MatrixHeadings';

const defaultProps = {
  headings: ['1', '2', '3', '4'],
  columnOffset: 0,
  visibleColumns: 4,
  cellWidth: 25,
  hasSideHeaders: true,
  activeSetting: {
    rowId: null,
    columnId: null,
  },
};

const setup = ({ props }) => {
  const component = shallow(<MatrixHeadings {...props} />);
  return {
    wrapper: component,
    getTopLeftCornerCell: () => component.find('.cmc-pagination-matrix__blank'),
    getHeadingCells: () => component.find('.cmc-pagination-matrix__heading'),
  };
};

describe('<MatrixHeadings />', () => {
  describe('with props set from default props', () => {
    const component = setup({ props: defaultProps });
    describe('the heading row', () => {
      it('should have one blank cell', () => {
        expect(component.getTopLeftCornerCell().length).toBe(1);
      });

      describe('and the heading cells', () => {
        it('should be be the same length as the props', () => {
          expect(component.getHeadingCells().length).toBe(defaultProps.headings.length);
        });

        it('should match the data from the props', () => {
          component.getHeadingCells().forEach((heading, index) => {
            expect(heading.props().children).toBe(defaultProps.headings[index]);
          });
        });
      });
    });
  });

  describe('with no side header props', () => {
    const noSideHeaderProps = {
      ...defaultProps,
      hasSideHeaders: false,
    };

    const component = setup({ props: noSideHeaderProps });
    it('should not have a blank cell', () => {
      expect(component.getTopLeftCornerCell().length).toBe(0);
    });
  });
});
