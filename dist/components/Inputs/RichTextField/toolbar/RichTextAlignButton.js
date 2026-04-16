import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { useCurrentEditor } from '@tiptap/react';
import Icon from '../../../Icon';
import useClickOutside from '../../useClickOutside';
import { ToolbarButton } from './RichTextStyleButton';
import { useEditorRerender } from './useEditorRerender';
const ALIGN_OPTIONS = [
    { value: 'left', icon: 'bars-3-bottom-left', label: 'Align left' },
    { value: 'center', icon: 'align-center', label: 'Align center' },
    { value: 'right', icon: 'bars-3-bottom-right', label: 'Align right' },
    { value: 'justify', icon: 'bars-3', label: 'Justify' },
];
const RichTextAlignButton = () => {
    const { editor } = useCurrentEditor();
    useEditorRerender(editor);
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    useClickOutside([ref], () => setOpen(false));
    if (!editor)
        return null;
    const activeAlign = ALIGN_OPTIONS.find((opt) => editor.isActive({ textAlign: opt.value }));
    const currentIcon = activeAlign?.icon ?? 'bars-3-bottom-left';
    return (_jsxs("div", { ref: ref, className: "relative", children: [_jsx(ToolbarButton, { title: "Text alignment", onClick: () => setOpen((v) => !v), children: _jsx(Icon, { name: currentIcon, size: 16 }) }), open && (_jsx("div", { className: "absolute top-full left-0 mt-1 z-50 bg-neutral-10 dark:bg-neutral-80-dark border border-neutral-30 dark:border-neutral-60-dark rounded shadow-box-3 p-1 flex gap-1", children: ALIGN_OPTIONS.map((opt) => (_jsx(ToolbarButton, { active: editor.isActive({ textAlign: opt.value }), title: opt.label, onClick: () => {
                        editor.chain().focus().setTextAlign(opt.value).run();
                        setOpen(false);
                    }, children: _jsx(Icon, { name: opt.icon, size: 16 }) }, opt.value))) }))] }));
};
export default RichTextAlignButton;
