import { ReactNode, useEffect } from 'react';
import useFormStore from '@/stores/FormStore';
import cx from 'classnames';
import { XCircle } from 'react-feather';
import { useLocation } from 'react-router-dom';
import { BreadcrumbItem } from '../Breadcrumb';
import Tag from '../Tag';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  breadcrumbs: BreadcrumbItem[];
  children: ReactNode;
  className?: string;
  unauthorized?: boolean;
}

const Layout = ({
  breadcrumbs,
  children,
  className,
  unauthorized = false,
}: LayoutProps) => {
  const location = useLocation();
  const isFormEdited = useFormStore((state) => state.isFormEdited);

  useEffect(() => {
    if (isFormEdited) {
      useFormStore.getState().setIsFormEdited(false); // make sure all form is edited state = false when location changed
    }
  }, [location]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isFormEdited) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isFormEdited]);

  return (
    <div className="relative min-h-screen bg-neutral-15 pl-[98px] pt-[70px]">
      <Header breadcrumbs={breadcrumbs} />
      <Sidebar />
      <div className={cx('p-6', className)}>
        {unauthorized ? (
          <>
            <div className="flex-1 flex items-center gap-6 h-[calc(100vh-122px)]">
              <div className="bg-neutral-10 rounded-3xl p-16 flex flex-col items-center gap-16 w-fit mx-auto">
                <div className="flex flex-col gap-4 items-center">
                  <XCircle
                    width={88}
                    height={88}
                    strokeWidth={2}
                    className="text-danger-main"
                  />
                  <Tag color="danger">403 Error</Tag>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="text-center text-neutral-100/85 text-64px font-bold ">
                    Access Denied
                  </div>
                  <div className="text-center text-neutral-90 text-24px">
                    Permission denied. You don&apos;t have access to this
                    feature
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default Layout;
