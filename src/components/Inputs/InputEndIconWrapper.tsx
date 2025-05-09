import React from 'react';
import cx from 'classnames';
import Icon from '../Icon';

interface InputEndIconWrapperProps {
  loading?: boolean;
  error?: boolean;
  success?: boolean;
  size: 'default' | 'large';
  clearable?: boolean;
  onClear?: (e: React.MouseEvent<HTMLDivElement>) => void;
  endIcon?: React.ReactNode;
  children?: React.ReactNode;
}

const InputEndIconWrapper = ({
  loading = false,
  error = false,
  success = false,
  size,
  clearable = false,
  onClear,
  endIcon,
  children,
}: InputEndIconWrapperProps) => {
  return (
    <div
      className={cx('flex gap-1 items-center', {
        'text-16px': size === 'default',
        'text-20px': size === 'large',
      })}
    >
      {children}
      {clearable && (
        <Icon
          name="x-mark"
          strokeWidth={3}
          onClick={onClear}
          className="rounded-full hover:bg-neutral-30 dark:hover:bg-neutral-30-dark text-neutral-70 dark:text-neutral-70-dark transition-color"
        />
      )}
      {loading && (
        <Icon
          name="loader"
          animation="spin"
          strokeWidth={2}
          className="text-neutral-70 dark:text-neutral-70-dark"
        />
      )}
      {success && (
        <Icon
          name="check"
          strokeWidth={3}
          size={12}
          className="shrink-0 rounded-full bg-success-main dark:bg-success-main-dark text-neutral-10 dark:text-neutral-10-dark flex items-center justify-center p-0.5"
        />
      )}
      {error && (
        <div
          className={cx(
            'shrink-0 rounded-full bg-danger-main dark:bg-danger-main-dark text-neutral-10 dark:text-neutral-10-dark font-bold flex items-center justify-center leading-none',
            {
              'h-4 w-4 text-12px': size === 'default',
              'h-5 w-5 text-16px': size === 'large',
            },
          )}
        >
          !
        </div>
      )}
      {!!endIcon && (
        <div className={cx('text-neutral-70 dark:text-neutral-70-dark')}>
          {endIcon}
        </div>
      )}
    </div>
  );
};

export default InputEndIconWrapper;
