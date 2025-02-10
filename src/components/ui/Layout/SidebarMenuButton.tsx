import { ButtonHTMLAttributes, ReactNode } from 'react';
import cx from 'classnames';

interface SidebarMenuProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
  expand: boolean;
  onClick: () => void;
}

const SidebarMenuButton = ({
  icon,
  label,
  expand,
  onClick,
  ...props
}: SidebarMenuProps) => {
  return (
    <button
      className={cx(
        'cursor-pointer text-primary-main flex items-center justify-start gap-3 rounded-xl px-[13px] h-[50px] transition-all duration-300 ease-in-out overflow-hidden hover:bg-primary-surface',
        {
          'w-[200px]': expand,
          'w-[50px]': !expand,
        },
      )}
      style={{
        transitionProperty: 'width',
      }}
      onClick={onClick}
      {...props}
    >
      <div className="flex items-center">{icon}</div>
      {expand && <span className="font-bold text-20px truncate">{label}</span>}
    </button>
  );
};

export default SidebarMenuButton;
