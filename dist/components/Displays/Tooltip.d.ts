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
declare const Tooltip: ({ children, verticalAlign, horizontalAlign, arrow, mouseEnterDelay, mouseLeaveDelay, title, disabled, }: TooltipProps) => import("react/jsx-runtime").JSX.Element;
export default Tooltip;
//# sourceMappingURL=Tooltip.d.ts.map