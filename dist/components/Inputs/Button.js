import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import cx from 'classnames';
import Icon from '../Icon';
/**
 * Buttons allow users to take actions, and make choices, with a single tap.
 */
const Button = React.forwardRef(({ children, variant = 'contained', color = 'primary', size = 'default', className, disabled = false, fullWidth = false, loading = false, startIcon, endIcon, onClick, type = 'button', ...props }, ref) => {
    return (_jsxs("button", { ...props, ref: ref, disabled: disabled || loading, type: type, onClick: onClick, className: cx('relative rounded-md font-medium h-fit disabled:cursor-not-allowed', {
            'py-2 px-4': size === 'large' &&
                (variant === 'contained' ||
                    variant === 'secondary' ||
                    variant === 'text'),
            'py-1.5 px-4': size === 'default' &&
                (variant === 'contained' ||
                    variant === 'secondary' ||
                    variant === 'text'),
            'py-1.5 px-2': size === 'small' &&
                (variant === 'contained' ||
                    variant === 'secondary' ||
                    variant === 'text'),
            'py-[7px] px-4': size === 'large' && variant === 'outlined',
            'py-[5px] px-4': size === 'default' && variant === 'outlined',
            'py-[5px] px-2': size === 'small' && variant === 'outlined',
            'text-20px': size === 'large',
            'text-14px': size === 'default',
            'text-12px': size === 'small',
            'w-full shrink-0': fullWidth,
        }, 
        // Variants
        {
            // Contained
            'focus:ring-3 disabled:ring drop-shadow text-neutral-10 dark:text-neutral-10-dark disabled:ring-neutral-40 dark:disabled:ring-neutral-40-dark disabled:text-neutral-60 dark:disabled:text-neutral-60-dark disabled:bg-neutral-30 dark:disabled:bg-neutral-30-dark': variant === 'contained',
            'bg-primary-main dark:bg-primary-main-dark hover:bg-primary-hover dark:hover:bg-primary-hover-dark active:bg-primary-pressed dark:active:bg-primary-pressed-dark focus:bg-primary-hover dark:focus:bg-primary-hover-dark focus:ring-primary-focus dark:focus:ring-primary-focus-dark': color === 'primary' && variant === 'contained',
            'bg-success-main dark:bg-success-main-dark hover:bg-success-hover dark:hover:bg-success-hover-dark active:bg-success-pressed dark:active:bg-success-pressed-dark focus:bg-success-hover dark:focus:bg-success-hover-dark focus:ring-primary-focus dark:focus:ring-success-focus-dark': color === 'success' && variant === 'contained',
            'bg-danger-main dark:bg-danger-main-dark hover:bg-danger-hover dark:hover:bg-danger-hover-dark active:bg-danger-pressed dark:active:bg-danger-pressed-dark focus:bg-danger-hover dark:focus:bg-danger-hover-dark focus:ring-primary-focus dark:focus:ring-danger-focus-dark': color === 'danger' && variant === 'contained',
            'bg-warning-main dark:bg-warning-main-dark hover:bg-warning-hover dark:hover:bg-warning-hover-dark active:bg-warning-pressed dark:active:bg-warning-pressed-dark focus:bg-warning-hover dark:focus:bg-warning-hover-dark focus:ring-primary-focus dark:focus:ring-warning-focus-dark': color === 'warning' && variant === 'contained',
            'bg-info-main dark:bg-info-main-dark hover:bg-info-hover dark:hover:bg-info-hover-dark active:bg-info-pressed dark:active:bg-info-pressed-dark focus:bg-info-hover dark:focus:bg-info-hover-dark focus:ring-primary-focus': color === 'info' && variant === 'contained',
            'text-neutral-10 dark:text-neutral-10-dark b bg-neutral-60 dark:bg-neutral-60-dark hover:bg-neutral-70 dark:hover:bg-neutral-70-dark active:bg-neutral-80 dark:active:bg-neutral-90-dark focus:ring-primary-focus dark:focus:ring-neutral-100-dark': color === 'neutral' && variant === 'contained',
            // Secondary
            'focus:ring-3 drop-shadow disabled:ring disabled:ring-neutral-40 dark:disabled:ring-neutral-40-dark disabled:text-neutral-60 dark:disabled:text-neutral-60-dark disabled:bg-neutral-30 dark:disabled:bg-neutral-30-dark': variant === 'secondary',
            'text-primary-main dark:text-primary-main-dark bg-primary-surface dark:bg-primary-surface-dark hover:text-primary-hover dark:hover:text-primary-hover-dark active:text-primary-pressed dark:active:text-primary-pressed-dark focus:ring-primary-focus dark:focus:ring-primary-focus-dark': color === 'primary' && variant === 'secondary',
            'text-success-main dark:text-success-main-dark bg-success-surface dark:bg-success-surface-dark hover:text-success-hover  dark:hover:text-success-hover-dark active:text-success-pressed dark:active:text-success-pressed-dark focus:ring-primary-focus dark:focus:ring-success-focus-dark': color === 'success' && variant === 'secondary',
            'text-danger-main dark:text-danger-main-dark bg-danger-surface dark:bg-danger-surface-dark hover:text-danger-hover dark:hover:text-danger-hover-dark active:text-danger-pressed dark:active:text-danger-pressed-dark focus:ring-primary-focus dark:focus:ring-danger-focus-dark': color === 'danger' && variant === 'secondary',
            'text-warning-main dark:text-warning-main-dark bg-warning-surface dark:bg-warning-surface-dark hover:text-warning-hover dark:hover:text-warning-hover-dark active:text-warning-pressed dark:active:text-warning-pressed-dark focus:ring-primary-focus dark:focus:ring-warning-focus-dark': color === 'warning' && variant === 'secondary',
            'text-info-main dark:text-info-main-dark bg-info-surface dark:bg-info-surface-dark hover:text-info-hover dark:hover:text-info-hover-dark active:text-info-pressed dark:active:text-info-pressed-dark focus:ring-primary-focus': color === 'info' && variant === 'secondary',
            'text-neutral-80 dark:text-neutral-100-dark bg-neutral-20 dark:bg-neutral-20-dark hover:text-neutral-90 dark:hover:text-neutral-100-dark active:text-neutral-100 dark:active:text-neutral-100-dark focus:ring-primary-focus dark:focus:ring-neutral-100-dark': color === 'neutral' && variant === 'secondary',
            // Outlined
            'focus:ring-3 border drop-shadow bg-neutral-10 dark:bg-neutral-10-dark dark:hover:bg-neutral-20-dark disabled:text-neutral-60 dark:disabled:text-neutral-60-dark disabled:bg-neutral-30 dark:disabled:bg-neutral-30-dark': variant === 'outlined',
            'text-primary-main dark:text-primary-main-dark border-primary-main dark:border-primary-main-dark hover:bg-primary-hover  hover:text-neutral-10 focus:ring-primary-focus': color === 'primary' && variant === 'outlined',
            'text-success-main dark:text-success-main-dark border-success-main dark:border-success-main-dark hover:bg-success-hover hover:text-neutral-10 focus:ring-primary-focus': color === 'success' && variant === 'outlined',
            'text-danger-main dark:text-danger-main-dark border-danger-main dark:border-danger-main-dark hover:bg-danger-hover dark:hover:bg-danger-hover-dark hover:text-neutral-10 dark:hover:text-neutral-10-dark focus:ring-primary-focus dark:focus:ring-primary-focus-dark': color === 'danger' && variant === 'outlined',
            'text-warning-main dark:text-warning-main-dark border-warning-main dark:border-warning-main-dark hover:bg-warning-hover hover:text-neutral-10 focus:ring-primary-focus': color === 'warning' && variant === 'outlined',
            'text-info-main dark:text-info-main-dark border-info-main dark:border-info-main-dark hover:bg-info-hover dark:hover:bg-info-hover-dark hover:text-neutral-10 dark:hover:text-neutral-10-dark focus:ring-primary-focus dark:focus:ring-primary-focus-dark': color === 'info' && variant === 'outlined',
            'text-neutral-100 dark:text-neutral-100-dark border-neutral-40 dark:border-neutral-100 bg-neutral-10 dark:bg-neutral-20-dark hover:bg-neutral-20 dark:hover:bg-neutral-30-dark active:bg-neutral-30 dark:active:bg-neutral-40-dark focus:ring-primary-focus dark:focus:ring-neutral-100-dark': color === 'neutral' && variant === 'outlined',
            // Text
            'focus:ring-3 disabled:text-neutral-60 dark:disabled:text-neutral-60-dark': variant === 'text',
            'text-primary-main  dark:text-primary-main-dark  hover:text-primary-main dark:hover:text-primary-main-dark hover:bg-primary-surface  dark:hover:bg-primary-surface-dark  active:text-primary-pressed  dark:active:text-primary-pressed-dark  focus:ring-primary-focus  dark:focus:ring-primary-focus-dark': color === 'primary' && variant === 'text',
            'text-success-main dark:text-success-main-dark hover:text-success-hover dark:hover:text-success-hover-dark hover:bg-success-surface dark:hover:bg-success-surface-dark active:text-success-pressed dark:active:text-success-pressed-dark focus:ring-primary-focus dark:focus:ring-success-focus-dark': color === 'success' && variant === 'text',
            'text-danger-main dark:text-danger-main-dark hover:text-danger-hover dark:hover:text-danger-hover-dark hover:bg-danger-surface dark:hover:bg-danger-surface-dark active:text-danger-pressed dark:active:text-danger-pressed-dark focus:ring-primary-focus dark:focus:ring-danger-focus-dark': color === 'danger' && variant === 'text',
            'text-warning-main dark:text-warning-main-dark hover:text-warning-hover dark:hover:text-warning-hover-dark hover:bg-warning-surface dark:hover:bg-warning-surface-dark  active:text-warning-pressed dark:active:text-warning-pressed-dark focus:ring-primary-focus dark:focus:ring-warning-focus-dark': color === 'warning' && variant === 'text',
            'text-info-main dark:text-info-main-dark hover:text-info-hover dark:hover:text-info-hover-dark active:text-info-pressed hover:bg-info-surface dark:hover:bg-info-surface dark:active:text-info-pressed-dark focus:ring-primary-focus dark:focus:ring-info-focus-dark': color === 'info' && variant === 'text',
            'text-neutral-90 dark:text-neutral-90-dark hover:text-neutral-100 dark:hover:text-neutral-100-dark  active:text-neutral-100 hover:bg-neutral-30 dark:bg-neutral-30-dark dark:active:text-neutral-100-dark focus:ring-primary-focus dark:focus:ring-neutral-100-dark': color === 'neutral' && variant === 'text',
            // link
            'focus:outline-none focus:ring-0 disabled:text-neutral-60 dark:disabled:text-neutral-60-dark': variant === 'link',
            'text-primary-main dark:text-primary-main-dark hover:text-primary-hover dark:hover:text-primary-hover-dark active:text-primary-pressed  dark:active:text-primary-pressed-dark ': color === 'primary' && variant === 'link',
            'text-success-main dark:text-success-main-dark hover:text-success-hover dark:hover:text-success-hover-dark  active:text-success-pressed dark:active:text-success-pressed-dark': color === 'success' && variant === 'link',
            'text-danger-main dark:text-danger-main-dark hover:text-danger-hover dark:hover:text-danger-hover-dark  active:text-danger-pressed dark:active:text-danger-pressed-dark': color === 'danger' && variant === 'link',
            'text-warning-main dark:text-warning-main-dark hover:text-warning-hover dark:hover:text-warning-hover-dark  active:text-warning-pressed dark:active:text-warning-pressed-dark': color === 'warning' && variant === 'link',
            'text-info-main dark:text-info-main-dark  hover:text-info-hover dark:hover:text-info-hover-dark  active:text-info-pressed dark:active:text-success-info-dark': color === 'info' && variant === 'link',
            'text-neutral-90 dark:text-neutral-90-dark hover:text-neutral-100 dark:hover:text-neutral-100-dark  active:text-neutral-100 dark:active:text-neutral-100-dark': color === 'neutral' && variant === 'link',
        }, className), tabIndex: disabled ? -1 : 0, children: [_jsxs("span", { className: cx('flex justify-center items-center gap-1.5', {
                    invisible: loading,
                }), children: [startIcon, children, endIcon] }), loading && (_jsx("span", { className: cx('absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center', {
                    'text-16px': size !== 'large',
                    'text-20px': size === 'large',
                }), children: _jsx(Icon, { name: "loader", animation: "spin", strokeWidth: 2 }) }))] }));
});
Button.displayName = 'Button';
export default Button;
