import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import Popper from '../Displays/Popper';
import Icon from '../Icon';
import IconButton from '../Inputs/IconButton';
import TextField, { TextfieldRef } from '../Inputs/TextField';

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

const FilterSearch = ({ value, label, onChange }: FilterSearchProps) => {
  const inputRef = useRef<TextfieldRef>(null);
  const [open, setOpen] = useState(false);

  const handleChange = (value: string) => {
    onChange?.(value);
    if (value === '') {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  return (
    <Popper
      open={open}
      onOpen={setOpen}
      content={
        <TextField
          id={`search_${label}`}
          inputRef={inputRef}
          value={value}
          onChange={handleChange}
          placeholder={`Search ${label}`}
          startIcon={<Icon name="magnifying-glass" size={16} />}
          clearable
          width={280}
        />
      }
    >
      <IconButton
        icon={<Icon name="magnifying-glass" size={16} />}
        variant="outlined"
        className={cx({
          'border-primary-main text-primary-main bg-primary-surface': value,
        })}
        title="Search by Keyword"
      />
    </Popper>
  );
};

export default FilterSearch;
