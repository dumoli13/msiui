import React, { ButtonHTMLAttributes, ReactNode } from 'react';
export type ButtonVariant = 'contained' | 'secondary' | 'outlined' | 'text';
export type ButtonColor = 'primary' | 'success' | 'danger' | 'warning' | 'info';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    color?: ButtonColor;
    size?: 'small' | 'default' | 'large';
    fullWidth?: boolean;
    loading?: boolean;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
}
/**
 * Button Component
 *
 * visit this link for full documentation:
 * https://www.figma.com/design/JJLvT4QpNhnT2InWV5boVj/QCIS-for-SME---Website?node-id=417-10271&node-type=frame&t=xEPdjGtNP9PPWmjd-0
 *
 * @property {string} props.children - The content to be displayed inside the button.
 * @property {'contained' | 'secondary' | 'outlined' | 'text'} props.variant - The variant of the button.
 * @property {'primary' | 'success' | 'danger' | 'warning' | 'info'} props.color - The color theme for the button.
 * @property { 'default' | 'large' } [size='default'] - The size of the button, either default or large.
 * @property {string} [className] - Additional custom classes to apply to the button.
 * @property {boolean} [disabled=false] - Whether the button is disabled (non-clickable).
 * @property {boolean} [fullWidth=false] - Whether the button should take up the full width of its container.
 * @property {boolean} [loading=false] - Whether the button should show a loading state.
 * @property {ReactNode} [startIcon] - Icon to be displayed before the button content.
 * @property {ReactNode} [endIcon] - Icon to be displayed after the button content.
 * @property {() => void} [onClick] - Click handler for the button.
 */
declare const Button: ({ children, variant, color, size, className, disabled, fullWidth, loading, startIcon, endIcon, onClick, type, }: ButtonProps) => React.JSX.Element;
export default Button;
