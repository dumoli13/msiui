import React from 'react';
import cx from 'classnames';
import Popper from '../Displays/Popper';
import Icon from '../Icon';
import AutoComplete from '../Inputs/AutoComplete';
import IconButton from '../Inputs/IconButton';
import Select, { SelectRef, SelectValue } from '../Inputs/Select';

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

const FilterSelect = <T extends { [key: string]: any }, D>({
  type,
  value,
  option,
  label,
  onChange,
}: FilterSearchProps<T, D>) => {
  const inputRef = React.useRef<SelectRef<T>>(null);
  const [open, setOpen] = React.useState(false);

  const handleChange = (value: SelectValue<T, D> | null) => {
    onChange?.(value);
    if (value === null) {
      setOpen(false);
    }
  };

  return (
    <Popper
      open={open}
      onOpen={setOpen}
      content={
        <>
          {type === 'select' && (
            <Select<T, D>
              value={value}
              inputRef={inputRef}
              onChange={handleChange}
              options={option}
              placeholder={`Select ${label}`}
              width={280}
            />
          )}
          {type === 'autocomplete' && (
            <AutoComplete<T, D>
              value={value}
              inputRef={inputRef}
              onChange={handleChange}
              options={option}
              placeholder={`Select ${label}`}
              width={280}
            />
          )}
        </>
      }
    >
      <IconButton
        icon={
          <Icon
            name="chevron-down"
            size={16}
            className={cx({
              'text-primary-main dark:text-primary-main-dark': value,
            })}
          />
        }
        variant="outlined"
        className={cx({
          'border-primary-main dark:border-primary-main-dark bg-primary-surface dark:bg-primary-surface-dark':
            value,
        })}
        title="Select Option"
      />
    </Popper>
  );
};

export default FilterSelect;
