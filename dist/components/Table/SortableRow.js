import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSortable } from '@dnd-kit/sortable';
import cx from 'classnames';
import Icon from '../Icon';
const SortableRow = ({ id, size, disabled = false, className, style, onClick, children, }) => {
    const { attributes, listeners, setNodeRef, isDragging } = useSortable({
        id,
        animateLayoutChanges: () => true,
        disabled,
    });
    const styleDrag = {
        opacity: isDragging ? 0 : 1,
    };
    return (_jsxs("tr", { ref: setNodeRef, ...attributes, className: className, style: { ...styleDrag, ...style }, onClick: onClick, children: [_jsx("td", { className: cx('py-1.5 text-center', {
                    'px-2 py-3': size === 'default' || size === 'large',
                    'px-2 py-0.5': size === 'small',
                }), style: { verticalAlign: 'middle', width: 40 }, children: _jsx("span", { ...listeners, "data-row-drag-handle": true, className: "select-none cursor-grab text-neutral-60 inline-flex items-center justify-center", children: _jsx(Icon, { name: "drag-nine-dots", size: 16 }) }) }), children] }));
};
export default SortableRow;
