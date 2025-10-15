import React from 'react';
export interface PopoverProps {
    children: React.ReactNode;
    className?: string;
    open: boolean;
    elementRef: React.RefObject<HTMLElement | null>;
    onClose?: () => void;
    verticalAlign?: 'top' | 'center' | 'bottom';
    horizontalAlign?: 'left' | 'center' | 'right';
}
declare const Popover: ({ children, className, open, elementRef, onClose, verticalAlign, horizontalAlign, }: PopoverProps) => React.ReactPortal | null;
export default Popover;
//# sourceMappingURL=Popover.d.ts.map