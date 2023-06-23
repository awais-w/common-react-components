import React from 'react';
import { shallow } from 'enzyme';
import Icon from '@cmc/icon/esnext/Icon';
import MatrixCell from './MatrixCell';

const defaultProps = {
  cell: {
    value: '1',
    type: '',
  },
  columnIndex: 1,
  rowIndex: 1,
  cellWidth: 25,
  onClick: jest.fn(),
  isActive: false,
};

let component;

const setup = ({ props }) => {
  const wrapper = shallow(<MatrixCell {...props} />);
  return {
    wrapper,
    getCell: () => wrapper.find('.cmc-pagination-matrix__cell'),
    getActiveCell: () => wrapper.find('.cmc-pagination-matrix__cell--active'),
    getDisabledCell: () => wrapper.find('.cmc-pagination-matrix__cell--disabled'),
    getRedCell: () => wrapper.find('.cmc-pagination-matrix__cell--red'),
    getBlueCell: () => wrapper.find('.cmc-pagination-matrix__cell--blue'),
    getOriginalCell: () => wrapper.find('.cmc-pagination-matrix__cell--original'),
  };
};

describe('<MatrixCell />', () => {
  describe('with props set using default props', () => {
    beforeAll(() => {
      component = setup({ props: defaultProps });
    });
    it('has the correct cell width', () => {
      expect(component.getCell().props().style.width).toBe(`${defaultProps.cellWidth}%`);
    });

    it('should call onClick when clicked', () => {
      component.getCell().simulate('click');
      expect(defaultProps.onClick).toBeCalledWith(defaultProps.rowIndex, defaultProps.columnIndex);
    });

    it('has the correct value', () => {
      const value = component.getCell().props().children;
      expect(value).toBe(defaultProps.cell.value);
    });
  });

  describe('red cell type', () => {
    const redTypeProps = {
      ...defaultProps,
      cell: {
        value: '1',
        type: 'red',
      },
    };

    beforeAll(() => {
      component = setup({ props: redTypeProps });
    });

    it('exists', () => {
      const redCell = component.getRedCell();
      expect(redCell).toExist();
    });
  });

  describe('blue cell type', () => {
    const blueTypeProps = {
      ...defaultProps,
      cell: {
        value: '1',
        type: 'blue',
      },
    };

    beforeAll(() => {
      component = setup({ props: blueTypeProps });
    });

    it('exists', () => {
      const blueCell = component.getBlueCell();
      expect(blueCell).toExist();
    });
  });

  describe('old selection cell type', () => {
    const originalTypeProps = {
      ...defaultProps,
      onClick: jest.fn(),
      cell: {
        value: '1',
        type: 'original',
      },
    };

    beforeAll(() => {
      component = setup({ props: originalTypeProps });
    });

    it('exists', () => {
      const originalCell = component.getOriginalCell();
      expect(originalCell).toExist();
    });

    it('should not call onClick when clicked', () => {
      component.getCell().simulate('click');
      expect(originalTypeProps.onClick).not.toBeCalled();
    });
  });

  describe('with props set using disabled type', () => {
    const disabledProps = {
      ...defaultProps,
      onClick: jest.fn(),
      cell: {
        value: '1',
        type: 'disabled',
      },
    };

    beforeAll(() => {
      component = setup({ props: disabledProps });
    });

    it('has a disabled cell', () => {
      expect(component.getDisabledCell()).toExist();
    });

    it('should not call onClick when clicked', () => {
      component.getCell().simulate('click');
      expect(disabledProps.onClick).not.toBeCalled();
    });

    it('has a disabled icon', () => {
      const value = component.getCell().props().children;
      expect(value).toEqual(<Icon icon='block' color='white' />);
    });
  });

  describe('with props set using active props', () => {
    const activeProps = {
      ...defaultProps,
      isActive: true,
    };

    beforeAll(() => {
      component = setup({ props: activeProps });
    });

    it('has an active cell', () => {
      expect(component.getActiveCell()).toExist();
    });
  });
});
