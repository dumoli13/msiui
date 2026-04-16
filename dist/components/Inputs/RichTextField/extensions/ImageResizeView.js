import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useEffect, useRef, useState } from 'react';
import { NodeViewWrapper } from '@tiptap/react';
import cx from 'classnames';
import Icon from '../../../Icon';
const ImageResizeView = ({ node, updateAttributes, selected, deleteNode, }) => {
    const imgRef = useRef(null);
    const [isResizing, setIsResizing] = useState(false);
    const startPos = useRef(null);
    const handleRef = useRef(null);
    const aspectRatio = useRef(1);
    const width = node.attrs.width ? parseInt(node.attrs.width) : undefined;
    const height = node.attrs.height ? parseInt(node.attrs.height) : undefined;
    const align = node.attrs.align || 'left';
    const onMouseDown = useCallback((e, handle) => {
        e.preventDefault();
        e.stopPropagation();
        const img = imgRef.current;
        if (!img)
            return;
        handleRef.current = handle;
        const w = img.offsetWidth;
        const h = img.offsetHeight;
        startPos.current = { x: e.clientX, w, h };
        aspectRatio.current = h > 0 ? w / h : 1;
        setIsResizing(true);
    }, []);
    useEffect(() => {
        if (!isResizing)
            return;
        const onMouseMove = (e) => {
            if (!startPos.current || !handleRef.current)
                return;
            const dx = e.clientX - startPos.current.x;
            const handle = handleRef.current;
            // Only horizontal delta controls size; height follows aspect ratio
            let newW;
            if (handle === 'se' || handle === 'ne') {
                newW = Math.max(50, startPos.current.w + dx);
            }
            else {
                newW = Math.max(50, startPos.current.w - dx);
            }
            const newH = Math.max(50, Math.round(newW / aspectRatio.current));
            updateAttributes({
                width: `${Math.round(newW)}px`,
                height: `${Math.round(newH)}px`,
            });
        };
        const onMouseUp = () => {
            setIsResizing(false);
            startPos.current = null;
            handleRef.current = null;
        };
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [isResizing, updateAttributes]);
    let alignClass;
    if (align === 'center')
        alignClass = 'mx-auto';
    else if (align === 'right')
        alignClass = 'ml-auto';
    else
        alignClass = 'mr-auto';
    const displayW = width ?? imgRef.current?.naturalWidth ?? '?';
    const displayH = height ?? imgRef.current?.naturalHeight ?? '?';
    return (_jsxs(NodeViewWrapper, { className: cx('relative inline-block max-w-full', alignClass), style: { display: 'block' }, children: [_jsx("img", { ref: imgRef, src: node.attrs.src, alt: node.attrs.alt || '', title: node.attrs.title || '', width: width, height: height, className: cx('block max-w-full', {
                    'ring-2 ring-primary-main dark:ring-primary-main-dark': selected,
                }), draggable: false }), selected && (_jsxs(_Fragment, { children: [['nw', 'ne', 'sw', 'se'].map((handle) => (_jsx("div", { role: "button", "aria-label": `Resize ${handle}`, tabIndex: 0, onMouseDown: (e) => onMouseDown(e, handle), className: cx('absolute w-3 h-3 bg-primary-main dark:bg-primary-main-dark border-2 border-white rounded-sm cursor-pointer z-10', {
                            'top-0 left-0 -translate-x-1/2 -translate-y-1/2': handle === 'nw',
                            'top-0 right-0 translate-x-1/2 -translate-y-1/2': handle === 'ne',
                            'bottom-0 left-0 -translate-x-1/2 translate-y-1/2': handle === 'sw',
                            'bottom-0 right-0 translate-x-1/2 translate-y-1/2': handle === 'se',
                        }) }, handle))), _jsxs("div", { className: "absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-12px text-neutral-50 dark:text-neutral-40-dark bg-neutral-10 dark:bg-neutral-80-dark border border-neutral-30 dark:border-neutral-60-dark rounded px-1.5 py-0.5 shadow-box-1", children: [displayW, " \u00D7 ", displayH] }), _jsxs("div", { className: "absolute -top-8 left-0 flex gap-1 bg-neutral-10 dark:bg-neutral-80-dark border border-neutral-30 dark:border-neutral-60-dark rounded shadow-box-2 px-1 py-0.5", children: [['left', 'center', 'right'].map((a) => (_jsx("button", { type: "button", onClick: () => updateAttributes({ align: a }), className: cx('px-1.5 py-0.5 rounded text-12px capitalize', {
                                    'bg-primary-main text-white': align === a,
                                    'text-neutral-70 dark:text-neutral-30-dark hover:bg-neutral-20 dark:hover:bg-neutral-70-dark': align !== a,
                                }), children: a }, a))), _jsx("div", { className: "w-px h-5 bg-neutral-30 dark:bg-neutral-60-dark self-center" }), _jsx("button", { type: "button", onClick: deleteNode, title: "Delete image", className: "px-1.5 py-0.5 rounded text-danger-main dark:text-danger-main-dark hover:bg-danger-surface dark:hover:bg-danger-surface-dark", children: _jsx(Icon, { name: "trash", size: 14 }) })] })] }))] }));
};
export default ImageResizeView;
