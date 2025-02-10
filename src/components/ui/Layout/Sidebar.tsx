import { useState } from 'react';
import COLORS from '@/libs/color';
import useAuthStore from '@/stores/AuthStore';
import { AlertTriangle, LogOut, User } from 'react-feather';
import Modal from '../Modal';
import Tag from '../Tag';
import SidebarMenuLogo from './SidebarLogo';
import SidebarMenuButton from './SidebarMenuButton';
import SidebarMenuLink from './SidebarMenuLink';

const Sidebar = () => {
  const logOut = useAuthStore((state) => state.logOut);
  const [expanded, setExpanded] = useState(false);

  const environment = window.__RUNTIME_CONFIG__.NODE_ENV;

  const handleLogOut = () => {
    Modal.danger({
      icon: (
        <AlertTriangle
          height={48}
          width={48}
          fill={COLORS.neutral[90]}
          stroke={COLORS.neutral[10]}
        />
      ),
      title: 'Logging Out?',
      content:
        'You can always log back in at any time. Please contact admin if you need help.',
      confirmText: 'Log Out',
      onConfirm: logOut,
    });
  };

  return (
    <nav
      className="bg-neutral-10 border-r border-neutral-20 px-6 py-3 w-fit fixed top-0 bottom-0 left-0 z-[1100]"
      role="navigation"
    >
      <div
        role="button"
        aria-expanded={expanded}
        aria-label="Toggle sidebar"
        className="flex flex-col gap-3 justify-between h-full cursor-default"
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        <div className="flex flex-col gap-8">
          <SidebarMenuLogo expand={expanded} />
          <div className="flex flex-col gap-3">
            <SidebarMenuLink
              icon={
                <img
                  src="/icons/ic-dashboard.svg"
                  alt="dashboard logo"
                  width={24}
                  height={24}
                />
              }
              label="Dashboard"
              href="/dashboard"
              expand={expanded}
              aria-label="Dashboard page"
            />
            <SidebarMenuLink
              icon={
                <img
                  src="/icons/ic-master.svg"
                  alt="master logo"
                  width={24}
                  height={24}
                />
              }
              label="Master"
              href="/master"
              expand={expanded}
              aria-label="Master page"
            />
            <SidebarMenuLink
              icon={
                <img
                  src="/icons/ic-ipqc.svg"
                  alt="IPQC logo"
                  width={24}
                  height={24}
                />
              }
              label="IPQC"
              href="/ipqc"
              expand={expanded}
              aria-label="IPQC Page"
            />
            <SidebarMenuLink
              icon={
                <img
                  src="/icons/ic-oqc.svg"
                  alt="oqc logo"
                  width={24}
                  height={24}
                />
              }
              label="OQC"
              href="/oqc"
              expand={expanded}
              aria-label="OQC page"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <SidebarMenuLink
            icon={
              <div className="flex items-center">
                <User strokeWidth={2} />
              </div>
            }
            label="User Settings"
            href="/user"
            expand={expanded}
            aria-label="Setting page"
          />
          <div className="w-full h-0 border-t border-neutral-30 my-3" />
          <SidebarMenuButton
            icon={<LogOut strokeWidth={2} />}
            label="Log Out"
            expand={expanded}
            aria-label="Log Out"
            onClick={handleLogOut}
          />
          {environment && (
            <>
              <div className="w-full h-0 border-t border-neutral-30 my-8" />
              <Tag color="primary">{environment}</Tag>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
