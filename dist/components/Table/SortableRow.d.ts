import React from 'react';
interface SortableRowProps {
    id: string;
    size: 'small' | 'default' | 'large';
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
    children: React.ReactNode;
}
declare const SortableRow: ({ id, size, disabled, className, style, onClick, children, }: SortableRowProps) => import("react/jsx-runtime").JSX.Element;
export default SortableRow;
//# sourceMappingURL=SortableRow.d.ts.map