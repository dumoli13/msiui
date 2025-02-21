import React, { useRef, useState } from 'react';
import cx from 'classnames';
import { ChevronDown } from 'react-feather';
import Popper from '../Displays/Popper';
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
 * @example Basic Usage:
 *
 * ```tsx
 * import React, { useState } from 'react';
 * import FilterSelect from './FilterSelect';
 *
 * const options = [
 *   { id: 1, label: 'Option 1' },
 *   { id: 2, label: 'Option 2' },
 *   { id: 3, label: 'Option 3' },
 * ];
 *
 * const App = () => {
 *   const [selected, setSelected] = useState(null);
 *
 *   return (
 *     <div>
 *       <FilterSelect
 *         type="select"
 *         value={selected}
 *         option={options}
 *         label="Example"
 *         onChange={(value) => setSelected(value)}
 *       />
 *       <p>Selected: {selected?.label || 'None'}</p>
 *     </div>
 *   );
 * };
 *
 * export default App;
 * ```
 *
 */
const FilterSelect = ({ type, value, option, label, onChange, }) => {
    const inputRef = useRef(null);
    const [open, setOpen] = useState(false);
    const handleChange = (value) => {
        onChange === null || onChange === void 0 ? void 0 : onChange(value);
        if (value === null) {
            setOpen(false);
        }
    };
    return (React.createElement(Popper, { open: open, onOpen: setOpen, content: React.createElement(React.Fragment, null,
            type === 'select' && (React.createElement(Select, { value: value, inputRef: inputRef, onChange: handleChange, options: option, placeholder: `Select ${label}`, width: 280 })),
            type === 'autocomplete' && (React.createElement(AutoComplete, { value: value, inputRef: inputRef, onChange: handleChange, options: option, placeholder: `Select ${label}`, width: 280 }))) },
        React.createElement(IconButton, { icon: React.createElement(ChevronDown, { width: 16, height: 16 }), variant: "outlined", className: cx({
                'border-primary-main text-primary-main bg-primary-surface': value,
            }), title: "Select Option" })));
};
export default FilterSelect;
//# sourceMappingURL=FilterSelect.js.map