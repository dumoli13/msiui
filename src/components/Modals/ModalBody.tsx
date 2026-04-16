import React from 'react';
import cx from 'classnames';

interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ModalBody = ({ className, children }: ModalBodyProps) => {
  return (
    <div className={cx('pb-4 px-6 h-full flex-1 overflow-auto', className)}>
      {children}
    </div>
  );
};

export default ModalBody;
