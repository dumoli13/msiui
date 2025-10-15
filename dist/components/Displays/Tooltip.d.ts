import React from 'react';
export interface TooltipProps {
    children: React.ReactNode;
    onOpen?: (open: boolean) => void;
    verticalAlign?: 'top' | 'bottom';
    horizontalAlign?: 'left' | 'center' | 'right';
    arrow?: boolean;
    mouseEnterDelay?: number;
    mouseLeaveDelay?: number;
    title: string;
    disabled?: boolean;
}
/**
 * Tooltips display informative text when users hover over an element
 */
declare const Tooltip: ({ children, verticalAlign, horizontalAlign, arrow, mouseEnterDelay, mouseLeaveDelay, title, disabled, }: TooltipProps) => import("react/jsx-runtime").JSX.Element;
export default Tooltip;
//# sourceMappingURL=Tooltip.d.ts.map