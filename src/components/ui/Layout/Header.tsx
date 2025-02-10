import useAuthStore from '@/stores/AuthStore';
import Breadcrumb, { BreadcrumbItem } from '../Breadcrumb';
import Tag from '../Tag';
import HeaderClock from './HeaderClock';

interface HeaderProps {
  breadcrumbs: BreadcrumbItem[];
}

const Header = ({ breadcrumbs }: HeaderProps) => {
  const loginDetail = useAuthStore((state) => state.loginDetail);
  const role = loginDetail
    ? loginDetail.is_superuser
      ? 'Super Admin'
      : loginDetail.groups.length > 0
        ? loginDetail.groups[0].name
        : null
    : null;

  return (
    <div className="bg-neutral-10 border-b-2 border-neutral-15 box-border h-[72px] fixed top-0 left-0 right-0 z-[1100]">
      <div className="ml-[98px] flex gap-6 px-9 items-center justify-between h-full relative">
        <Breadcrumb items={breadcrumbs} />
        {role && (
          <div className="absolute left-1/2 -translate-x-1/2">
            <Tag color="info" size="large">
              {role}
            </Tag>
          </div>
        )}
        <HeaderClock />
      </div>
    </div>
  );
};

export default Header;
