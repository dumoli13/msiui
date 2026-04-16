import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import cx from 'classnames';
/**
 * Internal visual wrapper shared by text-input-like components.
 * Handles border, focus ring, disabled/error/success states, size padding, and icon slots.
 * Not exported from the library index.
 */
function InputBase({ focused, error, success, disabled, size = 'default', width, fullWidth, startIcon, endIcons, containerRef, className, align = 'center', children, }) {
    return (_jsxs("div", { ref: containerRef, style: width !== undefined ? { width } : undefined, className: cx('relative px-3 border rounded-md flex gap-2', 'transition-[border-color,box-shadow] duration-150 ease-in-out', align === 'start' ? 'items-start' : 'items-center', {
            'w-full': fullWidth,
            // Background
            'bg-neutral-20 dark:bg-neutral-30-dark cursor-not-allowed text-neutral-60 dark:text-neutral-60-dark': disabled,
            'bg-neutral-10 dark:bg-neutral-10-dark shadow-box-3': !disabled,
            // Error border (always overrides other border colors)
            'border-danger-main dark:border-danger-main-dark': error,
            'ring-3 ring-danger-focus dark:ring-danger-focus-dark': error && focused,
            // Focused, no error
            'border-primary-main dark:border-primary-main-dark ring-3 ring-primary-focus dark:ring-primary-focus-dark': !error && focused,
            // Success, no error, not focused
            'border-success-main dark:border-success-main-dark': !error && !focused && success,
            // Default border (all non-error, non-focused states including disabled)
            'border-neutral-50 dark:border-neutral-50-dark': !error && !focused && !success,
            // Hover only when interactive
            'hover:border-primary-hover dark:hover:border-primary-hover-dark': !error && !focused && !disabled,
            // Size
            'py-[3px]': size === 'default',
            'py-[9px]': size === 'large',
        }, className), children: [startIcon && (_jsx("span", { "aria-hidden": "true", className: "shrink-0 text-neutral-70 dark:text-neutral-70-dark", children: startIcon })), children, endIcons] }));
}
export default InputBase;
