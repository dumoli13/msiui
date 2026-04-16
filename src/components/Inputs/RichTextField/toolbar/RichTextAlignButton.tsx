import { useRef, useState } from 'react';
import { useCurrentEditor } from '@tiptap/react';
import Icon from '../../../Icon';
import type { IconNames } from '../../../Icon';
import useClickOutside from '../../useClickOutside';
import { ToolbarButton } from './RichTextStyleButton';
import { useEditorRerender } from './useEditorRerender';

type AlignType = 'left' | 'center' | 'right' | 'justify';

const ALIGN_OPTIONS: { value: AlignType; icon: IconNames; label: string }[] = [
  { value: 'left', icon: 'bars-3-bottom-left', label: 'Align left' },
  { value: 'center', icon: 'align-center', label: 'Align center' },
  { value: 'right', icon: 'bars-3-bottom-right', label: 'Align right' },
  { value: 'justify', icon: 'bars-3', label: 'Justify' },
];

const RichTextAlignButton = () => {
  const { editor } = useCurrentEditor();
  useEditorRerender(editor);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside([ref], () => setOpen(false));

  if (!editor) return null;

  const activeAlign = ALIGN_OPTIONS.find((opt) =>
    editor.isActive({ textAlign: opt.value }),
  );
  const currentIcon = activeAlign?.icon ?? 'bars-3-bottom-left';

  return (
    <div ref={ref} className="relative">
      <ToolbarButton title="Text alignment" onClick={() => setOpen((v) => !v)}>
        <Icon name={currentIcon} size={16} />
      </ToolbarButton>

      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 bg-neutral-10 dark:bg-neutral-80-dark border border-neutral-30 dark:border-neutral-60-dark rounded shadow-box-3 p-1 flex gap-1">
          {ALIGN_OPTIONS.map((opt) => (
            <ToolbarButton
              key={opt.value}
              active={editor.isActive({ textAlign: opt.value })}
              title={opt.label}
              onClick={() => {
                editor.chain().focus().setTextAlign(opt.value).run();
                setOpen(false);
              }}
            >
              <Icon name={opt.icon} size={16} />
            </ToolbarButton>
          ))}
        </div>
      )}
    </div>
  );
};

export default RichTextAlignButton;
