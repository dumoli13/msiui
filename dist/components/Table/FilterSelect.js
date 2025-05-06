import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cx from 'classnames';
import Popper from '../Displays/Popper';
import Icon from '../Icon';
import AutoComplete from '../Inputs/AutoComplete';
import IconButton from '../Inputs/IconButton';
import Select from '../Inputs/Select';
/**
 * @component FilterSelect
 *
 * A flexible selection component that supports both dropdown and autocomplete behavior.
 * It is designed to handle dynamic options and provide a user-friendly interface for
 * selecting values.
 *
 * @template T, D - Generic types `T` and `D` for representing data structures of options and selected values.
 * @property {'select' | 'autocomplete'} type - Determines whether the component behaves as a dropdown (`Select`) or as an autocomplete input (`AutoComplete`).
 * @property {SelectValue<T, D> | null} [value] - The currently selected value. Used for controlled component behavior. Can be `null` to indicate no selection.
 * @property {Array<SelectValue<T, D>>} option - The list of options available for selection. Each option is represented as a `SelectValue` object.
 * @property {string} [label] - A label for the input, displayed in the placeholder text.
 * @property {(value: SelectValue<T, D> | null) => void} [onChange] - Callback function triggered whenever the selected value changes. Passes the new value or `null` if cleared.
 *
 */
const FilterSelect = ({ type, value, option, label, onChange, }) => {
    const inputRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);
    const handleChange = (value) => {
        onChange === null || onChange === void 0 ? void 0 : onChange(value);
        if (value === null) {
            setOpen(false);
        }
    };
    return (_jsx(Popper, { open: open, onOpen: setOpen, content: _jsxs(_Fragment, { children: [type === 'select' && (_jsx(Select, { value: value, inputRef: inputRef, onChange: handleChange, options: option, placeholder: `Select ${label}`, width: 280 })), type === 'autocomplete' && (_jsx(AutoComplete, { value: value, inputRef: inputRef, onChange: handleChange, options: option, placeholder: `Select ${label}`, width: 280 }))] }), children: _jsx(IconButton, { icon: _jsx(Icon, { name: "chevron-down", size: 16, className: cx({
                    'text-primary-main dark:text-primary-main-dark': value,
                }) }), variant: "outlined", className: cx({
                'border-primary-main dark:border-primary-main-dark bg-primary-surface dark:bg-primary-surface-dark': value,
            }), title: "Select Option" }) }));
};
export default FilterSelect;
