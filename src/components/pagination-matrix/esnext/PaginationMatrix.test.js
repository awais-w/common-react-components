import React from 'react';
import { shallow } from 'enzyme';
import Notification from '@cmc/cha-notification/esnext/Notification';
import PaginationMatrix from './PaginationMatrix';

const defaultProps = {
  matrixData: {
    headings: ['1', '2', '3', '4', '5'],
    sideHeadings: ['07:00', '10:00', '13:00'],
    rows: [
      [{ value: '11' }, { value: '12' }, { value: '13' }, { value: '14' }, { value: '15' }],
      [{ value: '21' }, { value: '22' }, { value: '23' }, { value: '24' }, { value: '25' }],
      [{ value: '31' }, { value: '32' }, { value: '33' }, { value: '34' }, { value: '35' }],
    ],
    columnOffset: 0,
  },
};

const setup = ({ props }) => {
  const component = shallow(<PaginationMatrix {...props} />);
  return {
    wrapper: component,
    getCornerCell: () => component.find('.cmc-pagination-matrix__blank'),
    getHeadings: () => component.find('MatrixHeadings'),
    getSideHeadings: () => component.find('.cmc-pagination-matrix__side-heading'),
    getRows: () => component.find('MatrixRow'),
    getPreviousButton: () => component.find('.cmc-pagination-matrix__prev-arrow > Button'),
    getNextButton: () => component.find('.cmc-pagination-matrix__next-arrow > Button'),
  };
};

