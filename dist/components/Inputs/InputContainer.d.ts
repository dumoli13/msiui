import React from 'react';
interface InputContainerProps {
    inputId: string;
    label?: string;
    labelPosition?: 'top' | 'left';
    autoHideLabel?: boolean;
    required?: boolean;
    className?: string;
    focused?: boolean;
    error?: boolean | string;
    success?: boolean;
    helperText?: React.ReactNode;
    loading?: boolean;
    disabled?: boolean;
    size?: 'default' | 'large';
    width?: number;
    parentRef: React.RefObject<HTMLDivElement>;
    children: React.ReactNode;
}
declare const InputContainer: ({ inputId, label, autoHideLabel, labelPosition, required, className, focused, error, success, helperText, disabled, size, width, parentRef, children, }: InputContainerProps) => import("react/jsx-runtime").JSX.Element;
export default InputContainer;
//# sourceMappingURL=InputContainer.d.ts.map