import React from 'react';
import Tag from '../components/display/Tag';
import Breadcrumb, {
  BreadcrumbItem,
} from '../components/navigation/Breadcrumb';
import HeaderClock from './HeaderClock';

interface HeaderProps {
  role?: string;
  breadcrumbs: BreadcrumbItem[];
}

function Header({ breadcrumbs, role }: HeaderProps) {
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
}

export default Header;
