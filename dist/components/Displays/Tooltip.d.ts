import React, { ReactNode } from 'react';
export interface TooltipProps {
    children: ReactNode;
    onOpen?: (open: boolean) => void;
    verticalAlign?: 'top' | 'bottom';
    horizontalAlign?: 'left' | 'center' | 'right';
    arrow?: boolean;
    mouseEnterDelay?: number;
    mouseLeaveDelay?: number;
    title: string;
}
/**
 *
 * A customizable tooltip component that displays a small overlay with a message when the user hovers over a target element.
 * The tooltip can have customizable alignment, delay times, and an optional arrow indicator. The position of the tooltip
 * is dynamically calculated based on the target element's position on the screen and the viewport size.
 *
 * @interface TooltipProps
 * @property {ReactNode} children - The content or elements to which the component's behavior or functionality is applied.
 * @property {function} [onOpen] - A callback function triggered when the tooltip opens or closes.
 * @property {string} [verticalAlign='bottom'] - The vertical alignment of the tooltip relative to the target element. Can be 'top', 'bottom', or 'center'.
 * @property {string} [horizontalAlign='center'] - The horizontal alignment of the tooltip relative to the target element. Can be 'left', 'center', or 'right'.
 * @property {boolean} [arrow=true] - A flag to control whether the tooltip shows an arrow indicating its direction.
 * @property {number} [mouseEnterDelay=500] - The delay (in milliseconds) before the tooltip appears after the mouse enters the target element.
 * @property {number} [mouseLeaveDelay=0] - The delay (in milliseconds) before the tooltip disappears after the mouse leaves the target element.
 * @property {string} title - The content of the tooltip, which will be displayed inside the tooltip box.
 *
 */
declare const Tooltip: ({ children, verticalAlign, horizontalAlign, arrow, mouseEnterDelay, mouseLeaveDelay, title, }: TooltipProps) => React.JSX.Element;
export default Tooltip;
