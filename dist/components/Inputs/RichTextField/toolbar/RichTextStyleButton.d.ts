import React from 'react';
type StyleType = 'bold' | 'italic' | 'underline' | 'strike' | 'code';
interface ToolbarButtonProps {
    children: React.ReactNode;
    active?: boolean;
    disabled?: boolean;
    title?: string;
    onClick: () => void;
}
export declare const ToolbarButton: ({ children, active, disabled, title, onClick, }: ToolbarButtonProps) => import("react/jsx-runtime").JSX.Element;
interface RichTextStyleButtonProps {
    style: StyleType;
}
declare const RichTextStyleButton: ({ style }: RichTextStyleButtonProps) => import("react/jsx-runtime").JSX.Element | null;
export default RichTextStyleButton;
//# sourceMappingURL=RichTextStyleButton.d.ts.map