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
 */
declare const Accordion: ({ items, collapsible, singleCollapse, defaultActiveKey, activeKey, onChangeActiveKey, size, className, }: AccordionProps) => import("react/jsx-runtime").JSX.Element;
export default Accordion;
//# sourceMappingURL=Accordion.d.ts.map