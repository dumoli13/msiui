import React from 'react';
interface InputEndIconWrapperProps {
    loading?: boolean;
    error?: boolean;
    success?: boolean;
    size: 'default' | 'large';
    clearable?: boolean;
    onClear?: (e: React.MouseEvent<HTMLDivElement>) => void;
    endIcon?: React.ReactNode;
    children?: React.ReactNode;
}
declare const InputEndIconWrapper: ({ loading, error, success, size, clearable, onClear, endIcon, children, }: InputEndIconWrapperProps) => import("react/jsx-runtime").JSX.Element;
export default InputEndIconWrapper;
//# sourceMappingURL=InputEndIconWrapper.d.ts.map