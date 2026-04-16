import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { useCurrentEditor } from '@tiptap/react';
import Icon from '../../../Icon';
import { ToolbarButton } from './RichTextStyleButton';
const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
});
const RichTextImageButton = () => {
    const { editor } = useCurrentEditor();
    const fileInputRef = useRef(null);
    if (!editor)
        return null;
    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        try {
            const src = await toBase64(file);
            editor.chain().focus().setImage({ src, alt: file.name }).run();
        }
        catch {
            // ignore read errors
        }
        finally {
            // reset so the same file can be picked again
            if (fileInputRef.current)
                fileInputRef.current.value = '';
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(ToolbarButton, { title: "Insert image", onClick: () => fileInputRef.current?.click(), children: _jsx(Icon, { name: "image", size: 16 }) }), _jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", "aria-label": "Insert image", className: "hidden", onChange: handleFileChange })] }));
};
export default RichTextImageButton;
