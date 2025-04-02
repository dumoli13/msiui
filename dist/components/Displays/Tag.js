import React from 'react';
import cx from 'classnames';
import Icon from '../Icon';
/**
 *
 * @property {string} [props.className] - Additional class names to apply to the tag.
 * @property {string} props.children - The content to be displayed inside the tag.
 * @property {'primary' | 'success' | 'danger' | 'warning' | 'info'} props.color - The color theme for the tag
 * .
 */
function Tag({ className, children, color, size = 'default', onRemove, }) {
    return (React.createElement("div", { className: cx('ring-[1.5px] border-box truncate flex items-center justify-center w-fit py-1.5 px-3 rounded-lg font-medium', {
            'ring-primary-border dark:ring-primary-border-dark text-primary-main dark:text-primary-main-dark bg-primary-surface dark:bg-primary-surface-dark': color === 'primary',
            'ring-danger-border dark:ring-danger-border-dark text-danger-main dark:text-danger-pressed-dark bg-danger-surface dark:bg-danger-surface-dark': color === 'danger',
            'ring-warning-border dark:ring-warning-border-dark text-warning-main dark:text-warning-pressed-dark bg-warning-surface dark:bg-warning-surface-dark': color === 'warning',
            'ring-success-border dark:ring-success-border-dark text-success-main dark:text-success-pressed-dark bg-success-surface dark:bg-success-surface-dark': color === 'success',
            'ring-info-border dark:ring-info-border-dark text-info-main dark:text-info-main-dark bg-info-surface dark:bg-info-surface-dark': color === 'info',
            'ring-neutral-60 dark:ring-neutral-60-dark text-neutral-80 dark:text-neutral-80-dark bg-neutral-15 dark:bg-neutral-15-dark': color === 'neutral',
            'text-12px': size === 'default',
            'text-16px': size === 'large',
        }, className) },
        children,
        onRemove && (React.createElement(Icon, { name: "x-mark", size: 12, onClick: onRemove, className: "cursor-pointer ml-1" }))));
}
export default Tag;
