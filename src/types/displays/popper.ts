import type { ModalAnimationConfig } from '../animation';

export type Vertical = 'top' | 'center' | 'bottom';
export type Horizontal = 'left' | 'center' | 'right';

export interface Origin {
  vertical: Vertical;
  horizontal: Horizontal;
}

export interface PopperProps {
  disabled?: boolean;
  trigger?: 'click' | 'hover';
  content: React.ReactNode;
  children: React.ReactElement;
  open?: boolean;
  onOpen?: (open: boolean) => void;

  anchorOrigin?: Origin;
  transformOrigin?: Origin;

  offset?: number;
  className?: string;
  style?: React.CSSProperties;
  onClickOutside?: () => void;
  animation?: ModalAnimationConfig;
}
