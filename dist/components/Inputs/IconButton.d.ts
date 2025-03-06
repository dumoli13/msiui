import React, { ButtonHTMLAttributes, JSXElementConstructor, ReactElement } from 'react';
import { ButtonColor, ButtonVariant } from '../../const';
export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    color?: ButtonColor;
    loading?: boolean;
    icon?: ReactElement<any, string | JSXElementConstructor<any>>;
    size?: 'default' | 'large';
    title: string;
    titleVerticalAlign?: 'top' | 'bottom';
    titleHorizontalAlign?: 'left' | 'center' | 'right';
}
/**
 *
 * The `IconButton` component is a flexible and highly customizable button component that supports various styles, colors, and states. It can display an icon, show a loading spinner, and include tooltip support.
 *
 * @property {'contained' | 'secondary' | 'outlined' | 'text'} props.variant - The variant of the button.
 * @property {'primary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral'} props.color - The color theme for the button.
 * @property {boolean} [loading=false] - Whether the button should show a loading state.
 * @property {ReactNode} [icon] - Icon to be displayed inside the button.
 * @property {IconButtonProps} props The properties for the IconButton component.
 *
 */
declare const IconButton: ({ variant, color, className, disabled, loading, icon, size, onClick, title, titleVerticalAlign, titleHorizontalAlign, ...props }: IconButtonProps) => React.JSX.Element;
export default IconButton;
