import React from 'react';
export interface AccordionItem {
    key: string | number;
    title: React.ReactNode;
    content: React.ReactNode;
}
export interface AccordionProps {
    items: AccordionItem[];
    collapsible?: 'icon' | 'header';
    singleCollapse?: boolean;
    defaultActiveKey?: Array<string | number>;
    activeKey?: Array<string | number>;
    onChangeActiveKey?: (key: Array<string | number>) => void;
    size?: 'default' | 'large';
    className?: string;
}
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
declare const Accordion: ({ items, collapsible, singleCollapse, defaultActiveKey, activeKey, onChangeActiveKey, size, className, }: AccordionProps) => import("react/jsx-runtime").JSX.Element;
export default Accordion;
//# sourceMappingURL=Accordion.d.ts.map