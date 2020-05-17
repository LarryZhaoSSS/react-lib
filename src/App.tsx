import React from 'react';
import './App.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Button } from './components/Button/Button';
import { Menu } from './components/Menu/Menu';
import { MenuItem } from './components/Menu/MenuItem';
import { SubMenu } from './components/Menu/SubMenu';
import { Icon } from './components/Icon/Icon';
library.add(fas);

function App() {
  return (
    <div className='App'>
      <div className='content'>
        <Button className={'customer'}>button</Button>
        <Button btnType={'primary'}>primary</Button>
        <Button btnType={'default'}>default</Button>
        <Button btnType={'danger'}>danger</Button>
        <Button btnType={'primary'} size={'lg'}>
          Large
        </Button>
        <Button btnType={'primary'} size={'sm'}>
          small
        </Button>
        <Button disabled>disabled</Button>
        <Button btnType={'link'} href='http://www.baidu.com' target='_blank'>
          Link
        </Button>
        <Button btnType={'link'} disabled href='www.baidu.com'>
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
        <div className='icons'>
          <Icon icon='coffee' theme='danger' size='10x' />
          <Icon icon='arrow-right' theme='primary' size='10x' />
        </div>
      </div>
    </div>
  );
}

export default App;
