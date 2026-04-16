import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import cx from 'classnames';
import RichTextAlignButton from './toolbar/RichTextAlignButton';
import RichTextColorPicker from './toolbar/RichTextColorPicker';
import RichTextHeadingSelect from './toolbar/RichTextHeadingSelect';
import RichTextImageButton from './toolbar/RichTextImageButton';
import RichTextLinkDialog from './toolbar/RichTextLinkDialog';
import RichTextListButton from './toolbar/RichTextListButton';
import RichTextStyleButton from './toolbar/RichTextStyleButton';
import RichTextTableDialog from './toolbar/RichTextTableDialog';
const Divider = () => (_jsx("div", { className: "w-0 h-8 border border-neutral-30 dark:bg-neutral-60-dark mx-2" }));
const RichTextToolbar = ({ disabled, className }) => {
    if (disabled)
        return null;
    return (_jsxs("div", { className: cx('flex flex-wrap items-center gap-0.5 px-2 py-1.5 w-full', 'border-b border-neutral-30 dark:border-neutral-60-dark', 'bg-neutral-10 dark:bg-neutral-10-dark rounded-t-md', className), children: [_jsx(RichTextHeadingSelect, {}), _jsx(Divider, {}), _jsx(RichTextStyleButton, { style: "bold" }), _jsx(RichTextStyleButton, { style: "italic" }), _jsx(RichTextStyleButton, { style: "underline" }), _jsx(RichTextStyleButton, { style: "strike" }), _jsx(RichTextStyleButton, { style: "code" }), _jsx(Divider, {}), _jsx(RichTextColorPicker, {}), _jsx(Divider, {}), _jsx(RichTextAlignButton, {}), _jsx(Divider, {}), _jsx(RichTextListButton, {}), _jsx(Divider, {}), _jsx(RichTextLinkDialog, {}), _jsx(RichTextImageButton, {}), _jsx(RichTextTableDialog, {})] }));
};
export default RichTextToolbar;
