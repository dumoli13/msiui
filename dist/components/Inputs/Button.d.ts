import React, { ButtonHTMLAttributes, ReactNode } from 'react';
export type ButtonVariant = 'contained' | 'secondary' | 'outlined' | 'text';
export type ButtonColor = 'primary' | 'success' | 'danger' | 'warning' | 'info';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    color?: ButtonColor;
    size?: 'small' | 'default' | 'large';
    fullWidth?: boolean;
    loading?: boolean;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export default Button;
