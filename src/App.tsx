import React from 'react';
import './App.scss';
import { Button, ButtonSize, ButtonType } from './components/Button/Button';
import { Menu } from './components/Menu/Menu';
import { MenuItem } from './components/Menu/MenuItem';
import { SubMenu } from './components/Menu/SubMenu';

function App() {
  return (
    <div className='App'>
      <div className='content'>
        <Button className={'customer'}>button</Button>
        <Button btnType={ButtonType.Primary}>primary</Button>
        <Button btnType={ButtonType.Default}>default</Button>
        <Button btnType={ButtonType.Danger}>danger</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          Large
        </Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Small}>
          small
        </Button>
        <Button disabled>disabled</Button>
        <Button
          btnType={ButtonType.Link}
          href='http://www.baidu.com'
          target='_blank'
        >
          Link
        </Button>
        <Button btnType={ButtonType.Link} disabled href='www.baidu.com'>
          disabled Link
        </Button>

        <Menu
          defaultIndex={'0'}
          onSelect={(index) => {
            console.log(index);
          }}
        >
          <MenuItem>Menuitem 0</MenuItem>
          <MenuItem disabled>Menuitem 1</MenuItem>
          <MenuItem>Menuitem 2</MenuItem>
        </Menu>

        <Menu
          defaultIndex={'0'}
          mode='vertical'
          onSelect={(index) => {
            console.log(index);
          }}
        >
          <MenuItem>Menuitem 0</MenuItem>
          <MenuItem disabled>Menuitem 1</MenuItem>
          <MenuItem>Menuitem 2</MenuItem>
        </Menu>
        <h2>Menu has dropdown</h2>
        <h4>horizon</h4>
        <Menu
          defaultIndex={'0'}
          onSelect={(index) => {
            console.log(index);
          }}
        >
          <MenuItem>Menuitem 0</MenuItem>
          <MenuItem>Menuitem 1</MenuItem>
          <SubMenu title='dropdown'>
            <MenuItem>Menuitem 0-0</MenuItem>
            <MenuItem>Menuitem 1-1</MenuItem>
          </SubMenu>
        </Menu>
        <h4>vertical</h4>
        <Menu
          defaultIndex={'0'}
          mode='vertical'
          defaultOpenSubMenus={['2']}
          onSelect={(index) => {
            console.log(index);
          }}
        >
          <MenuItem>Menuitem 0</MenuItem>
          <MenuItem>Menuitem 1</MenuItem>
          <SubMenu title='dropdown'>
            <MenuItem>Menuitem 0-0</MenuItem>
            <MenuItem>Menuitem 1-1</MenuItem>
          </SubMenu>
        </Menu>
      </div>
    </div>
  );
}

export default App;
