export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'secondary' | 'outlined' | 'text' | 'link';
  color?: 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral';
  size?: 'small' | 'default' | 'large';
  loading?: boolean;
  icon?: React.ReactElement;
  title: string;
  titleVerticalAlign?: 'top' | 'bottom';
  titleHorizontalAlign?: 'left' | 'center' | 'right';
}
