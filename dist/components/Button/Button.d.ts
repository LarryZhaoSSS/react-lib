import { FC, ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
export declare type ButtonSize = 'lg' | 'sm';
export declare type ButtonType = 'primary' | 'default' | 'danger' | 'link';
interface BaseButtonProps {
    className?: string;
    /** 设置Button的禁用 */
    disabled?: boolean;
    /** 设置Button的尺寸 */
    size?: ButtonSize;
    /** 设置Button的类型 */
    btnType?: ButtonType;
    children: ReactNode;
    href?: string;
}
declare type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
declare type anchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & anchorButtonProps>;
/**
 * 这是一个button组件
 * ## Button header
 * ~~~js
 * import {Button} from 'lib'
 * ~~~
 */
declare const Button: FC<ButtonProps>;
export { Button };
