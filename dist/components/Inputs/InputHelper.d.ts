import React from 'react';
interface InputHelperProps {
    /** Matches the input's aria-describedby value so screen readers link the message. */
    id?: string;
    message?: React.ReactNode;
    error?: boolean;
    size: 'default' | 'large';
}
declare function InputHelper({ id, message, error, size }: Readonly<InputHelperProps>): import("react/jsx-runtime").JSX.Element | null;
export default InputHelper;
//# sourceMappingURL=InputHelper.d.ts.map