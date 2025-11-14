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
export {};
//# sourceMappingURL=drawer.d.ts.map