import { MouseEventHandler } from 'react';
export type IconVariants = 'outline' | 'solid';
export interface IconProps {
    variant?: IconVariants;
    color?: string;
    size?: number;
    strokeWidth?: number;
    className?: string;
    onClick?: MouseEventHandler<HTMLSpanElement>;
}
