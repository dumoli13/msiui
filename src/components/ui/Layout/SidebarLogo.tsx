import cx from 'classnames';

interface SidebarMenuProps {
  expand: boolean;
}

const SidebarMenuLogo = ({ expand }: SidebarMenuProps) => {
  return (
    <div
      className={cx(
        'text-primary-main flex items-center gap-1.5 rounded-xl px-2 h-[50px] transition-all duration-300 ease-in-out overflow-hidden',
        {
          'w-[200px] ': expand,
          'w-[50px]': !expand,
        },
      )}
      style={{
        transitionProperty: 'width',
      }}
    >
      <img src="/images/logo-sme.svg" alt="logo" width={32} height={32} />
      {expand && (
        <span className="font-bold text-16x truncate">PT. SM Engineering</span>
      )}
    </div>
  );
};

export default SidebarMenuLogo;
