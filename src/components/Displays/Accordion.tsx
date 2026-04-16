import React from 'react';
import cx from 'classnames';
import type { AccordionProps } from '../../types';
import Icon from '../Icon';

/**
 *
 * This component renders a collapsible accordion interface. You can configure the accordion to allow single or multiple panels to be open simultaneously and control the collapsible behavior via props.
 */
const Accordion = ({
  items,
  collapsible = 'icon',
  singleCollapse = false,
  defaultActiveKey = [],
  activeKey,
  onChangeActiveKey,
  size = 'default',
  className,
}: AccordionProps) => {
  // Validation: Ensure only one active key for singleCollapse
  if (singleCollapse) {
    if (defaultActiveKey.length > 1) {
      throw new Error(
        'When `singleCollapse` is true, `defaultActiveKey` can only have one key.',
      );
    }
    if (activeKey && activeKey.length > 1) {
      throw new Error(
        'When `singleCollapse` is true, `activeKey` can only have one key.',
      );
    }
  }

  const [height, setHeight] = React.useState<Array<number | string>>(
    Array(items.length).fill(0),
  );
  const refs = React.useRef<(HTMLDivElement | null)[]>([]);

  // Use activeKey if provided, otherwise fall back to defaultActiveKey
  const [openIndex, setOpenIndex] = React.useState<Array<number | string>>(
    activeKey ?? defaultActiveKey,
  );

  React.useEffect(() => {
    // Calculate the heights of all the accordion items
    const newHeights = refs.current.map((ref) => ref?.scrollHeight ?? 0);
    setHeight(newHeights);
  }, [items]);

  React.useEffect(() => {
    // Sync the openIndex with the activeKey when it changes
    if (activeKey) {
      setOpenIndex(activeKey);
    }
  }, [activeKey]);

  const handleToggle = (index: number | string) => () => {
    let newOpenIndex: Array<number | string>;
    if (openIndex.includes(index)) {
      newOpenIndex = openIndex.filter((item) => item !== index);
    } else if (singleCollapse) {
      newOpenIndex = [index];
    } else {
      newOpenIndex = [...openIndex, index];
    }
    if (!activeKey) {
      setOpenIndex(newOpenIndex);
    }
    onChangeActiveKey?.(newOpenIndex);
  };

  return (
    <div
      className={cx(
        'box-shadow rounded-md border border-neutral-40 dark:border-neutral-40-dark',
        className,
      )}
    >
      {items.map((item, index) => {
        const isOpen = openIndex.includes(item.key);

        return (
          <div
            key={item.key}
            className="border-b border-neutral-40 dark:border-neutral-40-dark last:border-b-0 transition-all duration-300"
          >
            {/* Title section */}
            {collapsible === 'icon' ? (
              <div
                className={cx('flex justify-between items-center text-20px', {
                  'px-4 gap-4': size === 'default',
                  'px-6 gap-6': size === 'large',
                })}
              >
                <div
                  className={cx(
                    'flex-1 font-medium text-neutral-100 dark:text-neutral-100-dark',
                    {
                      'py-3': size === 'default',
                      'py-4': size === 'large',
                    },
                  )}
                >
                  {item.title}
                </div>
                <button
                  type="button"
                  id={`accordion-button-${item.key}`}
                  aria-label={`Toggle ${typeof item.title === 'string' ? item.title : 'section'}`}
                  aria-expanded={isOpen}
                  aria-controls={`accordion-content-${item.key}`}
                  onClick={handleToggle(item.key)}
                  className={cx(
                    'h-6 w-6 flex justify-center items-center text-neutral-70 dark:text-neutral-70-dark rounded-full p-2 -mr-2 hover:bg-neutral-20 dark:hover:bg-neutral-20-dark transition-all duration-300',
                    { 'rotate-180': isOpen },
                  )}
                >
                  <Icon name="chevron-down" size={16} strokeWidth={2} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                id={`accordion-button-${item.key}`}
                aria-label={`Toggle ${typeof item.title === 'string' ? item.title : 'section'}`}
                aria-expanded={isOpen}
                aria-controls={`accordion-content-${item.key}`}
                onClick={handleToggle(item.key)}
                className={cx(
                  'w-full flex justify-between text-left items-center text-20px',
                  {
                    'px-4 gap-4': size === 'default',
                    'px-6 gap-6': size === 'large',
                  },
                )}
              >
                <div
                  className={cx(
                    'w-full font-medium text-neutral-100 dark:text-neutral-100-dark',
                    {
                      'py-3': size === 'default',
                      'py-4': size === 'large',
                    },
                  )}
                >
                  {item.title}
                </div>
                <div
                  className={cx(
                    'h-6 w-6 flex justify-center items-center text-neutral-70 dark:text-neutral-70-dark rounded-full p-2 -mr-2 hover:bg-neutral-20 dark:hover:bg-neutral-20-dark transition-all duration-300',
                    { 'rotate-180': isOpen },
                  )}
                >
                  <Icon name="chevron-down" size={16} strokeWidth={2} />
                </div>
              </button>
            )}

            {/* Content section with transition */}
            <div
              id={`accordion-content-${item.key}`}
              role="region"
              aria-labelledby={`accordion-button-${item.key}`}
              ref={(el) => {
                refs.current[index] = el;
              }}
              style={{ maxHeight: isOpen ? `${height[index]}px` : '0px' }}
              className="overflow-hidden transition-all duration-300"
            >
              <div
                className={cx(
                  'text-neutral-90 dark:text-neutral-90-dark text-14px',
                  {
                    'mx-4 pt-0.5 pb-4': size === 'default',
                    'mx-6 py-6 border-t border-neutral-40 dark:border-neutral-40-dark':
                      size === 'large',
                  },
                )}
              >
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
