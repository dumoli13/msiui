import React from 'react';
import cx from 'classnames';
import type { TextfieldRef } from '../../types';
import type { TableFilterSearchProps } from '../../types/table/tableFilterSearch';
import Popper from '../Displays/Popper';
import Icon from '../Icon';
import IconButton from '../Inputs/IconButton';
import TextField from '../Inputs/TextField';

const TableFilterSearch = ({
  value,
  label,
  onChange,
}: TableFilterSearchProps) => {
  const inputRef = React.useRef<TextfieldRef>(null);
  const [open, setOpen] = React.useState(false);

  const handleChange = (newValue: string) => {
    onChange?.(newValue);
    if (newValue === '') {
      setOpen(false);
    }
  };

  React.useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <Popper
      open={open}
      onOpen={setOpen}
      className="py-4 px-2"
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
        icon={
          <Icon
            name="magnifying-glass"
            size={16}
            className={cx({
              'text-primary-main dark:text-parimary-main-dark': value,
            })}
            strokeWidth={2}
          />
        }
        variant="outlined"
        className={cx({
          'border-primary-main dark:border-primary-main-dark bg-primary-surface dark:bg-primary-surface-dark':
            value,
        })}
        title="Search by Keyword"
        size="small"
      />
    </Popper>
  );
};

export default TableFilterSearch;
