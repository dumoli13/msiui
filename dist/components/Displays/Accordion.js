import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cx from 'classnames';
import Icon from '../Icon';
/**
 *
 * This component renders a collapsible accordion interface. You can configure the accordion to allow single or multiple panels to be open simultaneously and control the collapsible behavior via props.
 *
 * @interface AccordionItem
 * @property {string | number} key - A unique identifier for the accordion item.
 * @property {ReactNode} title - The title or header content of the accordion item.
 * @property {ReactNode} content - The content displayed when the accordion item is expanded.
 *
 * @interface AccordionProps
 * @property {AccordionItem[]} items - A list of accordion items to display.
 * @property {'icon' | 'header'} [collapsible='icon'] - Determines which part of the accordion header can trigger the collapse.
 * - 'icon': Only the icon next to the title will trigger collapse.
 * - 'header': The entire header (title and icon) is clickable to trigger collapse.
 * @property {boolean} [singleCollapse=false] - If true, only one accordion panel is open at a time.
 * @property {Array<string | number>} [defaultActiveKey=[]] - The keys of the panels that should be open by default on initial render.
 * @property {Array<string | number>} [activeKey] - Keys of the currently active panels, for external control.
 * @property {(key: Array<string | number>) => void} [onChangeActiveKey] - Callback fired with the new active panel keys when the panel changes.
 */
const Accordion = ({ items, collapsible = 'icon', singleCollapse = false, defaultActiveKey = [], activeKey, onChangeActiveKey, size = 'default', className, }) => {
    // Validation: Ensure only one active key for singleCollapse
    if (singleCollapse) {
        if (defaultActiveKey.length > 1) {
            throw new Error('When `singleCollapse` is true, `defaultActiveKey` can only have one key.');
        }
        if (activeKey && activeKey.length > 1) {
            throw new Error('When `singleCollapse` is true, `activeKey` can only have one key.');
        }
    }
    const [height, setHeight] = React.useState(Array(items.length).fill(0));
    const refs = React.useRef([]);
    // Use activeKey if provided, otherwise fall back to defaultActiveKey
    const [openIndex, setOpenIndex] = React.useState(activeKey !== null && activeKey !== void 0 ? activeKey : defaultActiveKey);
    React.useEffect(() => {
        // Calculate the heights of all the accordion items
        const newHeights = refs.current.map((ref) => { var _a; return (_a = ref === null || ref === void 0 ? void 0 : ref.scrollHeight) !== null && _a !== void 0 ? _a : 0; });
        setHeight(newHeights);
    }, [items]);
    React.useEffect(() => {
        // Sync the openIndex with the activeKey when it changes
        if (activeKey) {
            setOpenIndex(activeKey);
        }
    }, [activeKey]);
    const handleToggle = (index) => {
        let newOpenIndex;
        if (openIndex.includes(index)) {
            newOpenIndex = openIndex.filter((item) => item !== index);
        }
        else {
            if (singleCollapse) {
                newOpenIndex = [index];
            }
            else {
                newOpenIndex = [...openIndex, index];
            }
        }
        if (!activeKey) {
            setOpenIndex(newOpenIndex);
        }
        onChangeActiveKey === null || onChangeActiveKey === void 0 ? void 0 : onChangeActiveKey(newOpenIndex);
    };
    return (_jsx("div", { className: cx('box-shadow rounded-md border border-neutral-40 dark:border-neutral-40-dark', className), children: items.map((item, index) => {
            const isOpen = openIndex.includes(item.key);
            return (_jsxs("div", { className: "accordion-item border-b border-neutral-40 dark:border-neutral-40-dark last:border-b-0 transition-all duration-300", children: [collapsible === 'icon' ? (_jsxs("div", { className: cx('flex justify-between items-center text-24px', {
                            'px-6': size === 'default',
                            'px-10': size === 'large',
                        }), children: [_jsx("div", { className: cx('w-full text-24px font-medium text-neutral-100 dark:text-neutral-100-dark', { 'py-4': size === 'default', 'py-8': size === 'large' }), children: item.title }), _jsx("div", { role: "button", "aria-label": "toggle", onClick: () => handleToggle(item.key), className: cx('h-10 w-10 flex items-center justify-center text-neutral-90 dark:text-neutral-90-dark rounded-full -mr-2 hover:bg-neutral-20 dark:hover:bg-neutral-20-dark transition-all duration-300', { 'rotate-180': isOpen }), children: _jsx(Icon, { name: "chevron-down", size: 24 }) })] })) : (_jsxs("div", { role: "button", "aria-label": "toggle", onClick: () => handleToggle(item.key), className: cx('flex justify-between items-center text-24px', {
                            'px-6': size === 'default',
                            'px-10': size === 'large',
                        }), children: [_jsx("div", { className: cx('text-24px font-medium text-neutral-100 dark:text-neutral-100-dark', {
                                    'py-4': size === 'default',
                                    'py-8 ': size === 'large',
                                }), children: item.title }), _jsx("div", { className: cx('h-10 w-10 text-neutral-90 dark:text-neutral-90-dark rounded-full p-2 -mr-2 hover:bg-neutral-20 dark:hover:bg-neutral-20-dark transition-all duration-300', { 'rotate-180': isOpen }), children: _jsx(Icon, { name: "chevron-down", size: 24 }) })] })), _jsx("div", { ref: (el) => {
                            refs.current[index] = el;
                        }, style: { maxHeight: isOpen ? `${height[index]}px` : '0px' }, className: "overflow-hidden transition-all duration-300", children: _jsx("div", { className: cx('text-neutral-90 dark:text-neutral-90-dark text-20px', {
                                'mx-6 pt-1 pb-6': size === 'default',
                                'mx-10 py-10 border-t border-neutral-40 dark:border-neutral-40-dark': size === 'large',
                            }), children: item.content }) })] }, item.key));
        }) }));
};
export default Accordion;
