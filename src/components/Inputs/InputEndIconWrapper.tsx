import React from 'react';
import Icon from '../Icon';

interface InputEndIconWrapperProps {
  loading?: boolean;
  error?: boolean;
  success?: boolean;
  clearable?: boolean;
  onClear?: () => void;
  endIcon?: React.ReactNode;
  children?: React.ReactNode;
}

function InputEndIconWrapper({
  loading = false,
  error = false,
  success = false,
  clearable = false,
  onClear,
  endIcon,
  children,
}: Readonly<InputEndIconWrapperProps>) {
  if (!clearable && !loading && !success && !error && !endIcon && !children)
    return null;

  return (
    <div className="flex gap-0.5 items-center shrink-0">
      {children}

      {clearable && (
        <button
          type="button"
          aria-label="Clear value"
          // Prevent the input from losing focus when clicking the clear button
          onMouseDown={(e) => e.preventDefault()}
          onClick={onClear}
          className="rounded-full p-[3px] text-neutral-70 dark:text-neutral-70-dark hover:bg-neutral-30 dark:hover:bg-neutral-30-dark transition-colors duration-150 cursor-pointer"
        >
          <Icon name="x-mark" size={18} strokeWidth={2} />
        </button>
      )}

      {loading && (
        // aria-hidden: loading state should be communicated via aria-busy on the form, not here
        <span aria-hidden="true">
          <Icon
            name="loader"
            animation="spin"
            strokeWidth={2}
            className="text-neutral-70 dark:text-neutral-70-dark"
          />
        </span>
      )}

      {success && !error && (
        // aria-hidden: success state is conveyed via the field value / form feedback, not this icon
        <span
          aria-hidden="true"
          className="shrink-0 rounded-full bg-success-main dark:bg-success-main-dark text-neutral-10 dark:text-neutral-10-dark flex items-center justify-center p-0.5 m-0.5"
        >
          <Icon name="check" strokeWidth={3} size={12} />
        </span>
      )}

      {error && (
        // aria-hidden: error state is conveyed via aria-invalid + aria-describedby on the input
        <span
          aria-hidden="true"
          className="h-4 w-4 text-12px shrink-0 rounded-full bg-danger-main dark:bg-danger-main-dark text-neutral-10 dark:text-neutral-10-dark font-bold flex items-center justify-center leading-none"
        >
          !
        </span>
      )}

      {endIcon && (
        <span
          aria-hidden="true"
          className="text-neutral-70 dark:text-neutral-70-dark"
        >
          {endIcon}
        </span>
      )}
    </div>
  );
}

export default InputEndIconWrapper;
