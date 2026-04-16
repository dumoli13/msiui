import React from 'react';
import cx from 'classnames';

export interface InputBaseProps {
  focused?: boolean;
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
  size?: 'default' | 'large';
  width?: number;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  /** Slot for end icons (e.g. InputEndIconWrapper). Rendered after children. */
  endIcons?: React.ReactNode;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
  /** Controls flex item alignment. Use 'start' for multiline inputs like TextArea. Default: 'center'. */
  align?: 'center' | 'start';
  children: React.ReactNode;
}

/**
 * Internal visual wrapper shared by text-input-like components.
 * Handles border, focus ring, disabled/error/success states, size padding, and icon slots.
 * Not exported from the library index.
 */
function InputBase({
  focused,
  error,
  success,
  disabled,
  size = 'default',
  width,
  fullWidth,
  startIcon,
  endIcons,
  containerRef,
  className,
  align = 'center',
  children,
}: Readonly<InputBaseProps>) {
  return (
    <div
      ref={containerRef}
      style={width !== undefined ? { width } : undefined}
      className={cx(
        'relative px-3 border rounded-md flex gap-2',
        'transition-[border-color,box-shadow] duration-150 ease-in-out',
        align === 'start' ? 'items-start' : 'items-center',
        {
          'w-full': fullWidth,

          // Background
          'bg-neutral-20 dark:bg-neutral-30-dark cursor-not-allowed text-neutral-60 dark:text-neutral-60-dark':
            disabled,
          'bg-neutral-10 dark:bg-neutral-10-dark shadow-box-3': !disabled,

          // Error border (always overrides other border colors)
          'border-danger-main dark:border-danger-main-dark': error,
          'ring-3 ring-danger-focus dark:ring-danger-focus-dark':
            error && focused,

          // Focused, no error
          'border-primary-main dark:border-primary-main-dark ring-3 ring-primary-focus dark:ring-primary-focus-dark':
            !error && focused,

          // Success, no error, not focused
          'border-success-main dark:border-success-main-dark':
            !error && !focused && success,

          // Default border (all non-error, non-focused states including disabled)
          'border-neutral-50 dark:border-neutral-50-dark':
            !error && !focused && !success,
          // Hover only when interactive
          'hover:border-primary-hover dark:hover:border-primary-hover-dark':
            !error && !focused && !disabled,

          // Size
          'py-[3px]': size === 'default',
          'py-[9px]': size === 'large',
        },
        className,
      )}
    >
      {startIcon && (
        <span
          aria-hidden="true"
          className="shrink-0 text-neutral-70 dark:text-neutral-70-dark"
        >
          {startIcon}
        </span>
      )}
      {children}
      {endIcons}
    </div>
  );
}

export default InputBase;
