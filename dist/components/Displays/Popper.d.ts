import React from 'react';
export type Placement = 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right' | 'left' | 'left-top' | 'left-bottom' | 'right' | 'right-top' | 'right-bottom';
export interface PopperProps {
    disabled?: boolean;
    content: React.ReactNode;
    children: React.ReactElement;
    open?: boolean;
    onOpen?: (open: boolean) => void;
    placement?: Placement;
    offset?: number;
    className?: string;
    style?: React.CSSProperties;
    closeOnClickChild?: boolean;
    onClickOutside?: () => void;
}
declare const Popper: ({ disabled, content, children, open: openProp, onOpen, placement, offset, className, style, closeOnClickChild, onClickOutside, }: PopperProps) => import("react/jsx-runtime").JSX.Element;
export default Popper;
//# sourceMappingURL=Popper.d.ts.map