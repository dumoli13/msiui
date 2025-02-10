import { ButtonHTMLAttributes, ReactNode } from 'react';
import useFormStore from '@/stores/FormStore';
import cx from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '../Modal';

interface SidebarMenuProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
  href: string;
  expand: boolean;
}

const SidebarMenuLink = ({
  icon,
  label,
  href,
  expand,
  ...props
}: SidebarMenuProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isFormEdited = useFormStore((state) => state.isFormEdited);
  const active = location.pathname.includes(href);

  const handleRoute = (href: string) => {
    if (isFormEdited) {
      Modal.danger({
        title: 'Unsaved Changes',
        content: 'You have unsaved changes. Going back now will discard them.',
        confirmText: 'Discard',
        onConfirm: () => {
          navigate(href);
        },
      });
    } else {
      navigate(href);
    }
  };

  return (
    <button
      role="link"
      tabIndex={0}
      onClick={() => handleRoute(href!)}
      className={cx(
        'cursor-pointer text-primary-main flex items-center justify-start gap-3 rounded-xl px-[13px] h-[50px] transition-all duration-300 ease-in-out overflow-hidden hover:bg-primary-surface',
        {
          'w-[200px]': expand,
          'w-[50px]': !expand,
          'bg-primary-surface': active,
        },
      )}
      style={{
        transitionProperty: 'width',
      }}
      {...props}
    >
      {icon}
      {expand && <span className="font-bold text-20px truncate">{label}</span>}
    </button>
  );
};

export default SidebarMenuLink;
