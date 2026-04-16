import React from 'react';
import cx from 'classnames';
import type { TabItem, TabProps } from '../../types';
import Icon from '../Icon';

const Tab = ({
  items,
  defaultActiveKey,
  activeKey: propActiveKey,
  fillParentWidth,
  textAlign = 'left',
  mountAllTabs = false,
  onTabClick,
  onTabClose,
}: TabProps) => {
  const [activeKey, setActiveKey] = React.useState(
    propActiveKey ?? defaultActiveKey ?? items[0]?.key,
  );

  const tabsRef = React.useRef<HTMLDivElement>(null);
  const indicatorRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (propActiveKey !== undefined) {
      setActiveKey(propActiveKey);
    }
  }, [propActiveKey]);

  const handleTabClick = (
    key: string | number,
    index: number,
    detail: TabItem,
  ) => {
    if (propActiveKey === undefined) {
      setActiveKey(key);
    }
    onTabClick?.(key, index, detail);
  };

  const handleClose =
    (key: string | number, index: number) => (e: React.MouseEvent) => {
      e.stopPropagation();
      onTabClose?.(key, index);
    };

  const activeTab = items.find((tab) => tab.key === activeKey) || items[0];

  const closeable = !!onTabClose;

  // Move underline
  React.useLayoutEffect(() => {
    const container = tabsRef.current;
    const indicator = indicatorRef.current;
    if (!container || !indicator) return;

    const activeEl = container.querySelector(
      `[data-tab-key="${activeKey}"]`,
    ) as HTMLElement | null;

    if (!activeEl) return;

    indicator.style.width = `${activeEl.offsetWidth}px`;
    indicator.style.transform = `translateX(${activeEl.offsetLeft}px)`;
  }, [activeKey, items]);

  return (
    <div className="flex flex-col w-full">
      {/* Tabs Header */}
      <div
        ref={tabsRef}
        className="relative flex gap-1 border-b border-neutral-30 mb-4"
        role="tablist"
      >
        {/* Sliding underline */}
        <div
          ref={indicatorRef}
          className="absolute bottom-0 h-1 bg-primary-main transition-all duration-300 ease-out"
          style={{ width: 0 }}
        />

        {items.map((tab, index) => {
          const isActive = activeKey === tab.key;

          return (
            <button
              type="button"
              key={tab.key}
              data-tab-key={tab.key}
              role="tab"
              aria-selected={isActive ? 'true' : 'false'}
              onClick={() =>
                !tab.disabled && handleTabClick(tab.key, index, tab)
              }
              onKeyDown={(e) =>
                !tab.disabled &&
                (e.key === 'Enter' || e.key === ' ') &&
                handleTabClick(tab.key, index, tab)
              }
              className={cx(
                'relative text-14px font-semibold flex items-center justify-between gap-2 px-4 pb-4 cursor-pointer select-none',
                {
                  'text-primary-main': isActive,
                  'text-neutral-90 hover:text-primary-hover':
                    !isActive && !tab.disabled,
                  'text-neutral-40 cursor-not-allowed': tab.disabled,
                  'flex-1': fillParentWidth,
                },
              )}
              style={{ textAlign }}
            >
              <div className="w-full">{tab.label}</div>

              {closeable && (
                <Icon
                  name="x-mark"
                  size={16}
                  onClick={handleClose(tab.key, index)}
                  aria-label={`Close ${tab.label}`}
                  className="text-neutral-60"
                  strokeWidth={1}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {mountAllTabs ? (
        items.map((tab) => (
          <div
            key={tab.key}
            role="tabpanel"
            aria-labelledby={`tab-${tab.key}`}
            id={`tabpanel-${tab.key}`}
            style={{ display: activeKey === tab.key ? undefined : 'none' }}
          >
            {tab.children}
          </div>
        ))
      ) : (
        <div
          role="tabpanel"
          aria-labelledby={`tab-${activeTab?.key}`}
          id={`tabpanel-${activeTab?.key}`}
        >
          {activeTab?.children ?? (
            <div className="text-neutral-50">No content available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Tab;
