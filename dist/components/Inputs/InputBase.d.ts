import React from 'react';
export interface InputBaseProps {
    focused?: boolean;
    error?: boolean;
    success?: boolean;
    disabled?: boolean;
    size?: 'default' | 'large';
    width?: number;
    fullWidth?: boolean;
    startIcon?: React.ReactNode;
    /** Slot for end icons (e.g. InputEndIconWrapper). Rendered after children. */
    endIcons?: React.ReactNode;
    containerRef?: React.RefObject<HTMLDivElement | null>;
    className?: string;
    /** Controls flex item alignment. Use 'start' for multiline inputs like TextArea. Default: 'center'. */
    align?: 'center' | 'start';
    children: React.ReactNode;
}
/**
 * Internal visual wrapper shared by text-input-like components.
 * Handles border, focus ring, disabled/error/success states, size padding, and icon slots.
 * Not exported from the library index.
 */
declare function InputBase({ focused, error, success, disabled, size, width, fullWidth, startIcon, endIcons, containerRef, className, align, children, }: Readonly<InputBaseProps>): import("react/jsx-runtime").JSX.Element;
export default InputBase;
//# sourceMappingURL=InputBase.d.ts.map