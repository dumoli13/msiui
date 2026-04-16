import React from 'react';

type ModalHeaderProps =
  | {
      icon?: React.ReactNode;
      title: string;
      children?: never;
    }
  | {
      icon?: React.ReactNode;
      title?: never;
      children: React.ReactNode;
    };

const ModalHeader = ({ icon, title, children }: ModalHeaderProps) => {
  return (
    <div id="modal-title" className="pt-6 pb-2 px-6 flex items-center gap-4">
      {children ?? (
        <>
          {icon}
          <div className="text-20px font-semibold text-neutral-100 dark:text-neutral-100-dark w-full break-words">
            {title}
          </div>
        </>
      )}
    </div>
  );
};

export default ModalHeader;
