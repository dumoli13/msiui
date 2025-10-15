import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import cx from 'classnames';
import Popper from '../Displays/Popper';
import Icon from '../Icon';
import IconButton from '../Inputs/IconButton';
import TextField from '../Inputs/TextField';
const TableFilterSearch = ({ value, label, onChange, }) => {
    const inputRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);
    const handleChange = (value) => {
        onChange === null || onChange === void 0 ? void 0 : onChange(value);
        if (value === '') {
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
    return (_jsx(Popper, { open: open, onOpen: setOpen, className: "py-4 px-2", content: _jsx(TextField, { id: `search_${label}`, inputRef: inputRef, value: value, onChange: handleChange, placeholder: `Search ${label}`, startIcon: _jsx(Icon, { name: "magnifying-glass", size: 16 }), clearable: true, width: 280 }), children: _jsx(IconButton, { icon: _jsx(Icon, { name: "magnifying-glass", size: 16, className: cx({
                    'text-primary-main dark:text-parimary-main-dark': value,
                }) }), variant: "outlined", className: cx({
                'border-primary-main dark:border-primary-main-dark bg-primary-surface dark:bg-primary-surface-dark': value,
            }), title: "Search by Keyword", size: "small" }) }));
};
export default TableFilterSearch;
