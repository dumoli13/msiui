import React, { ButtonHTMLAttributes, ReactNode, Ref, forwardRef } from 'react';
import cx from 'classnames';
import Icon from '../Icon';

export type ButtonVariant = 'contained' | 'secondary' | 'outlined' | 'text';
export type ButtonColor = 'primary' | 'success' | 'danger' | 'warning' | 'info';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: 'small' | 'default' | 'large';
  fullWidth?: boolean;
  loading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const Button = forwardRef(
  (
    {
      children,
      variant = 'contained',
      color = 'primary',
      size = 'default',
      className,
      disabled = false,
      fullWidth = false,
      loading = false,
      startIcon,
      endIcon,
      onClick,
      type = 'button',
      ...rest
    }: ButtonProps,
    ref: Ref<HTMLButtonElement>,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        type={type}
        onClick={onClick}
        className={cx(
          'relative rounded-md font-medium h-fit disabled:cursor-not-allowed',
          fullWidth && 'w-full shrink-0',
          {
            'py-4 text-32px px-4': size === 'large',
            'py-2.5 text-24px px-4': size === 'default',
            'py-2.5 text-16px px-2': size === 'small',
          },
          // Variants
          {
            'text-neutral-10 focus:ring-3 disabled:border disabled:border-neutral-40 disabled:text-neutral-60 disabled:bg-neutral-30 drop-shadow':
              variant === 'contained',
            'bg-primary-main hover:bg-primary-hover active:bg-primary-pressed focus:bg-primary-hover focus:ring-primary-focus':
              color === 'primary' && variant === 'contained',
            'bg-success-main hover:bg-success-hover active:bg-success-pressed focus:bg-success-hover focus:ring-success-focus':
              color === 'success' && variant === 'contained',
            'bg-danger-main hover:bg-danger-hover active:bg-danger-pressed focus:bg-danger-hover focus:ring-danger-focus':
              color === 'danger' && variant === 'contained',
            'bg-warning-main hover:bg-warning-hover active:bg-warning-pressed focus:bg-warning-hover focus:ring-warning-focus':
              color === 'warning' && variant === 'contained',
            'bg-info-main hover:bg-info-hover active:bg-info-pressed focus:bg-info-hover focus:ring-info-surface':
              color === 'info' && variant === 'contained',
            // Secondary
            'focus:ring-3 disabled:border disabled:border-neutral-40 disabled:text-neutral-60 disabled:bg-neutral-30 drop-shadow':
              variant === 'secondary',
            'text-primary-main bg-primary-surface hover:text-primary-hover active:text-primary-pressed focus:ring-primary-focus':
              color === 'primary' && variant === 'secondary',
            'text-success-main bg-success-surface hover:text-success-hover active:text-success-pressed focus:ring-success-focus':
              color === 'success' && variant === 'secondary',
            'text-danger-main bg-danger-surface hover:text-danger-hover active:text-danger-pressed focus:ring-danger-focus':
              color === 'danger' && variant === 'secondary',
            'text-warning-main bg-warning-surface hover:text-warning-hover active:text-warning-pressed focus:ring-warning-focus':
              color === 'warning' && variant === 'secondary',
            'text-info-main bg-info-surface hover:text-info-hover active:text-info-pressed focus:ring-info-surface':
              color === 'info' && variant === 'secondary',
            // Outlined
            'text-neutral-100 bg-neutral-10 hover:bg-neutral-20 active:bg-neutral-39 border focus:ring-3 border-neutral-40 disabled:text-neutral-60 disabled:bg-neutral-30 drop-shadow':
              variant === 'outlined',
            'focus:ring-primary-focus':
              color === 'primary' && variant === 'outlined',
            'focus:ring-success-focus':
              color === 'success' && variant === 'outlined',
            'focus:ring-danger-focus':
              color === 'danger' && variant === 'outlined',
            'focus:ring-warning-focus':
              color === 'warning' && variant === 'outlined',
            'focus:ring-info-focus': color === 'info' && variant === 'outlined',
            // Text
            'focus:ring-3 disabled:text-neutral-60': variant === 'text',
            'text-primary-main hover:text-primary-hover active:text-primary-pressed focus:ring-primary-focus':
              color === 'primary' && variant === 'text',
            'text-success-main hover:text-success-hover active:text-success-pressed focus:ring-success-focus':
              color === 'success' && variant === 'text',
            'text-danger-main hover:text-danger-hover active:text-danger-pressed focus:ring-danger-focus':
              color === 'danger' && variant === 'text',
            'text-warning-main hover:text-warning-hover active:text-warning-pressed focus:ring-warning-focus':
              color === 'warning' && variant === 'text',
            'text-info-main hover:text-info-hover active:text-info-pressed focus:ring-info-focus':
              color === 'info' && variant === 'text',
          },
          className,
        )}
        tabIndex={disabled ? -1 : 0}
        {...rest}
      >
        <span
          className={cx('flex justify-center items-center gap-1.5', {
            'min-h-[35px]': size === 'default' || size === 'large',
            invisible: loading,
          })}
        >
          {startIcon}
          {children}
          {endIcon}
        </span>
        {loading && (
          <span className="absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center">
            <Icon name="loader" className="animate-spin" />
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
