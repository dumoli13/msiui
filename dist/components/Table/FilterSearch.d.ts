import React from 'react';
interface FilterSearchProps {
    value?: string;
    label?: string;
    onChange: (value: string) => void;
}
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
declare const FilterSearch: ({ value, label, onChange }: FilterSearchProps) => React.JSX.Element;
export default FilterSearch;
