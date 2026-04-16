import type { ModalAnimationConfig } from '../animation';

export interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  className?: string;
  width?: string | number;
  height?: string | number;
  closeOnOverlayClick?: boolean;
  onClose?: () => void;
  animation?: ModalAnimationConfig;
}
