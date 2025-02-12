import React, { ReactNode, RefCallback, RefObject, TextareaHTMLAttributes } from 'react';
export interface TextAreaRef {
    element: HTMLTextAreaElement | null;
    value: string;
    focus: () => void;
}
interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'size'> {
    value?: string;
    defaultValue?: string;
    label?: string;
    labelPosition?: 'top' | 'left';
    autoHideLabel?: boolean;
    onChange?: (value: string) => void;
    helperText?: ReactNode;
    placeholder?: string;
    fullWidth?: boolean;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    inputRef?: RefObject<TextAreaRef | null> | RefCallback<TextAreaRef | null>;
    size?: 'default' | 'large';
    error?: string;
    success?: boolean;
    minLines?: number;
    maxLines?: number;
    width?: number;
}
/**
 * TextArea Component
 *
 * A customizable multi-line text input component that supports various features such as labels, icons, error/success states,
 * placeholder text, and the ability to handle dynamic height (min/max lines). This component is ideal for longer form inputs
 * like comments, descriptions, or messages.
 *
 * @property {string} [value] - The value of the textarea. If provided, the textarea will be controlled.
 * @property {string} [defaultValue] - The initial value of the textarea for uncontrolled usage.
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {boolean} [autoHideLabel=false] - Whether the label should automatically hide when the textarea is focused.
 * @property {(value: string) => void} [onChange] - Callback function to handle textarea value changes.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field, often used for validation.
 * @property {string} [placeholder] - Placeholder text displayed inside the textarea when it is empty.
 * @property {boolean} [fullWidth=false] - Whether the input should take up the full width of its container.
 * @property {ReactNode} [startIcon] - An optional icon to display at the start of the input field.
 * @property {ReactNode} [endIcon] - An optional icon to display at the end of the input field.
 * @property {RefObject<TextAreaRef> | RefCallback<TextAreaRef>} [inputRef] - A ref to access the textarea element directly.
 * @property {'default' | 'large'} [size='default'] - The size of the input field (default or large).
 * @property {string} [error] - Error message to display when the input has an error.
 * @property {boolean} [success=false] - Whether the input field is in a success state.
 * @property {number} [minLines=2] - The minimum number of lines (rows) visible in the textarea.
 * @property {number} [maxLines] - The maximum number of lines (rows) the textarea can expand to.
 * @property {number} [width] - Optional custom width for the input field.
 *
 * @example Basic Usage:
 * ```tsx
 * <TextArea
 *   label="Description"
 *   value={description}
 *   onChange={(value) => setDescription(value)}
 *   placeholder="Enter your description here"
 *   size="large"
 *   minLines={4}
 *   maxLines={8}
 *   success={isValidDescription}
 * />
 * ```
 *
 * @returns {JSX.Element} The rendered TextArea component.
 */
declare const TextArea: ({ id, value: valueProp, defaultValue, label, labelPosition, onChange, className, helperText, placeholder, disabled, fullWidth, startIcon, endIcon, inputRef, size, error: errorProp, success: successProp, minLines, maxLines, width, ...props }: TextAreaProps) => React.JSX.Element;
export default TextArea;
