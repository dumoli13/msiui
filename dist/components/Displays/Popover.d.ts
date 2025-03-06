import React, { ReactNode, RefObject } from 'react';
export interface PopoverProps {
    children: ReactNode;
    className?: string;
    open: boolean;
    elementRef: RefObject<HTMLDivElement>;
    onClose?: () => void;
    verticalAlign?: 'top' | 'center' | 'bottom';
    horizontalAlign?: 'left' | 'center' | 'right';
    transformOriginVertical?: 'top' | 'center' | 'bottom';
    transformOriginHorizontal?: 'left' | 'center' | 'right';
}
/**
 *
 * A customizable popover component that can display a dropdown or floating content
 * relative to a target element on the page. It allows you to configure the position,
 * alignment, and transformation origin of the popover. This component supports open/close functionality
 * and can adapt to viewport boundaries to prevent overflow.
 *
 * @interface PopoverProps
 * @property {ReactNode} children - The content or elements to which the component's behavior or functionality is applied.
 * @property {string} [className] - Additional class names to apply to the popover.
 * @property {boolean} open - A flag that determines whether the popover is visible or not.
 * @property {RefObject<HTMLDivElement>} elementRef - A reference to the target element the popover is anchored to.
 * @property {function} [onClose] - A function that is called when the popover is closed.
 * @property {('top' | 'center' | 'bottom')} [verticalAlign='bottom'] - The vertical alignment of the popover relative to the target element.
 * @property {('left' | 'center' | 'right')} [horizontalAlign='left'] - The horizontal alignment of the popover relative to the target element.
 * @property {('top' | 'center' | 'bottom')} [transformOriginVertical='top'] - The vertical transform origin for the popover's animation.
 * @property {('left' | 'center' | 'right')} [transformOriginHorizontal='left'] - The horizontal transform origin for the popover's animation.
 *
 */
declare const Popover: ({ children, className, open, elementRef, onClose, verticalAlign, horizontalAlign, transformOriginVertical, transformOriginHorizontal, }: PopoverProps) => React.JSX.Element | null;
export default Popover;
