import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button } from './Button';
const styles: React.CSSProperties = {
  textAlign: 'center',
};
export const CenterDecorator = (storyFn: any) => {
  return <div style={styles}>{storyFn()} </div>;
};
const defaultButton = () => (
  <Button onClick={action('clicked')}>dufault Button</Button>
);
const buttonWithSize = () => {
  return (
    <>
      <Button size='lg'>large size</Button>
      <Button size='sm'>large size</Button>
    </>
  );
};
const buttonWithType = () => {
  return (
    <>
      <Button btnType='primary'>primary button</Button>
      <Button btnType='danger'>danger button</Button>
      <Button btnType='link' href='http://qq.com'>
        link button
      </Button>
    </>
  );
};
storiesOf('Button component', module)
  .add('Button', defaultButton)
  .add('不同尺寸button', buttonWithSize)
  .add('不同类型button', buttonWithType);
