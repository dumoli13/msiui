import { MouseEventHandler } from 'react';

export type IconVariants = 'outline' | 'solid';

export interface IconProps {
  // name: 'academic-cap' | 'loader';
  variant?: IconVariants;
  color?: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
  onClick?: MouseEventHandler<HTMLSpanElement>;
}
