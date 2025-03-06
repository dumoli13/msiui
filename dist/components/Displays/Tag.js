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
            'ring-primary-border text-primary-main bg-primary-surface': color === 'primary',
            'ring-danger-border text-danger-pressed bg-danger-surface': color === 'danger',
            'ring-warning-border text-warning-pressed bg-warning-surface': color === 'warning',
            'ring-success-border text-success-pressed bg-success-surface': color === 'success',
            'ring-info-border text-info-main bg-info-surface': color === 'info',
            'ring-neutral-40 text-neutral-80 bg-neutral-15': color === 'neutral',
            'text-12px': size === 'default',
            'text-18px': size === 'large',
        }, className) },
        children,
        onRemove && (React.createElement(Icon, { name: "x-mark", size: 12, onClick: onRemove, className: "cursor-pointer ml-1" }))));
}
export default Tag;
//# sourceMappingURL=Tag.js.map