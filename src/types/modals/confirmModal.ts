import type { ModalAnimationConfig } from '../animation';

export interface ConfirmModalProps {
  icon?: React.ReactNode;
  title: string;
  content: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  customAction?: Array<React.JSX.Element>;
  size?: 'default' | 'large';
  animation?: ModalAnimationConfig;
}

export interface ModalConfirmContainerProps {
  open: boolean;
  title?: React.ReactNode;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  width?: number;
  closeOnOverlayClick?: boolean;
  onClose?: () => void;
  cancelText?: string;
  onConfirm?: () => Promise<void> | void;
  confirmLoading?: boolean;
  confirmDisabled?: boolean;
  confirmText?: string;
  buttonColor?: 'primary' | 'success' | 'danger' | 'warning' | 'info';
  customAction?: Array<React.JSX.Element>;
  size?: 'default' | 'large';
  animation?: ModalAnimationConfig;
}
