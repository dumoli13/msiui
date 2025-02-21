var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import cx from 'classnames';
import { Loader } from 'react-feather';
import Tooltip from '../Displays/Tooltip';
/**
 * IconButton Component
 *
 * The `IconButton` component is a flexible and highly customizable button component that supports various styles, colors, and states. It can display an icon, show a loading spinner, and include tooltip support.
 *
 * @property {'contained' | 'secondary' | 'outlined' | 'text'} props.variant - The variant of the button.
 * @property {'primary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral'} props.color - The color theme for the button.
 * @property {boolean} [loading=false] - Whether the button should show a loading state.
 * @property {ReactNode} [icon] - Icon to be displayed inside the button.
 * @property {IconButtonProps} props The properties for the IconButton component.
 *
 * @returns {JSX.Element} A styled button component with optional icon and loading state.
 */
const IconButton = (_a) => {
    var { variant = 'contained', color = 'primary', className, disabled = false, loading = false, icon, size = 'default', onClick, title, titleVerticalAlign = 'bottom', titleHorizontalAlign = 'center' } = _a, props = __rest(_a, ["variant", "color", "className", "disabled", "loading", "icon", "size", "onClick", "title", "titleVerticalAlign", "titleHorizontalAlign"]);
    return (React.createElement(Tooltip, { title: title, verticalAlign: titleVerticalAlign, horizontalAlign: titleHorizontalAlign },
        React.createElement("button", Object.assign({}, props, { disabled: disabled || loading, type: "button", onClick: onClick, "aria-label": title, className: cx('relative rounded-md font-medium disabled:cursor-not-allowed shrink-0', {
                'p-3': size === 'default',
                'p-4': size === 'large',
                // contained
                'text-neutral-10 focus:ring-3 disabled:border disabled:border-neutral-40 disabled:text-neutral-60 disabled:bg-neutral-30 drop-shadow': variant === 'contained',
                'bg-primary-main hover:bg-primary-hover active:bg-primary-pressed focus:bg-primary-hover focus:ring-primary-focus': color === 'primary' && variant === 'contained',
                'bg-success-main hover:bg-success-hover active:bg-success-pressed focus:bg-success-hover focus:ring-success-focus': color === 'success' && variant === 'contained',
                'bg-danger-main hover:bg-danger-hover active:bg-danger-pressed focus:bg-danger-hover focus:ring-danger-focus': color === 'danger' && variant === 'contained',
                'bg-warning-main hover:bg-warning-hover active:bg-warning-pressed focus:bg-warning-hover focus:ring-warning-focus': color === 'warning' && variant === 'contained',
                'bg-info-main hover:bg-info-hover active:bg-info-pressed focus:bg-info-hover focus:ring-info-surface': color === 'info' && variant === 'contained',
                'bg-neutral-70 hover:bg-neutral-50 active:bg-neutral-80 focus:bg-neutral-50 focus:ring-neutral-30': variant === 'contained',
                // secondary
                'focus:ring-3 disabled:border disabled:border-neutral-40 disabled:text-neutral-60 disabled:bg-neutral-30 drop-shadow': variant === 'secondary',
                'text-primary-main bg-primary-surface hover:text-primary-hover active:text-primary-pressed focus:ring-primary-focus': color === 'primary' && variant === 'secondary',
                'text-success-main bg-success-surface hover:text-success-hover active:text-success-pressed focus:ring-success-focus': color === 'success' && variant === 'secondary',
                'text-danger-main bg-danger-surface hover:text-danger-hover active:text-danger-pressed focus:ring-danger-focus': color === 'danger' && variant === 'secondary',
                'text-warning-main bg-warning-surface hover:text-warning-hover active:text-warning-pressed focus:ring-warning-focus': color === 'warning' && variant === 'secondary',
                'text-info-main bg-info-surface hover:text-info-hover active:text-info-pressed focus:ring-info-surface': color === 'info' && variant === 'secondary',
                'text-neutral-70 bg-info-surface hover:text-neutral-50 active:text-neutral-80 focus:ring-neutral-30': variant === 'secondary',
                // outlined
                'bg-neutral-10 hover:bg-neutral-20 active:bg-neutral-30 border focus:ring-3 border-neutral-40 disabled:text-neutral-60 disabled:bg-neutral-30 drop-shadow disabled:border-neutral-40': variant === 'outlined',
                'text-primary-main focus:ring-primary-focus': color === 'primary' && variant === 'outlined',
                'text-success-main focus:ring-success-focus': color === 'success' && variant === 'outlined',
                'text-danger-main focus:ring-danger-focus': color === 'danger' && variant === 'outlined',
                'text-warning-main focus:ring-warning-focus': color === 'warning' && variant === 'outlined',
                'text-info-main focus:ring-info-focus': color === 'info' && variant === 'outlined',
                'text-neutral-70 focus:ring-neutral-30': variant === 'outlined',
                // text
                'focus:ring-3 disabled:text-neutral-60': variant === 'text',
                'text-primary-main hover:text-primary-hover active:text-primary-pressed focus:ring-primary-focus': color === 'primary' && variant === 'text',
                'text-success-main hover:text-success-hover active:text-success-pressed focus:ring-success-focus': color === 'success' && variant === 'text',
                'text-danger-main hover:text-danger-hover active:text-danger-pressed focus:ring-danger-focus': color === 'danger' && variant === 'text',
                'text-warning-main hover:text-warning-hover active:text-warning-pressed focus:ring-warning-focus': color === 'warning' && variant === 'text',
                'text-info-main hover:text-info-hover active:text-info-pressed focus:ring-info-focus': color === 'info' && variant === 'text',
                'text-neutral-70 hover:text-neutral-50 active:text-neutral-80 focus:ring-neutral-30': variant === 'text',
            }, className) }),
            React.createElement("span", { className: cx('flex justify-center items-center gap-1.5', {
                    invisible: loading,
                }) }, icon),
            loading && (React.createElement("span", { className: "absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center" },
                React.createElement(Loader, { className: "animate-spin" }))))));
};
export default IconButton;
//# sourceMappingURL=IconButton.js.map