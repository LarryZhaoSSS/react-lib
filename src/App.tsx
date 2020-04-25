import React from 'react';
import './App.scss';
import { Button, ButtonSize, ButtonType } from './components/Button/Button';

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
      </div>
    </div>
  );
}

export default App;
