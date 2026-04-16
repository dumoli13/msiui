import cx from 'classnames';

interface InputLabelProps {
  id?: string;
  children: string;
  size?: 'default' | 'large';
  required?: boolean;
}

function InputLabel({
  id,
  children,
  size = 'default',
  required,
}: Readonly<InputLabelProps>) {
  return (
    <label
      htmlFor={id}
      className={cx(
        'shrink-0 block text-left text-neutral-80 dark:text-neutral-100-dark mb-1',
        {
          'text-12px': size === 'default',
          'text-16px': size === 'large',
        },
      )}
    >
      {children}
      {required && (
        // aria-hidden: required state is conveyed to screen readers via aria-required on the input
        <span
          aria-hidden="true"
          className="text-danger-main dark:text-danger-main-dark ml-0.5"
        >
          *
        </span>
      )}
    </label>
  );
}

export default InputLabel;
