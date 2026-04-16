import React from 'react';
import cx from 'classnames';

interface InputHelperProps {
  /** Matches the input's aria-describedby value so screen readers link the message. */
  id?: string;
  message?: React.ReactNode;
  error?: boolean;
  size: 'default' | 'large';
}

function InputHelper({ id, message, error, size }: Readonly<InputHelperProps>) {
  if (!message) return null;

  return (
    <div
      id={id}
      {...(error && { role: 'alert' })}
      className={cx('w-full text-left mt-1', {
        'text-danger-main dark:text-danger-main-dark': error,
        'text-neutral-60 dark:text-neutral-60-dark': !error,
        'text-12px': size === 'default',
        'text-16px': size === 'large',
      })}
    >
      {message}
    </div>
  );
}

export default InputHelper;
