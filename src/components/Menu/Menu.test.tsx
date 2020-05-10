import React from 'react';
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
  wait,
} from '@testing-library/react';
import { Menu, MenuProps } from './Menu';
import { MenuItem } from './MenuItem';
import { SubMenu } from './SubMenu';
const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
};
const testVerticalProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
};
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>normal</MenuItem>
      <SubMenu title='dropdown'>
        <MenuItem>drop1</MenuItem>
      </SubMenu>
    </Menu>
  );
};
let wrapper: RenderResult,
  menuElement: HTMLElement,
  acitveElement: HTMLElement,
  disabledElement: HTMLElement;
const createSylteFile = () => {
  const cssFile: string = `
      .r-parts-submenu{
        display:none;
      }
      .r-parts-submenu.menu-opened {
        display:block;
      }
    `;
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = cssFile;
  return style;
};
describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    wrapper.container.append(createSylteFile());
    menuElement = wrapper.getByTestId('test-menu');
    acitveElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');
  });
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('r-parts-menu test');
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4);
    expect(acitveElement).toHaveClass('menu-item is-active');
    expect(disabledElement).toHaveClass('menu-item is-disabled');
  });
  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('normal');
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('is-active');
    expect(acitveElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).toHaveBeenCalledWith('2');
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1');
  });
  it('should render vertical mode when is set to vertical', () => {
    cleanup();
    const wrapper = render(generateMenu(testVerticalProps));
    const menuElement = wrapper.getByTestId('test-menu');
    expect(menuElement).toHaveClass('menu-vertical');
  });
  it('should show dropdown when hover a submenu', async () => {
    expect(wrapper.queryByText('drop1')).not.toBeVisible();
    const dropdownElement = wrapper.getByText('dropdown');
    fireEvent.mouseEnter(dropdownElement);
    await wait(() => {
      expect(wrapper.queryByText('drop1')).toBeVisible();
    });
    fireEvent.click(wrapper.getByText('drop1'));
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0');
    fireEvent.mouseLeave(dropdownElement);
    await wait(() => {
      expect(wrapper.queryByText('drop1')).not.toBeVisible();
    });
  });
});
