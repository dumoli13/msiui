import React from 'react';
interface InputEndIconWrapperProps {
    loading?: boolean;
    error?: boolean;
    success?: boolean;
    clearable?: boolean;
    onClear?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    endIcon?: React.ReactNode;
    children?: React.ReactNode;
}
declare const InputEndIconWrapper: ({ loading, error, success, clearable, onClear, endIcon, children, }: InputEndIconWrapperProps) => import("react/jsx-runtime").JSX.Element;
export default InputEndIconWrapper;
//# sourceMappingURL=InputEndIconWrapper.d.ts.map