import React from 'react';
export interface PopperProps {
    className?: string;
    disabled?: boolean;
    content: React.ReactNode;
    children: React.ReactNode;
    open?: boolean;
    onOpen?: (open: boolean) => void;
    verticalAlign?: 'top' | 'center' | 'bottom';
    horizontalAlign?: 'left' | 'center' | 'right';
    transformOriginVertical?: 'top' | 'center' | 'bottom';
    transformOriginHorizontal?: 'left' | 'center' | 'right';
}
/**
 *
 * A flexible and customizable popper component designed to display a floating or dropdown-like content
 * relative to a target element. It can handle positioning and alignment adjustments, including dynamic changes
 * due to screen resizing or scrolling. The popper can also be toggled open or closed, and it supports detecting clicks
 * outside the popper to close it automatically.
 *
 * @interface PopperProps
 * @property {string} [className] - Additional class names to apply to the popper container.
 * @property {boolean} [disabled=false] - A flag that disables the toggle functionality.
 * @property {ReactNode} content - The content to be displayed inside the popper when open.
 * @property {ReactNode} children - The content or elements to which the component's behavior or functionality is applied.
 * @property {boolean} [open] - A controlled flag that determines whether the popper is visible or not.
 * @property {function} [onOpen] - A callback function that is triggered when the popper is opened or closed.
 * @property {('top' | 'center' | 'bottom')} [verticalAlign='bottom'] - The vertical alignment of the popper relative to the target element.
 * @property {('left' | 'center' | 'right')} [horizontalAlign='left'] - The horizontal alignment of the popper relative to the target element.
 * @property {('top' | 'center' | 'bottom')} [transformOriginVertical='top'] - The vertical transform origin for popper animations.
 * @property {('left' | 'center' | 'right')} [transformOriginHorizontal='left'] - The horizontal transform origin for popper animations.
 *
 */
declare const Popper: ({ className, disabled, content, children, open: openProp, onOpen, verticalAlign, horizontalAlign, transformOriginVertical, transformOriginHorizontal, }: PopperProps) => React.JSX.Element;
export default Popper;
//# sourceMappingURL=Popper.d.ts.map