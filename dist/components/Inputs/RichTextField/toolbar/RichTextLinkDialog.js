import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { useCurrentEditor } from '@tiptap/react';
import cx from 'classnames';
import Icon from '../../../Icon';
import useClickOutside from '../../useClickOutside';
import { ToolbarButton } from './RichTextStyleButton';
import { useEditorRerender } from './useEditorRerender';
const RichTextLinkDialog = () => {
    const { editor } = useCurrentEditor();
    useEditorRerender(editor);
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState('');
    const [text, setText] = useState('');
    const ref = useRef(null);
    const urlInputRef = useRef(null);
    useClickOutside([ref], () => setOpen(false));
    const isActive = editor?.isActive('link') ?? false;
    useEffect(() => {
        if (open && editor) {
            const attrs = editor.getAttributes('link');
            setUrl(attrs.href ?? '');
            // Pre-populate text with the currently selected text
            const { from, to } = editor.state.selection;
            const selectedText = from !== to ? editor.state.doc.textBetween(from, to, ' ') : '';
            setText(selectedText);
            setTimeout(() => urlInputRef.current?.focus(), 50);
        }
    }, [open, editor]);
    if (!editor)
        return null;
    const handleApply = () => {
        if (!url.trim()) {
            editor.chain().focus().unsetLink().run();
            setOpen(false);
            return;
        }
        const linkAttrs = {
            href: url.trim(),
            target: '_blank',
        };
        const { from, to } = editor.state.selection;
        const currentSelectedText = from !== to ? editor.state.doc.textBetween(from, to, ' ') : '';
        const linkText = text.trim();
        if (linkText && linkText !== currentSelectedText) {
            // Text differs from selection (or no selection) — insert new text with link
            editor
                .chain()
                .focus()
                .extendMarkRange('link')
                .deleteSelection()
                .insertContent({
                type: 'text',
                text: linkText,
                marks: [{ type: 'link', attrs: linkAttrs }],
            })
                .run();
        }
        else {
            // Text matches selection — just apply the link mark
            editor.chain().focus().extendMarkRange('link').setLink(linkAttrs).run();
        }
        setOpen(false);
    };
    const handleRemove = () => {
        editor.chain().focus().unsetLink().run();
        setOpen(false);
    };
    const applyDisabled = !url.trim() || !text.trim();
    return (_jsxs("div", { ref: ref, className: "relative", children: [_jsx(ToolbarButton, { active: isActive, title: "Insert link", onClick: () => setOpen((v) => !v), children: _jsx(Icon, { name: "link", size: 16 }) }), open && (_jsxs("div", { className: "absolute top-full left-0 mt-1 z-50 bg-neutral-10 dark:bg-neutral-80-dark border border-neutral-30 dark:border-neutral-60-dark rounded shadow-box-3 p-3 w-72", children: [_jsx("p", { className: "text-12px font-medium text-neutral-60 dark:text-neutral-40-dark mb-2", children: "Link" }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsxs("div", { children: [_jsx("label", { className: "text-12px text-neutral-60 dark:text-neutral-40-dark mb-1 block", children: "URL *" }), _jsx("input", { ref: urlInputRef, type: "url", value: url, "aria-label": "Link URL", onChange: (e) => setUrl(e.target.value), onKeyDown: (e) => {
                                            if (e.key === 'Enter')
                                                handleApply();
                                        }, placeholder: "https://example.com", className: cx('w-full h-8 px-2 text-14px rounded border', 'border-neutral-30 dark:border-neutral-60-dark', 'bg-neutral-10 dark:bg-neutral-10-dark text-neutral-80 dark:text-neutral-20-dark', 'focus:outline-none focus:border-primary-main dark:focus:border-primary-main-dark') })] }), _jsxs("div", { children: [_jsx("label", { className: "text-12px text-neutral-60 dark:text-neutral-40-dark mb-1 block", children: "Text *" }), _jsx("input", { type: "text", value: text, "aria-label": "Link display text", onChange: (e) => setText(e.target.value), onKeyDown: (e) => {
                                            if (e.key === 'Enter')
                                                handleApply();
                                        }, placeholder: "Displayed link text", className: cx('w-full h-8 px-2 text-14px rounded border', 'border-neutral-30 dark:border-neutral-60-dark', 'bg-neutral-10 dark:bg-neutral-10-dark text-neutral-80 dark:text-neutral-20-dark', 'focus:outline-none focus:border-primary-main dark:focus:border-primary-main-dark') })] }), _jsxs("div", { className: "flex justify-between items-center pt-1", children: [isActive && (_jsx("button", { type: "button", onClick: handleRemove, className: "text-12px text-danger-main dark:text-danger-main-dark hover:underline", children: "Remove link" })), _jsxs("div", { className: "flex gap-2 ml-auto", children: [_jsx("button", { type: "button", onClick: () => setOpen(false), className: "px-3 py-1 text-12px rounded border border-neutral-30 dark:border-neutral-60-dark text-neutral-70 dark:text-neutral-30-dark hover:bg-neutral-20 dark:hover:bg-neutral-60-dark", children: "Cancel" }), _jsx("button", { type: "button", onClick: handleApply, disabled: applyDisabled, className: cx('px-3 py-1 text-12px rounded', applyDisabled
                                                    ? 'bg-neutral-30 dark:bg-neutral-60-dark text-neutral-50 dark:text-neutral-40-dark cursor-not-allowed'
                                                    : 'bg-primary-main dark:bg-primary-main-dark text-white hover:bg-primary-hover dark:hover:bg-primary-hover-dark'), children: "Apply" })] })] })] })] }))] }));
};
export default RichTextLinkDialog;
