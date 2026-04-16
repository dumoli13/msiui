export interface AlertProps {
  className?: string;
  children: string;
  color?: 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral';
  startIcon?: React.ReactNode;
  onRemove?: () => void;
}
