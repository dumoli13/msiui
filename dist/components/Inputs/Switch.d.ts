import React from 'react';
export interface SwitchRef {
    element: HTMLInputElement | null;
    value: boolean;
    focus: () => void;
    reset: () => void;
}
export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'defaultChecked' | 'onChange' | 'size' | 'required'> {
    defaultChecked?: boolean;
    label?: string;
    labelPosition?: 'top' | 'left';
    autoHideLabel?: boolean;
    onChange?: (checked: boolean) => void;
    helperText?: React.ReactNode;
    inputRef?: React.RefObject<SwitchRef | null> | React.RefCallback<SwitchRef | null>;
    size?: 'default' | 'large';
    fullWidth?: boolean;
    error?: boolean | string;
    trueLabel?: string;
    falseLabel?: string;
    width?: number;
    loading?: boolean;
}
/**
 *
 * @property {boolean} [checked] - The current state of the switch when controlled by a parent component.
 * @property {boolean} [defaultChecked=false] - The initial value of the input for uncontrolled usage.
 * @property {(checked: boolean) => void} [onChange] - Callback function to handle input changes.
 * @property {RefObject<SwitchRef> | React.RefCallback<SwitchRef>} [inputRef] - A reference to access the input field and its value programmatically.
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {boolean} [autoHideLabel=false] - A flag to set if label should automatically hide when the input is focused.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field.
 * @property {string} [className] - Additional class names to customize the component's style.
 * @property {boolean | string} [error] - A flag to display error of input field. If set to string, it will be displayed as error message.
 * @property {boolean} [loading=false] - A flag to display loading state if set to true.
 * @property {boolean} [disabled=false] - A flag that disables input field if set to true.
 * @property {'default' | 'large'} [size='default'] - The size of the input field.
 * @property {boolean} [fullWidth=false] - A flag that expand to full container width if set to true.
 * @property {number} [width] - Optional custom width for the input field (in px).
 * @property {string} [trueLabel='Yes'] - The label to display when the switch is in the "on" or "checked" state.
 * @property {string} [falseLabel='No'] - The label to display when the switch is in the "off" or "unchecked" state.
 *
 */
declare const Switch: ({ id, defaultChecked, checked: checkedProp, label, labelPosition, onChange, className, helperText, disabled: disabledProp, inputRef, size, fullWidth, error: errorProp, trueLabel, falseLabel, width, loading, ...props }: SwitchProps) => import("react/jsx-runtime").JSX.Element;
export default Switch;
//# sourceMappingURL=Switch.d.ts.map