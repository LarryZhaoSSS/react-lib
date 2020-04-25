import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Button, ButtonSize, ButtonType, ButtonProps } from './Button';
const defaultProps = {
  onClick: jest.fn(),
};
const testProps: ButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: 'klass',
};
const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};
describe('test button component', () => {
  it('should render the correct default button', () => {
    const wrapper = render(<Button {...defaultProps}>primary-button</Button>);
    const element = wrapper.queryByText('primary-button') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element?.tagName).toEqual('BUTTON');
    expect(element).toHaveClass('btn btn-default');
    expect(element.disabled).toBeFalsy();

    fireEvent.click(element!);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
  it('should render the correct component based on the different props', () => {
    const wrapper = render(<Button {...testProps}>props-button</Button>);
    const element = wrapper.queryByText('props-button');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn-primary btn-lg klass');
  });
  it('should render a link button', () => {
    const wrapper = render(
      <Button btnType={ButtonType.Link} href='https://qq.com'>
        link
      </Button>
    );
    const element = wrapper.queryByText('link');
    expect(element).toBeInTheDocument();
    expect(element?.tagName).toEqual('A');
    expect(element).toHaveClass('btn btn-link');
  });
  it('should render a correct disabled button', () => {
    const wrapper = render(<Button {...disabledProps}>disabled-button</Button>);
    const element = wrapper.queryByText('disabled-button') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element!);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
