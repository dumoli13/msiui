import React from 'react';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'contained' | 'secondary' | 'outlined' | 'text';
    color?: 'primary' | 'success' | 'danger' | 'warning' | 'info';
    size?: 'small' | 'default' | 'large';
    fullWidth?: boolean;
    loading?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
}
/**
 * Buttons allow users to take actions, and make choices, with a single tap.
 */
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export default Button;
//# sourceMappingURL=Button.d.ts.map