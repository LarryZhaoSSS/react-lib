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
    return (React.createElement("div", { className: 'App' },
        React.createElement("div", { className: 'content' },
            React.createElement(Button, { className: 'customer' }, "button"),
            React.createElement(Button, { btnType: 'primary' }, "primary"),
            React.createElement(Button, { btnType: 'default' }, "default"),
            React.createElement(Button, { btnType: 'danger' }, "danger"),
            React.createElement(Button, { btnType: 'primary', size: 'lg' }, "Large"),
            React.createElement(Button, { btnType: 'primary', size: 'sm' }, "small"),
            React.createElement(Button, { disabled: true }, "disabled"),
            React.createElement(Button, { btnType: 'link', href: 'http://www.baidu.com', target: '_blank' }, "Link"),
            React.createElement(Button, { btnType: 'link', disabled: true, href: 'www.baidu.com' }, "disabled Link"),
            React.createElement(Menu, { defaultIndex: '0', onSelect: function (index) {
                    console.log(index);
                } },
                React.createElement(MenuItem, null, "Menuitem 0"),
                React.createElement(MenuItem, { disabled: true }, "Menuitem 1"),
                React.createElement(MenuItem, null, "Menuitem 2")),
            React.createElement(Menu, { defaultIndex: '0', mode: 'vertical', onSelect: function (index) {
                    console.log(index);
                } },
                React.createElement(MenuItem, null, "Menuitem 0"),
                React.createElement(MenuItem, { disabled: true }, "Menuitem 1"),
                React.createElement(MenuItem, null, "Menuitem 2")),
            React.createElement("h2", null, "Menu has dropdown"),
            React.createElement("h4", null, "horizon"),
            React.createElement(Menu, { defaultIndex: '0', onSelect: function (index) {
                    console.log(index);
                } },
                React.createElement(MenuItem, null, "Menuitem 0"),
                React.createElement(MenuItem, null, "Menuitem 1"),
                React.createElement(SubMenu, { title: 'dropdown' },
                    React.createElement(MenuItem, null, "Menuitem 0-0"),
                    React.createElement(MenuItem, null, "Menuitem 1-1"))),
            React.createElement("h4", null, "vertical"),
            React.createElement(Menu, { defaultIndex: '0', mode: 'vertical', defaultOpenSubMenus: ['2'], onSelect: function (index) {
                    console.log(index);
                } },
                React.createElement(MenuItem, null, "Menuitem 0"),
                React.createElement(MenuItem, null, "Menuitem 1"),
                React.createElement(SubMenu, { title: 'dropdown' },
                    React.createElement(MenuItem, null, "Menuitem 0-0"),
                    React.createElement(MenuItem, null, "Menuitem 1-1"))),
            React.createElement("div", { className: 'icons' },
                React.createElement(Icon, { icon: 'coffee', theme: 'danger', size: '10x' }),
                React.createElement(Icon, { icon: 'arrow-right', theme: 'primary', size: '10x' })))));
}
export default App;
