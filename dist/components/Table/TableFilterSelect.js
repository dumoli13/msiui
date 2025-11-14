import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cx from 'classnames';
import Popper from '../Displays/Popper';
import Icon from '../Icon';
import AutoComplete from '../Inputs/AutoComplete';
import IconButton from '../Inputs/IconButton';
import Select from '../Inputs/Select';
const TableFilterSelect = ({ type, value, option, label, onChange, }) => {
    const inputRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);
    const handleChange = (value) => {
        onChange === null || onChange === void 0 ? void 0 : onChange(value);
        if (value === null) {
            setOpen(false);
        }
    };
    React.useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                var _a;
                (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [open]);
    return (_jsx(Popper, { open: open, onOpen: setOpen, className: "py-4 px-2", content: _jsxs(_Fragment, { children: [type === 'select' && (_jsx(Select, { value: value, inputRef: inputRef, onChange: handleChange, options: option, placeholder: `Select ${label}`, width: 280, clearable: true })), type === 'autocomplete' && (_jsx(AutoComplete, { value: value, inputRef: inputRef, onChange: handleChange, options: option, placeholder: `Select ${label}`, width: 280, clearable: true }))] }), children: _jsx(IconButton, { icon: _jsx(Icon, { name: "chevron-down", size: 16, className: cx({
                    'text-primary-main dark:text-primary-main-dark': value,
                }) }), variant: "outlined", className: cx({
                'border-primary-main dark:border-primary-main-dark bg-primary-surface dark:bg-primary-surface-dark': value,
            }), title: "Search by Option", size: "small" }) }));
};
export default TableFilterSelect;
