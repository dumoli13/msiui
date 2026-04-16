import React, { useRef, useState } from 'react';
import { useCurrentEditor } from '@tiptap/react';
import cx from 'classnames';
import Icon from '../../../Icon';
import useClickOutside from '../../useClickOutside';
import { ToolbarButton } from './RichTextStyleButton';
import { useEditorRerender } from './useEditorRerender';

const SWATCH_ACTIVE_CLASS =
  'border-primary-main dark:border-primary-main-dark ring-1 ring-primary-main dark:ring-primary-main-dark z-10';
const SWATCH_INACTIVE_CLASS = 'border-neutral-30 dark:border-neutral-50-dark';
const SWATCH_BASE_CLASS =
  'w-[18px] h-[18px] border transition-transform hover:scale-125';

// ─── MS Word color palette ─────────────────────────────────────────────────

// Office default theme colors (10 columns × 6 rows).
// Row 0 = base theme colors.
// Rows 1-3 = tints (lighter toward white): 80%, 60%, 40%.
// Rows 4-5 = shades (darker toward black): 25%, 50%.
// For the White column: shades at 5%, 15%, 25%, 35%, 50%.
// For the Black column: tints at 50%, 35%, 25%, 15%, 5%.
const THEME_COLORS: string[][] = [
  // Base:    White     Black     LtGray    DkBlue    Blue      Orange    Gray      Gold      LtBlue    Green
  /*  row 0 */ [
    '#FFFFFF',
    '#000000',
    '#E7E6E6',
    '#44546A',
    '#4472C4',
    '#ED7D31',
    '#A5A5A5',
    '#FFC000',
    '#5B9BD5',
    '#70AD47',
  ],
  /*  row 1 */ [
    '#F2F2F2',
    '#808080',
    '#D0CECE',
    '#D6DCE4',
    '#DAE3F3',
    '#FBE5D6',
    '#EDEDED',
    '#FFF2CC',
    '#DEEBF7',
    '#E2EFDA',
  ],
  /*  row 2 */ [
    '#D9D9D9',
    '#595959',
    '#AEAAAA',
    '#ADB9CA',
    '#B4C7E7',
    '#F8CBAD',
    '#DBDBDB',
    '#FFE699',
    '#BDD7EE',
    '#C5E0B4',
  ],
  /*  row 3 */ [
    '#BFBFBF',
    '#404040',
    '#757171',
    '#8497B0',
    '#8FAADC',
    '#F4B183',
    '#C9C9C9',
    '#FFD966',
    '#9DC3E6',
    '#A9D18E',
  ],
  /*  row 4 */ [
    '#A6A6A6',
    '#262626',
    '#3B3838',
    '#333F50',
    '#305496',
    '#C55A11',
    '#7C7C7C',
    '#BF9000',
    '#2F75B5',
    '#548235',
  ],
  /*  row 5 */ [
    '#808080',
    '#0D0D0D',
    '#171616',
    '#222A35',
    '#203764',
    '#843C0C',
    '#525252',
    '#806000',
    '#1F4E79',
    '#375623',
  ],
];

// Standard colors row (fixed, not theme-dependent in Word).
const STANDARD_COLORS = [
  '#C00000',
  '#FF0000',
  '#FFC000',
  '#FFFF00',
  '#92D050',
  '#00B050',
  '#00B0F0',
  '#0070C0',
  '#002060',
  '#7030A0',
];

// Highlight presets (Word-style highlighter colors).
const HIGHLIGHT_COLORS = [
  '#FFFF00',
  '#00FF00',
  '#00FFFF',
  '#FF00FF',
  '#0000FF',
  '#FF0000',
  '#000080',
  '#008080',
  '#00FF00',
  '#800080',
  '#800000',
  '#808000',
  '#808080',
  '#C0C0C0',
  '#000000',
  '#FFFFFF',
];

// ─── Popovers ──────────────────────────────────────────────────────────────

interface TextColorPopoverProps {
  currentColor?: string;
  onColorChange: (color: string) => void;
  onClear: () => void;
}

