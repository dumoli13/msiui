import React from 'react';
import type { Editor } from '@tiptap/react';
import './RichTextField.css';
export interface RichTextFieldRef {
    focus: () => void;
    blur: () => void;
    getHTML: () => string;
    getJSON: () => object;
    clearContent: () => void;
    editor: Editor | null;
}
export interface RichTextFieldProps {
    /** Controlled HTML string value */
    value?: string;
    /** Uncontrolled initial HTML string */
    defaultValue?: string;
    /** Called with updated HTML on every content change */
    onChange?: (html: string) => void;
    label?: string;
    labelPosition?: 'top' | 'left';
    autoHideLabel?: boolean;
    size?: 'default' | 'large';
    width?: string | number;
    placeholder?: string;
    helperText?: string;
    className?: string;
    disabled?: boolean;
    error?: boolean | string;
    success?: boolean;
    required?: boolean;
    id?: string;
    name?: string;
    inputRef?: React.Ref<RichTextFieldRef>;
}
declare const RichTextField: ({ value, defaultValue, onChange, label, labelPosition, autoHideLabel, size, width, placeholder, helperText, className, disabled, error, success, required, id, name, inputRef, }: RichTextFieldProps) => import("react/jsx-runtime").JSX.Element;
export default RichTextField;
//# sourceMappingURL=index.d.ts.map