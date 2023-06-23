import React from 'react';
import { shallow } from 'enzyme';
import Loading from '@cmc/loading/esnext/Loading';
import Portal from '@cmc/portal/esnext/Portal';
import Modal from './Modal';

const defaultProps = {
  onClose: jest.fn(),
  primaryButton: { handleClick: jest.fn(), text: 'primary', isDisabled: false },
  secondaryButton: { handleClick: jest.fn(), text: 'secondary', isDisabled: false },
  children: 'Modal content',
  title: 'Modal title',
};

describe('Modal', () => {
  const setup = ({ props }) => {
    const component = shallow(<Modal {...props} />);
    return {
      wrapper: component,
      getPortal: () => component.find(Portal),
      getHeader: () => component.find('.cmc-modal__container-header'),
      getCloseButton: () => component.find('#close'),
      getContent: () => component.find('.cmc-modal__container-content'),
      getPrimaryButton: () =>
        component.findWhere((element) => element.name() === 'Button' && !element.prop('isSecondary')),
      getSecondaryButton: () =>
        component.findWhere((element) => element.name() === 'Button' && element.prop('isSecondary')),
      getLoading: () => component.find(Loading),
      getFooter: () => component.find('.cmc-modal__container-footer'),
      getOutside: () => component.find('.cmc-modal__outside'),
    };
  };

  describe('base tests', () => {
    const component = setup({ props: defaultProps });
    it('exists', () => {
      expect(component.wrapper).toExist();
    });
    it('should match default snapshot', () => {
      expect(component.wrapper).toMatchSnapshot();
    });
    it('should render correct content', () => {
      expect(component.getCloseButton()).toHaveLength(1);
      expect(component.getHeader().text()).toContain(defaultProps.title);
      expect(component.getContent().text()).toEqual(defaultProps.children);
      expect(component.getPrimaryButton()).toHaveLength(1);
      expect(component.getSecondaryButton()).toHaveLength(1);
    });
    it('renders a portal component', () => {
      expect(component.getPortal()).toExist();
    });
  });

  describe('conditional renders', () => {
    it('does not render header if props not provided', () => {
      const component = setup({ props: { ...defaultProps, title: '', onClose: null } });
      expect(component.getHeader()).toHaveLength(0);
    });

    it('does not render footer if props not provided', () => {
      const component = setup({ props: { ...defaultProps, primaryButton: null, secondaryButton: null } });
      expect(component.getFooter()).toHaveLength(0);
    });

    it('renders loading component is isLoading is set to true', () => {
      const component = setup({ props: { ...defaultProps, isLoading: true } });
      expect(component.getLoading()).toHaveLength(1);
    });

    describe('when secondary button not provided', () => {
      const component = setup({ props: { ...defaultProps, secondaryButton: null } });
      it('renders footer', () => {
        expect(component.getFooter()).toHaveLength(1);
      });
      it('does not render a secondary button', () => {
        expect(component.getSecondaryButton()).toHaveLength(0);
      });
    });

    describe('when primary button not provided', () => {
      const component = setup({ props: { ...defaultProps, primaryButton: null } });
      it('renders footer', () => {
        expect(component.getFooter()).toHaveLength(1);
      });
      it('does not render a primary button', () => {
        expect(component.getPrimaryButton()).toHaveLength(0);
      });
    });
  });

  describe('button clicks', () => {
    const component = setup({ props: defaultProps });
    it('calls onClose when close button is clicked', () => {
      component.getCloseButton().simulate('click');
      expect(defaultProps.onClose).toBeCalledTimes(1);
    });

    it('calls primaryButton onclick when primary button is clicked', () => {
      component.getPrimaryButton().simulate('click');
      expect(defaultProps.primaryButton.handleClick).toBeCalledTimes(1);
    });

    it('calls secondaryButton onclick when secondary button is clicked', () => {
      component.getSecondaryButton().simulate('click');
      expect(defaultProps.secondaryButton.handleClick).toBeCalledTimes(1);
    });
  });

  describe('Custom classes', () => {
    const component = setup({ props: { ...defaultProps, classes: 'class1 class2' } });
    it('adds custom classes', () => {
      expect(component.wrapper.find('.class1')).toHaveLength(1);
      expect(component.wrapper.find('.class2')).toHaveLength(1);
    });
  });
});
