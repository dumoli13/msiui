import React from 'react';
import { SelectValue } from '../Inputs/Select';
interface FilterSearchProps<T, D> {
    type: 'select' | 'autocomplete';
    value?: SelectValue<T, D> | null;
    option: Array<SelectValue<T, D>>;
    label?: string;
    onChange?: (value: SelectValue<T, D> | null) => void;
}
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
declare const FilterSelect: <T extends {
    [key: string]: any;
}, D>({ type, value, option, label, onChange, }: FilterSearchProps<T, D>) => React.JSX.Element;
export default FilterSelect;
//# sourceMappingURL=FilterSelect.d.ts.map