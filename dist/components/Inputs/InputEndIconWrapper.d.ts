import React from 'react';
interface InputEndIconWrapperProps {
    loading?: boolean;
    error?: boolean;
    success?: boolean;
    clearable?: boolean;
    onClear?: () => void;
    endIcon?: React.ReactNode;
    children?: React.ReactNode;
}
declare function InputEndIconWrapper({ loading, error, success, clearable, onClear, endIcon, children, }: Readonly<InputEndIconWrapperProps>): import("react/jsx-runtime").JSX.Element | null;
export default InputEndIconWrapper;
//# sourceMappingURL=InputEndIconWrapper.d.ts.map