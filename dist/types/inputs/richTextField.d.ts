import type { Editor } from '@tiptap/react';
export interface RichTextFieldRef {
    focus: () => void;
    blur: () => void;
    getHTML: () => string;
    getJSON: () => object;
    clearContent: () => void;
    /** Access the full TipTap Editor instance for advanced use */
    editor: Editor | null;
}
export interface RichTextFieldProps {
    /** Controlled HTML string value */
    value?: string;
    /** Uncontrolled initial HTML string */
    defaultValue?: string;
    /** Called with updated HTML string on every content change */
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
//# sourceMappingURL=richTextField.d.ts.map