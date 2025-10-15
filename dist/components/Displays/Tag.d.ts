import React from 'react';
export interface TagProps {
    className?: string;
    children: string;
    color: 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral';
    size?: 'small' | 'default' | 'large';
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    onRemove?: () => void;
}
/**
 *
 * Tag are compact elements that represent an input, attribute, or action.
 *
 */
declare function Tag({ className, children, color, size, startIcon, endIcon, onRemove, }: Readonly<TagProps>): import("react/jsx-runtime").JSX.Element;
export default Tag;
//# sourceMappingURL=Tag.d.ts.map