describe('<PaginationMatrix />', () => {
  describe('with props set from default props', () => {
    const component = setup({ props: defaultProps });

    it('should match default snapshot', () => {
      expect(component.wrapper).toMatchSnapshot();
    });

    it('has the correct class', () => {
      expect(component.wrapper.hasClass('cmc-pagination-matrix__matrix-grid')).toBe(true);
    });

    describe('the rows render', () => {
      it('with the correct number of them', () => {
        expect(component.getRows().length).toBe(defaultProps.matrixData.rows.length);
      });
    });

    describe('when handleCellClick is called', () => {
      component.wrapper.instance().handleCellClick(1, 1);

      it('should pass down the active setting to the rows', () => {
        expect(component.getRows().at(0).props().activeSetting).toEqual({ rowId: 1, columnId: 1 });
      });

      it('should pass down the active setting to the headings', () => {
        expect(component.getHeadings().props().activeSetting).toEqual({ rowId: 1, columnId: 1 });
      });
    });
  });

  describe('with custom props', () => {
    describe('buttons are made to persist', () => {
      const component = setup({
        props: {
          matrixData: {
            headings: ['1'],
            rows: [['11']],
          },
          alwaysShowPaginationButtons: true,
        },
      });

      it('renders the previous button', () => {
        expect(component.getPreviousButton().length).toBe(1);
      });

      it('gives the correct props to the previous button', () => {
        const prevButtonProps = component.getPreviousButton().props();
        expect(prevButtonProps.icon).toBe('navigate_before');
        expect(prevButtonProps.isDisabled).toBe(false);
        expect(prevButtonProps.onClick).toBe(component.wrapper.instance().handlePrevPageClick);
      });

      it('renders the next button', () => {
        expect(component.getNextButton().length).toBe(1);
      });

      it('gives the correct props to the next button', () => {
        const nextButtonProps = component.getNextButton().props();
        expect(nextButtonProps.icon).toBe('navigate_next');
        expect(nextButtonProps.isDisabled).toBe(false);
        expect(nextButtonProps.onClick).toBe(component.wrapper.instance().handleNextPageClick);
      });

      it('should hide the next button if shouldShowNextButton is false', () => {
        const thisComponent = setup({ props: { ...defaultProps, shouldShowNextButton: false } });
        expect(thisComponent.getNextButton()).not.toExist();
      });
    });

    describe('when moving through the matrix by pressing the arrows', () => {
      describe('when the grid should move', () => {
        const smallMatrixProps = {
          matrixData: {
            headings: ['1', '2', '3', '4', '5'],
            sideHeadings: ['07:00', '10:00', '13:00'],
            rows: [
              [{ value: '11' }, { value: '12' }, { value: '13' }, { value: '14' }, { value: '15' }],
              [{ value: '21' }, { value: '22' }, { value: '23' }, { value: '24' }, { value: '25' }],
              [{ value: '31' }, { value: '32' }, { value: '33' }, { value: '34' }, { value: '35' }],
            ],
          },
          visibleColumns: 3,
          onNextBatchRequest: jest.fn(),
        };

        const component = setup({
          props: smallMatrixProps,
        });

        it('moves the visible columns forward when prev arrow clicked', () => {
          expect(component.getRows().at(0).props().row).toBe(smallMatrixProps.matrixData.rows[0]);
          expect(component.getRows().at(0).props().columnOffset).toBe(0);
          expect(component.getRows().at(0).props().visibleColumns).toBe(3);
          component.getNextButton().simulate('click');
          expect(component.getRows().at(0).props().row).toBe(smallMatrixProps.matrixData.rows[0]);
          expect(component.getRows().at(0).props().columnOffset).toBe(3);
          expect(component.getRows().at(0).props().visibleColumns).toBe(6);
        });

        it('moves the visible columns back when prev arrow clicked', () => {
          expect(component.getRows().at(0).props().row).toBe(smallMatrixProps.matrixData.rows[0]);
          expect(component.getRows().at(0).props().columnOffset).toBe(3);
          expect(component.getRows().at(0).props().visibleColumns).toBe(6);
          component.getPreviousButton().simulate('click');
          expect(component.getRows().at(0).props().row).toBe(smallMatrixProps.matrixData.rows[0]);
          expect(component.getRows().at(0).props().columnOffset).toBe(0);
          expect(component.getRows().at(0).props().visibleColumns).toBe(3);
        });
      });

      describe('when the grid should call props', () => {
        const component = setup({
          props: {
            matrixData: {
              headings: ['1', '2', '3', '4', '5'],
              sideHeadings: ['07:00', '10:00', '13:00'],
              rows: [
                [{ value: '11' }, { value: '12' }, { value: '13' }, { value: '14' }, { value: '15' }],
                [{ value: '21' }, { value: '22' }, { value: '23' }, { value: '24' }, { value: '25' }],
                [{ value: '31' }, { value: '32' }, { value: '33' }, { value: '34' }, { value: '35' }],
              ],
            },
            visibleColumns: 5,
            onNextBatchRequest: jest.fn(),
          },
        });

        it('should call onNextBatchRequest when there is no data', () => {
          const propSpy = jest.spyOn(component.wrapper.instance().props, 'onNextBatchRequest');
          expect(propSpy).not.toHaveBeenCalled();
          component.getNextButton().simulate('click');
          expect(propSpy).toHaveBeenCalled();
        });
      });
    });

    describe('error prop', () => {
      const component = setup({
        props: {
          error: 'This is an error message',
        },
      });
      it('shows an error message', () => {
        expect(component.wrapper.find(Notification)).toExist();
      });
    });

    describe('different props are set to empty', () => {
      describe('no headings', () => {
        const component = setup({
          props: {
            matrixData: { headings: {} },
          },
        });
        it('has no blank cell', () => {
          expect(component.getCornerCell().length).toBe(0);
        });

        it('has no header cells', () => {
          expect(component.getHeadings().length).toBe(0);
        });
      });

      describe('no side headings', () => {
        const component = setup({
          props: {
            matrixData: { sideHeadings: {} },
          },
        });
        it('has no side heading cells', () => {
          expect(component.getSideHeadings().length).toBe(0);
        });
      });

      describe('no data', () => {
        const component = setup({
          props: {
            matrixData: {},
          },
        });

        it('shouldnt render any cells', () => {
          expect(component.getHeadings().length).toBe(0);
          expect(component.getSideHeadings().length).toBe(0);
          expect(component.getRows().length).toBe(0);
        });
      });
      describe('it gets highlighted', () => {
        it('shouldnt render any cells', () => {
          const component = setup({
            props: {
              matrixData: {
                headings: ['1'],
                rows: [['11']],
              },
              hightlightMatrix: true,
            },
          });
          expect(component.wrapper.hasClass('cmc-pagination-matrix__matrix-grid--highlight')).toBe(true);
        });
      });
    });
  });
});
