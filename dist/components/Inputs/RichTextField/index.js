import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useImperativeHandle, useRef, useState } from 'react';
import OfficePaste from '@intevation/tiptap-extension-office-paste';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Table, TableCell, TableHeader, TableRow, } from '@tiptap/extension-table';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import cx from 'classnames';
import InputBase from '../InputBase';
import InputHelper from '../InputHelper';
import InputLabel from '../InputLabel';
import './RichTextField.css';
import RichTextToolbar from './RichTextToolbar';
import BulletStyle from './extensions/BulletStyle';
import FontSize from './extensions/FontSize';
import ImageResize from './extensions/ImageResize';
import TextIndent from './extensions/TextIndent';
// ─── Extensions list ────────────────────────────────────────────────────────
const buildExtensions = (placeholder) => [
    StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
    }),
    Underline,
    TextStyle,
    Color,
    Highlight.configure({ multicolor: true }),
    TextAlign.configure({ types: ['heading', 'paragraph', 'blockquote'] }),
    Table.configure({ resizable: false }),
    TableRow,
    TableCell,
    TableHeader,
    Link.configure({
        openOnClick: false,
        HTMLAttributes: {
            class: 'richtextfield-link',
            rel: 'noopener noreferrer',
            target: '_blank',
        },
    }),
    Placeholder.configure({ placeholder: placeholder || 'Start typing…' }),
    FontSize,
    TextIndent,
    ImageResize,
    BulletStyle,
    OfficePaste,
];
const RichTextFieldInner = ({ value, inputRef }) => {
    const { editor } = useCurrentEditor();
    const prevValueRef = useRef(value);
    // Sync controlled value into editor (avoid loop by comparing)
    useEffect(() => {
        if (!editor || value === undefined)
            return;
        if (value === prevValueRef.current)
            return;
        prevValueRef.current = value;
        // Only update if content actually differs
        const currentHTML = editor.getHTML();
        if (currentHTML !== value) {
            editor.commands.setContent(value, false);
        }
    }, [editor, value]);
    // Expose imperative handle
    useImperativeHandle(inputRef, () => ({
        focus: () => editor?.commands.focus(),
        blur: () => editor?.commands.blur(),
        getHTML: () => editor?.getHTML() ?? '',
        getJSON: () => editor?.getJSON() ?? {},
        clearContent: () => editor?.commands.clearContent(true),
        editor: editor ?? null,
    }), [editor]);
    return null;
};
const RichTextField = ({ value, defaultValue, onChange, label, labelPosition, autoHideLabel, size = 'default', width, placeholder, helperText, className, disabled = false, error, success, required, id, name, inputRef, }) => {
    const containerRef = useRef(null);
    const [focused, setFocused] = useState(false);
    const inputId = 
    // eslint-disable-next-line sonarjs/pseudo-random -- non-security: generating unique DOM IDs
    id ?? `rich-text-field-${Math.random().toString(36).slice(2, 9)}`;
    const helperMessage = error && typeof error === 'string' ? error : helperText;
    const isError = !!error;
    const extensions = buildExtensions(placeholder);
    const initialContent = value ?? defaultValue ?? '<p></p>';
    const handleUpdate = ({ editor }) => {
        const html = editor.getHTML();
        // Treat empty editor as empty string
        const cleaned = html === '<p></p>' ? '' : html;
        onChange?.(cleaned);
    };
    // Handle paste for raw clipboard images (e.g. screenshot from Snipping Tool).
    // When Word or a browser is the source there is always a `text/html` item on
    // the clipboard — in that case we let TipTap's built-in HTML parser handle
    // everything (including any <img> tags inside the HTML).  We only intercept
    // when the clipboard contains an image but NO html, which is the pure-image
    // paste scenario (pasting a screenshot, an image copied from an image viewer,
    // etc.).
    const handlePaste = (view, event) => {
        const items = Array.from(event.clipboardData?.items ?? []);
        // If there is HTML on the clipboard let TipTap / ProseMirror handle it.
        const hasHtml = items.some((item) => item.type === 'text/html');
        if (hasHtml)
            return false;
        const imageItem = items.find((item) => item.type.startsWith('image/'));
        if (imageItem) {
            const file = imageItem.getAsFile();
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const src = e.target?.result;
                    // imageResize is the name defined in extensions/ImageResize.ts
                    const imageNode = view.state.schema.nodes.imageResize?.create({
                        src,
                    });
                    if (imageNode) {
                        const tr = view.state.tr.replaceSelectionWith(imageNode);
                        view.dispatch(tr);
                    }
                };
                reader.readAsDataURL(file);
                return true; // prevent TipTap from double-processing this pure-image paste
            }
        }
        return false; // fall through to TipTap's default paste handling
    };
    return (_jsxs("div", { id: inputId, className: cx('relative w-full', { 'flex items-center gap-4': labelPosition === 'left' }, className), children: [label && (!autoHideLabel || focused) && (_jsx(InputLabel, { id: inputId, size: size, required: required, children: label })), _jsx(InputBase, { focused: focused, error: isError, success: success, disabled: disabled, size: size, width: typeof width === 'string' ? undefined : width, containerRef: containerRef, className: "flex-col !p-0", align: "start", children: _jsx(EditorProvider, { extensions: extensions, content: initialContent, onUpdate: handleUpdate, onFocus: () => setFocused(true), onBlur: () => setFocused(false), editorProps: {
                        attributes: {
                            class: cx('richtextfield-content outline-none px-3 py-2 min-h-[120px]', {
                                'cursor-not-allowed opacity-60': disabled,
                            }),
                            id: `${inputId}-editor`,
                            ...(name ? { 'data-name': name } : {}),
                        },
                        handlePaste: handlePaste,
                        editable: () => !disabled,
                    }, slotBefore: _jsx(RichTextToolbar, { disabled: disabled }), children: _jsx(RichTextFieldInner, { value: value, inputRef: inputRef }) }) }), _jsx(InputHelper, { message: helperMessage, error: isError, size: size })] }));
};
export default RichTextField;