const TextColorPopover = ({
  currentColor,
  onColorChange,
  onClear,
}: TextColorPopoverProps) => {
  const [customColor, setCustomColor] = useState(currentColor ?? '#000000');

  React.useEffect(() => {
    setCustomColor(currentColor ?? '#000000');
  }, [currentColor]);

  const norm = (c?: string) => c?.toLowerCase();

  return (
    <div className="absolute top-full left-0 mt-1 z-50 bg-neutral-10 dark:bg-neutral-80-dark border border-neutral-30 dark:border-neutral-60-dark rounded shadow-box-3 p-3 w-auto">
      {/* ── Automatic Colors ── */}
      <p className="text-12px font-medium text-neutral-60 dark:text-neutral-40-dark mb-1.5">
        Automatic Colors
      </p>
      <button
        type="button"
        title="Automatic"
        onClick={() => onColorChange('#000000')}
        className="flex items-center gap-2 mb-3 w-full group"
        // className={cx(
        //   SWATCH_BASE_CLASS,
        //   norm(currentColor) === norm('#000000')
        //     ? SWATCH_ACTIVE_CLASS
        //     : SWATCH_INACTIVE_CLASS,
        // )}
      >
        <div
          className={cx(
            'w-[18px] h-[18px]   transition-transform group-hover:scale-125',
            norm(currentColor) === norm('#000000')
              ? SWATCH_ACTIVE_CLASS
              : SWATCH_INACTIVE_CLASS,
          )}
          style={{ backgroundColor: '#000000' }}
        />
        <span className="text-12px">Automatic</span>
      </button>
      {/* ── Theme Colors ── */}
      <p className="text-12px font-medium text-neutral-60 dark:text-neutral-40-dark mb-1.5">
        Theme Colors
      </p>
      <div className="flex flex-col gap-0.5 mb-3">
        {THEME_COLORS.map((row) => (
          <div key={row[0]} className="flex gap-0.5">
            {row.map((color) => (
              <button
                key={color}
                type="button"
                title={color}
                aria-label={`Select theme color ${color}`}
                onClick={() => onColorChange(color)}
                style={{ backgroundColor: color }}
                className={cx(
                  SWATCH_BASE_CLASS,
                  norm(currentColor) === norm(color)
                    ? SWATCH_ACTIVE_CLASS
                    : SWATCH_INACTIVE_CLASS,
                )}
              />
            ))}
          </div>
        ))}
      </div>
      {/* ── Standard Colors ── */}
      <p className="text-12px font-medium text-neutral-60 dark:text-neutral-40-dark mb-1.5">
        Standard Colors
      </p>
      <div className="flex gap-0.5 mb-3">
        {STANDARD_COLORS.map((color) => (
          <button
            key={color}
            type="button"
            title={color}
            aria-label={`Select standard color ${color}`}
            onClick={() => onColorChange(color)}
            style={{ backgroundColor: color }}
            className={cx(
              SWATCH_BASE_CLASS,
              norm(currentColor) === norm(color)
                ? SWATCH_ACTIVE_CLASS
                : SWATCH_INACTIVE_CLASS,
            )}
          />
        ))}
      </div>
      {/* ── Custom color ── */}
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={customColor}
          aria-label="Custom color picker"
          onChange={(e) => {
            setCustomColor(e.target.value);
            onColorChange(e.target.value);
          }}
          className="w-7 h-7 rounded cursor-pointer border border-neutral-30 dark:border-neutral-50-dark p-0"
        />
        <input
          type="text"
          value={customColor}
          aria-label="Custom color hex value"
          onChange={(e) => setCustomColor(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && /^#[0-9a-fA-F]{6}$/.test(customColor))
              onColorChange(customColor);
          }}
          onBlur={() => {
            if (/^#[0-9a-fA-F]{6}$/.test(customColor))
              onColorChange(customColor);
          }}
          className={cx(
            'flex-1 h-7 px-2 text-12px rounded border',
            'border-neutral-30 dark:border-neutral-60-dark',
            'bg-neutral-10 dark:bg-neutral-10-dark text-neutral-80 dark:text-neutral-20-dark',
            'focus:outline-none focus:border-primary-main dark:focus:border-primary-main-dark',
          )}
          placeholder="#000000"
          maxLength={7}
        />
        <button
          type="button"
          onClick={onClear}
          title="No Color"
          className="text-12px text-neutral-50 dark:text-neutral-40-dark hover:text-danger-main dark:hover:text-danger-main-dark"
        >
          <Icon name="x-mark" size={14} />
        </button>
      </div>
    </div>
  );
};

interface HighlightPopoverProps {
  currentColor?: string;
  onColorChange: (color: string) => void;
  onClear: () => void;
}

const HighlightPopover = ({
  currentColor,
  onColorChange,
  onClear,
}: HighlightPopoverProps) => {
  const norm = (c?: string) => c?.toLowerCase();

  return (
    <div className="absolute top-full left-0 mt-1 z-50 bg-neutral-10 dark:bg-neutral-80-dark border border-neutral-30 dark:border-neutral-60-dark rounded shadow-box-3 p-3 w-auto">
      <p className="text-12px font-medium text-neutral-60 dark:text-neutral-40-dark mb-1.5">
        Highlight Color
      </p>

      <div className="grid grid-cols-8 gap-0.5 mb-3">
        {HIGHLIGHT_COLORS.map((color) => (
          <button
            key={color}
            type="button"
            title={color}
            aria-label={`Select highlight color ${color}`}
            onClick={() => onColorChange(color)}
            style={{ backgroundColor: color }}
            className={cx(
              SWATCH_BASE_CLASS,
              norm(currentColor) === norm(color)
                ? SWATCH_ACTIVE_CLASS
                : SWATCH_INACTIVE_CLASS,
            )}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onClear}
        className="flex items-center gap-1.5 text-12px text-neutral-60 dark:text-neutral-40-dark hover:text-danger-main dark:hover:text-danger-main-dark"
      >
        <Icon name="x-mark" size={12} />
        No Color
      </button>
    </div>
  );
};

// ─── Main component ────────────────────────────────────────────────────────

const RichTextColorPicker = () => {
  const { editor } = useCurrentEditor();
  useEditorRerender(editor);
  const [textOpen, setTextOpen] = useState(false);
  const [highlightOpen, setHighlightOpen] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  useClickOutside([textRef], () => setTextOpen(false));
  useClickOutside([highlightRef], () => setHighlightOpen(false));

  if (!editor) return null;

  const rawTextColor = editor.getAttributes('textStyle').color as
    | string
    | undefined;
  const currentHighlight = editor.getAttributes('highlight').color as
    | string
    | undefined;

  return (
    <div className="flex items-center gap-0.5">
      {/* Text color */}
      <div ref={textRef} className="relative">
        <ToolbarButton
          title="Text color"
          onClick={() => {
            setHighlightOpen(false);
            setTextOpen((v) => !v);
          }}
        >
          <div className="flex flex-col items-center gap-0.5">
            <Icon name="eye-dropper" size={14} />
            <div
              className="w-4 h-1 rounded-sm"
              style={{ backgroundColor: rawTextColor ?? '#000000' }}
            />
          </div>
        </ToolbarButton>

        {textOpen && (
          <TextColorPopover
            currentColor={rawTextColor}
            onColorChange={(color) => {
              editor.chain().focus().setColor(color).run();
              setTextOpen(false);
            }}
            onClear={() => {
              editor.chain().focus().unsetColor().run();
              setTextOpen(false);
            }}
          />
        )}
      </div>

      {/* Highlight color */}
      <div ref={highlightRef} className="relative">
        <ToolbarButton
          title="Highlight color"
          onClick={() => {
            setTextOpen(false);
            setHighlightOpen((v) => !v);
          }}
        >
          <div className="flex flex-col items-center gap-0.5">
            <Icon name="swatch" size={14} />
            <div
              className="w-4 h-1 rounded-sm border border-neutral-30 dark:border-neutral-50-dark"
              style={{ backgroundColor: currentHighlight ?? 'transparent' }}
            />
          </div>
        </ToolbarButton>

        {highlightOpen && (
          <HighlightPopover
            currentColor={currentHighlight}
            onColorChange={(color) => {
              editor.chain().focus().setHighlight({ color }).run();
              setHighlightOpen(false);
            }}
            onClear={() => {
              editor.chain().focus().unsetHighlight().run();
              setHighlightOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default RichTextColorPicker;
