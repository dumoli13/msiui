import React from 'react';
import cx from 'classnames';
import Popper from '../Displays/Popper';
import Icon from '../Icon';
import IconButton from '../Inputs/IconButton';
import TextField from '../Inputs/TextField';
/**
 * @component FilterSearch
 *
 * A component that provides a search input within a popper dropdown. This component is typically
 * used for filtering or searching functionality, allowing users to enter a keyword and display a
 * filtered result set.
 *
 * @property {string} [value] - The current value of the search input. Used for controlled input behavior.
 * @property {string} [label] - A label for the search input, displayed as part of the placeholder text.
 * @property {(value: string) => void} onChange - Callback function triggered whenever the value of the search input changes.
 *
 */
const FilterSearch = ({ value, label, onChange }) => {
    const inputRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);
    const handleChange = (value) => {
        onChange === null || onChange === void 0 ? void 0 : onChange(value);
        if (value === '') {
            setOpen(false);
        }
    };
    React.useEffect(() => {
        var _a;
        if (open) {
            (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        }
    }, [open]);
    return (React.createElement(Popper, { open: open, onOpen: setOpen, content: React.createElement(TextField, { id: `search_${label}`, inputRef: inputRef, value: value, onChange: handleChange, placeholder: `Search ${label}`, startIcon: React.createElement(Icon, { name: "magnifying-glass", size: 16 }), clearable: true, width: 280 }) },
        React.createElement(IconButton, { icon: React.createElement(Icon, { name: "magnifying-glass", size: 16, className: cx({
                    'text-primary-main dark:text-parimary-main-dark': value,
                }) }), variant: "outlined", className: cx({
                'border-primary-main dark:border-primary-main-dark bg-primary-surface dark:bg-primary-surface-dark': value,
            }), title: "Search by Keyword" })));
};
export default FilterSearch;
