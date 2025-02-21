import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import { Search } from 'react-feather';
import Popper from '../Displays/Popper';
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
 * @example Basic Usage:
 * ```tsx
 * import React, { useState } from 'react';
 * import FilterSearch from './FilterSearch';
 *
 * const App = () => {
 *   const [searchTerm, setSearchTerm] = useState('');
 *
 *   return (
 *     <div>
 *       <FilterSearch
 *         value={searchTerm}
 *         label="Items"
 *         onChange={(value) => setSearchTerm(value)}
 *       />
 *       <p>Search Term: {searchTerm}</p>
 *     </div>
 *   );
 * };
 *
 * export default App;
 * ```
 *
 */
const FilterSearch = ({ value, label, onChange }) => {
    const inputRef = useRef(null);
    const [open, setOpen] = useState(false);
    const handleChange = (value) => {
        onChange === null || onChange === void 0 ? void 0 : onChange(value);
        if (value === '') {
            setOpen(false);
        }
    };
    useEffect(() => {
        var _a;
        if (open) {
            (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        }
    }, [open]);
    return (React.createElement(Popper, { open: open, onOpen: setOpen, content: React.createElement(TextField, { id: `search_${label}`, inputRef: inputRef, value: value, onChange: handleChange, placeholder: `Search ${label}`, startIcon: React.createElement(Search, { width: 16, height: 16 }), clearable: true, width: 280 }) },
        React.createElement(IconButton, { icon: React.createElement(Search, { width: 16, height: 16 }), variant: "outlined", className: cx({
                'border-primary-main text-primary-main bg-primary-surface': value,
            }), title: "Search by Keyword" })));
};
export default FilterSearch;
//# sourceMappingURL=FilterSearch.js.map