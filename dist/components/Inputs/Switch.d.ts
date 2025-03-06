import React, { InputHTMLAttributes, ReactNode, RefCallback, RefObject } from 'react';
export interface SwitchRef {
    element: HTMLInputElement | null;
    checked: boolean;
    focus: () => void;
    reset: () => void;
}
export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'defaultChecked' | 'onChange' | 'size'> {
    defaultChecked?: boolean;
    label?: string;
    labelPosition?: 'top' | 'left';
    onChange?: (checked: boolean) => void;
    helperText?: ReactNode;
    inputRef?: RefObject<SwitchRef | null> | RefCallback<SwitchRef | null>;
    size?: 'default' | 'large';
    fullWidth?: boolean;
    error?: string;
    trueLabel?: string;
    falseLabel?: string;
    width?: number;
    loading?: boolean;
}
/**
 *
 * A toggle switch component that allows users to switch between two states, typically used for on/off or yes/no selections.
 * It can be customized with various features such as labels, loading state, error messages, and more.
 *
 * @param {boolean} [defaultChecked=false] - The initial state of the switch when uncontrolled. Defaults to `false` (off).
 * @param {boolean} [checked] - The current state of the switch when controlled by a parent component.
 * @param {string} [label] - The label text displayed above or beside the input field.
 * @param {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @param {(checked: boolean) => void} [onChange] - Callback function to handle state changes when the switch is toggled.
 * @param {ReactNode} [helperText] - A helper message displayed below the input field, often used for validation.
 * @param {RefObject<SwitchRef> | RefCallback<SwitchRef>} [inputRef] - A ref to directly access the switch element.
 * @param {'default' | 'large'} [size='default'] - The size of the input field (default or large).
 * @param {boolean} [fullWidth=false] - Whether the input should take up the full width of its container.
 * @param {string} [error] - Error message to display when the input has an error.
 * @param {string} [trueLabel='Yes'] - The label to display when the switch is in the "on" or "checked" state.
 * @param {string} [falseLabel='No'] - The label to display when the switch is in the "off" or "unchecked" state.
 * @param {number} [width] - Optional custom width for the input field.
 * @param {boolean} [loading=false] - Whether the input is in a loading state.
 *
 */
declare const Switch: ({ id, defaultChecked, checked: checkedProp, label, labelPosition, onChange, className, helperText, disabled, inputRef, size, fullWidth, error: errorProp, trueLabel, falseLabel, width, loading, ...props }: SwitchProps) => React.JSX.Element;
export default Switch;
