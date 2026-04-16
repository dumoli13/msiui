import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { useCurrentEditor } from '@tiptap/react';
import cx from 'classnames';
import Icon from '../../../Icon';
import useClickOutside from '../../useClickOutside';
import { ToolbarButton } from './RichTextStyleButton';
import { useEditorRerender } from './useEditorRerender';
const RichTextTableDialog = () => {
    const { editor } = useCurrentEditor();
    useEditorRerender(editor);
    const [open, setOpen] = useState(false);
    const [rows, setRows] = useState(3);
    const [cols, setCols] = useState(3);
    const [withHeader, setWithHeader] = useState(true);
    const ref = useRef(null);
    useClickOutside([ref], () => setOpen(false));
    if (!editor)
        return null;
    const handleInsert = () => {
        editor
            .chain()
            .focus()
            .insertTable({ rows, cols, withHeaderRow: withHeader })
            .run();
        setOpen(false);
    };
    return (_jsxs("div", { ref: ref, className: "relative", children: [_jsx(ToolbarButton, { active: editor.isActive('table'), title: "Insert table", onClick: () => setOpen((v) => !v), children: _jsx(Icon, { name: "table-cells", size: 16 }) }), open && (_jsxs("div", { className: "absolute top-full left-0 mt-1 z-50 bg-neutral-10 dark:bg-neutral-80-dark border border-neutral-30 dark:border-neutral-60-dark rounded shadow-box-3 p-3 w-56", children: [_jsx("p", { className: "text-12px font-medium text-neutral-60 dark:text-neutral-40-dark mb-3", children: "Insert Table" }), _jsxs("div", { className: "flex flex-col gap-2 mb-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("label", { className: "text-12px text-neutral-60 dark:text-neutral-40-dark", children: "Rows" }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("button", { type: "button", onClick: () => setRows((r) => Math.max(1, r - 1)), className: "w-6 h-6 rounded border border-neutral-30 dark:border-neutral-60-dark text-neutral-70 dark:text-neutral-30-dark hover:bg-neutral-20 dark:hover:bg-neutral-60-dark flex items-center justify-center", children: _jsx(Icon, { name: "minus", size: 12 }) }), _jsx("span", { className: "w-8 text-center text-14px text-neutral-80 dark:text-neutral-20-dark", children: rows }), _jsx("button", { type: "button", onClick: () => setRows((r) => Math.min(20, r + 1)), className: "w-6 h-6 rounded border border-neutral-30 dark:border-neutral-60-dark text-neutral-70 dark:text-neutral-30-dark hover:bg-neutral-20 dark:hover:bg-neutral-60-dark flex items-center justify-center", children: _jsx(Icon, { name: "plus", size: 12 }) })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("label", { className: "text-12px text-neutral-60 dark:text-neutral-40-dark", children: "Columns" }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("button", { type: "button", onClick: () => setCols((c) => Math.max(1, c - 1)), className: "w-6 h-6 rounded border border-neutral-30 dark:border-neutral-60-dark text-neutral-70 dark:text-neutral-30-dark hover:bg-neutral-20 dark:hover:bg-neutral-60-dark flex items-center justify-center", children: _jsx(Icon, { name: "minus", size: 12 }) }), _jsx("span", { className: "w-8 text-center text-14px text-neutral-80 dark:text-neutral-20-dark", children: cols }), _jsx("button", { type: "button", onClick: () => setCols((c) => Math.min(20, c + 1)), className: "w-6 h-6 rounded border border-neutral-30 dark:border-neutral-60-dark text-neutral-70 dark:text-neutral-30-dark hover:bg-neutral-20 dark:hover:bg-neutral-60-dark flex items-center justify-center", children: _jsx(Icon, { name: "plus", size: 12 }) })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("label", { className: "text-12px text-neutral-60 dark:text-neutral-40-dark", children: "Header row" }), _jsx("button", { type: "button", "aria-label": "Toggle header row", onClick: () => setWithHeader((v) => !v), className: cx('w-8 h-4 rounded-full transition-colors relative', withHeader
                                            ? 'bg-primary-main dark:bg-primary-main-dark'
                                            : 'bg-neutral-40 dark:bg-neutral-60-dark'), children: _jsx("span", { className: cx('absolute top-0.5 w-3 h-3 bg-white rounded-full transition-transform', withHeader ? 'translate-x-4' : 'translate-x-0.5') }) })] })] }), _jsx("button", { type: "button", onClick: handleInsert, className: "w-full py-1.5 text-14px rounded bg-primary-main dark:bg-primary-main-dark text-white hover:bg-primary-hover dark:hover:bg-primary-hover-dark transition-colors", children: "Insert Table" }), editor.isActive('table') && (_jsxs("div", { className: "mt-2 pt-2 border-t border-neutral-20 dark:border-neutral-60-dark", children: [_jsx("p", { className: "text-12px font-medium text-neutral-60 dark:text-neutral-40-dark mb-1", children: "Table actions" }), _jsx("div", { className: "flex flex-wrap gap-1", children: [
                                    {
                                        label: '+Row',
                                        cmd: () => editor.chain().focus().addRowAfter().run(),
                                    },
                                    {
                                        label: '-Row',
                                        cmd: () => editor.chain().focus().deleteRow().run(),
                                    },
                                    {
                                        label: '+Col',
                                        cmd: () => editor.chain().focus().addColumnAfter().run(),
                                    },
                                    {
                                        label: '-Col',
                                        cmd: () => editor.chain().focus().deleteColumn().run(),
                                    },
                                    {
                                        label: 'Delete',
                                        cmd: () => editor.chain().focus().deleteTable().run(),
                                    },
                                ].map(({ label, cmd }) => (_jsx("button", { type: "button", onClick: cmd, className: cx('px-2 py-0.5 text-12px rounded border transition-colors', label === 'Delete'
                                        ? 'border-danger-main text-danger-main hover:bg-danger-light dark:hover:bg-danger-light-dark'
                                        : 'border-neutral-30 dark:border-neutral-60-dark text-neutral-70 dark:text-neutral-30-dark hover:bg-neutral-20 dark:hover:bg-neutral-60-dark'), children: label }, label))) })] }))] }))] }));
};
export default RichTextTableDialog;
