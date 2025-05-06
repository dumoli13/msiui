import React from 'react';
export interface TextAreaRef {
    element: HTMLTextAreaElement | null;
    value: string;
    focus: () => void;
    reset: () => void;
}
export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'size' | 'required'> {
    value?: string;
    defaultValue?: string;
    label?: string;
    labelPosition?: 'top' | 'left';
    autoHideLabel?: boolean;
    onChange?: (value: string) => void;
    helperText?: React.ReactNode;
    placeholder?: string;
    fullWidth?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    inputRef?: React.RefObject<TextAreaRef | null> | React.RefCallback<TextAreaRef | null>;
    size?: 'default' | 'large';
    error?: boolean | string;
    success?: boolean;
    loading?: boolean;
    lines?: number;
    width?: number;
}
/**
 *
 * @property {string} [value] - The value of the textarea. If provided, the textarea will be controlled.
 * @property {string} [defaultValue] - The initial value of the textarea for uncontrolled usage.
 * @property {(value: string) => void} [onChange] - Callback function to handle input changes.
 * @property {RefObject<TextAreaRef> | React.RefCallback<TextAreaRef>} [inputRef] - A reference to access the input field and its value programmatically.
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {boolean} [autoHideLabel=false] - A flag to set if label should automatically hide when the input is focused.
 * @property {string} [placeholder] - Placeholder text displayed inside the input field when it is empty.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field.
 * @property {string} [className] - Additional class names to customize the component's style.
 * @property {boolean | string} [error] - A flag to display error of input field. If set to string, it will be displayed as error message.
 * @property {boolean} [success] - A flag to display success of input field if set to true.
 * @property {boolean} [loading=false] - A flag to display loading state if set to true.
 * @property {boolean} [disabled=false] - A flag that disables input field if set to true.
 * @property {ReactNode} [startIcon] - An optional icon to display at the start of the input field.
 * @property {ReactNode} [endIcon] - An optional icon to display at the end of the input field.
 * @property {'default' | 'large'} [size='default'] - The size of the input field.
 * @property {boolean} [fullWidth=false] - A flag that expand to full container width if set to true.
 * @property {number} [width] - Optional custom width for the input field (in px).
 * @property {number} [lines=2] - The minimum number of lines (rows) visible in the textarea.
 *
 */
declare const TextArea: ({ id, value: valueProp, defaultValue, label, labelPosition, autoHideLabel, onChange, className, helperText, placeholder, disabled: disabledProp, fullWidth, startIcon, endIcon, inputRef, size, error: errorProp, success: successProp, loading, lines: minLines, width, ...props }: TextAreaProps) => import("react/jsx-runtime").JSX.Element;
export default TextArea;
//# sourceMappingURL=TextArea.d.ts.map