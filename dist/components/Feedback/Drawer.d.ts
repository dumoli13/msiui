import React from 'react';
type BaseDrawerProps = {
    className?: string;
    open: boolean;
    onClose?: () => void;
    children: React.ReactNode;
    disableBackdropClick?: boolean;
    disableEscapeKeyDown?: boolean;
};
type LeftRightDrawerProps = BaseDrawerProps & {
    position: 'left' | 'right';
    width?: number | string;
    height?: never;
};
type TopBottomDrawerProps = BaseDrawerProps & {
    position: 'top' | 'bottom';
    height?: number | string;
    width?: never;
};
export type DrawerProps = LeftRightDrawerProps | TopBottomDrawerProps;
/**
 * The navigation drawers (or "sidebars") provide ergonomic access to destinations
 * in a site or app functionality such as switching accounts.
 */
declare const Drawer: ({ className, position, open, onClose, children, width, height, disableBackdropClick, disableEscapeKeyDown, }: DrawerProps) => React.ReactPortal;
export default Drawer;
//# sourceMappingURL=Drawer.d.ts.map