export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'secondary' | 'outlined' | 'text' | 'link';
  color?: 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral';
  size?: 'small' | 'default' | 'large';
  fullWidth?: boolean;
  loading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}
