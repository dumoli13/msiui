import React from 'react';
import cx from 'classnames';

interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ModalFooter = ({ className, children }: ModalFooterProps) => {
  return (
    <div
      className={cx(
        'px-6 py-3 bg-neutral-20 dark:bg-neutral-30-dark flex justify-end items-center gap-3 rounded-b-md',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default ModalFooter;
