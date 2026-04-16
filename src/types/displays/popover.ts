export interface PopoverOrigin {
  vertical: 'top' | 'center' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
}

export interface PopoverProps {
  children: React.ReactNode;
  className?: string;
  open: boolean;
  elementRef: React.RefObject<HTMLElement | null>;
  onClose?: () => void;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
}
