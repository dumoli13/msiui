import { useRef, useState } from 'react';
import type { Level } from '@tiptap/extension-heading';
import { useCurrentEditor } from '@tiptap/react';
import cx from 'classnames';
import DropdownChevron from '../../DropdownChevron';
import InputBase from '../../InputBase';
import InputDropdown from '../../InputDropdown';
import useClickOutside from '../../useClickOutside';
import { useEditorRerender } from './useEditorRerender';

type HeadingOption = {
  label: string;
  value: 'paragraph' | 'blockquote' | `h${Level}`;
  level?: Level;
};

const HEADING_OPTIONS: HeadingOption[] = [
  { label: 'Paragraph', value: 'paragraph' },
  { label: 'Heading 1', value: 'h1', level: 1 },
  { label: 'Heading 2', value: 'h2', level: 2 },
  { label: 'Heading 3', value: 'h3', level: 3 },
  { label: 'Heading 4', value: 'h4', level: 4 },
  { label: 'Heading 5', value: 'h5', level: 5 },
  { label: 'Heading 6', value: 'h6', level: 6 },
  { label: 'Blockquote', value: 'blockquote' },
];

/**
 * Default font sizes (in px, without the unit) for each block type.
 * These match the CSS classes in OPTION_SIZE_MAP and are used to populate
 * the font-size field when no explicit textStyle.fontSize mark is set —
 * i.e. when the size comes from the heading's CSS class, not an inline mark.
 */
const HEADING_DEFAULT_FONT_SIZES: Record<string, string> = {
  paragraph: '16',
  h1: '40',
  h2: '32',
  h3: '28',
  h4: '24',
  h5: '20',
  h6: '16',
  blockquote: '14',
};

const RichTextHeadingSelect = () => {
  const { editor } = useCurrentEditor();
  // Re-render whenever the cursor moves or content changes so all derived
  // values (heading label, font size) stay in sync with the editor state.
  useEditorRerender(editor);

  const [open, setOpen] = useState(false);
  // fontSizeInput is only used while the user is actively typing in the field.
  const [fontSizeInput, setFontSizeInput] = useState('');
  const [fontSizeFocused, setFontSizeFocused] = useState(false);

  const elementRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside([elementRef, dropdownRef], () => setOpen(false));

  if (!editor) return null;

  // --- Heading label (always derived from live editor state) ---
  const activeOption = HEADING_OPTIONS.find((opt) => {
    if (opt.level) return editor.isActive('heading', { level: opt.level });
    if (opt.value === 'blockquote') return editor.isActive('blockquote');
    return editor.isActive('paragraph');
  });
  const currentLabel = activeOption?.label ?? 'Paragraph';

  // --- Font size (derived from editor when the input is not focused) ---
  // Priority 1: an explicit textStyle.fontSize mark on the text (e.g. user typed "20px")
  // Priority 2: the heading-level default (headings get size from CSS, not an inline mark)
  const explicitFontSize = (
    editor.getAttributes('textStyle').fontSize as string | undefined
  )?.replace(/px$/, '');
  const editorFontSize =
    explicitFontSize ??
    HEADING_DEFAULT_FONT_SIZES[activeOption?.value ?? 'paragraph'] ??
    '';

  // While the user is typing, show their local input; otherwise mirror the editor.
  const displayFontSize = fontSizeFocused ? fontSizeInput : editorFontSize;

  const handleToggle = () => setOpen((v) => !v);

  const applyHeading = (opt: HeadingOption) => {
    // Mimic MS Word: clear ALL inline marks (bold, color, fontSize, etc.) and
    // reset the block type before applying the chosen style — giving a clean slate.
    const chain = editor.chain().focus().unsetAllMarks().clearNodes();

    if (opt.level) {
      chain.setHeading({ level: opt.level });
    } else if (opt.value === 'blockquote') {
      chain.setBlockquote();
    }
    // clearNodes() already normalises to paragraph, so no extra call needed for 'paragraph'.

    chain.run();
    setOpen(false);
  };

  const applyFontSize = (size: string) => {
    const trimmed = size.trim();
    if (!trimmed) {
      editor.chain().focus().unsetFontSize().run();
    } else {
      const px = /^\d+$/.test(trimmed) ? `${trimmed}px` : trimmed;
      editor.chain().focus().setFontSize(px).run();
    }
  };

  return (
    <div className="flex items-center gap-1">
      {/* Heading dropdown trigger — uses the same InputBase + DropdownChevron as Select */}
      <div ref={elementRef}>
        <InputBase
          focused={open}
          endIcons={<DropdownChevron open={open} onClick={handleToggle} />}
        >
          <button
            type="button"
            onClick={handleToggle}
            onMouseDown={(e) => e.preventDefault()}
            className="w-full outline-none truncate text-14px py-0.5 text-left min-w-[100px] text-neutral-100 dark:text-neutral-100-dark"
          >
            {currentLabel}
          </button>
        </InputBase>
      </div>

      {/* Options list — Portal-based, matches Select dropdown styling */}
      <InputDropdown
        open={open}
        elementRef={elementRef}
        dropdownRef={dropdownRef}
        fullWidth
      >
        <div role="listbox">
          {HEADING_OPTIONS.map((opt) => {
            let isActive: boolean;
            if (opt.level) {
              isActive = editor.isActive('heading', { level: opt.level });
            } else if (opt.value === 'blockquote') {
              isActive = editor.isActive('blockquote');
            } else {
              isActive = editor.isActive('paragraph');
            }

            return (
              <option
                aria-selected={isActive}
                key={opt.value}
                onClick={() => applyHeading(opt)}
                className={cx(
                  'py-1.5 px-4 text-left cursor-pointer',
                  isActive
                    ? 'bg-primary-surface dark:bg-primary-surface-dark text-primary-main dark:text-primary-main-dark'
                    : 'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100 dark:text-neutral-100-dark',
                )}
              >
                {opt.label}
              </option>
            );
          })}
        </div>
      </InputDropdown>

      {/* Font size input — styled to match InputBase */}
      <div
        className={cx(
          'relative px-2 border rounded-md flex items-center w-14',
          'transition-[border-color,box-shadow] duration-150 ease-in-out',
          'bg-neutral-10 dark:bg-neutral-10-dark shadow-box-3',
          'py-[3px]',
          fontSizeFocused
            ? 'border-primary-main dark:border-primary-main-dark ring-3 ring-primary-focus dark:ring-primary-focus-dark'
            : 'border-neutral-50 dark:border-neutral-50-dark hover:border-primary-hover dark:hover:border-primary-hover-dark',
        )}
      >
        <input
          type="text"
          value={displayFontSize}
          onChange={(e) => setFontSizeInput(e.target.value)}
          onFocus={() => {
            // Pre-fill local state with the current editor value so the user
            // can edit from the current size rather than starting from blank.
            setFontSizeInput(editorFontSize);
            setFontSizeFocused(true);
          }}
          onBlur={() => {
            setFontSizeFocused(false);
            applyFontSize(fontSizeInput);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              applyFontSize(fontSizeInput);
              (e.target as HTMLInputElement).blur();
            }
          }}
          placeholder="px"
          title="Font size (e.g. 16)"
          aria-label="Font size"
          className="w-full outline-none text-14px text-center bg-transparent py-0.5 text-neutral-100 dark:text-neutral-100-dark placeholder:text-neutral-60 dark:placeholder:text-neutral-60-dark"
        />
        <span className="text-neutral-70 dark:text-neutral-70-dark">px</span>
      </div>
    </div>
  );
};

export default RichTextHeadingSelect;
