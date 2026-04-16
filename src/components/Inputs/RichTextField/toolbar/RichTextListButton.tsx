import { useRef, useState } from 'react';
import { useCurrentEditor } from '@tiptap/react';
import cx from 'classnames';
import Icon from '../../../Icon';
import useClickOutside from '../../useClickOutside';
import type { BulletStyleType } from '../extensions/BulletStyle';
import { ToolbarButton } from './RichTextStyleButton';
import { useEditorRerender } from './useEditorRerender';

const BULLET_STYLES: {
  value: BulletStyleType;
  label: string;
  preview: string;
}[] = [
  { value: 'disc', label: 'Disc', preview: '●' },
  { value: 'circle', label: 'Circle', preview: '○' },
  { value: 'square', label: 'Square', preview: '■' },
  { value: 'none', label: 'None', preview: '—' },
];

const RichTextListButton = () => {
  const { editor } = useCurrentEditor();
  useEditorRerender(editor);
  const [bulletMenuOpen, setBulletMenuOpen] = useState(false);
  const bulletRef = useRef<HTMLDivElement>(null);

  useClickOutside([bulletRef], () => setBulletMenuOpen(false));

  if (!editor) return null;

  return (
    <div className="flex items-center gap-0.5">
      {/* Bullet list toggle */}
      <div ref={bulletRef} className="relative flex items-center">
        <ToolbarButton
          active={editor.isActive('bulletList')}
          title="Bullet list"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <Icon name="list-bullet" size={16} />
        </ToolbarButton>

        {/* Bullet style picker chevron */}
        <button
          type="button"
          title="Bullet style"
          onClick={() => setBulletMenuOpen((v) => !v)}
          className={cx(
            'flex items-center justify-center w-3 h-7 rounded-r text-neutral-50 dark:text-neutral-40-dark',
            'hover:bg-neutral-20 dark:hover:bg-neutral-60-dark transition-colors',
          )}
        >
          <Icon name="chevron-down" size={10} />
        </button>

        {bulletMenuOpen && (
          <div className="absolute top-full left-0 mt-1 z-50 bg-neutral-10 dark:bg-neutral-80-dark border border-neutral-30 dark:border-neutral-60-dark rounded shadow-box-3 p-1 flex gap-1">
            {BULLET_STYLES.map((bs) => (
              <button
                key={bs.value}
                type="button"
                title={bs.label}
                onClick={() => {
                  if (!editor.isActive('bulletList')) {
                    editor.chain().focus().toggleBulletList().run();
                  }
                  editor.chain().focus().setBulletStyle(bs.value).run();
                  setBulletMenuOpen(false);
                }}
                className={cx(
                  'flex flex-col items-center justify-center w-10 h-10 rounded text-18px transition-colors',
                  {
                    'bg-primary-light dark:bg-primary-light-dark text-primary-main':
                      editor.isActive('bulletList') &&
                      editor.getAttributes('bulletList').bulletStyle ===
                        bs.value,
                    'text-neutral-70 dark:text-neutral-30-dark hover:bg-neutral-20 dark:hover:bg-neutral-60-dark': true,
                  },
                )}
              >
                <span>{bs.preview}</span>
                <span className="text-[9px] text-neutral-50">{bs.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Ordered list */}
      <ToolbarButton
        active={editor.isActive('orderedList')}
        title="Ordered list"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <Icon name="numbered-list" size={16} />
      </ToolbarButton>

      {/* Indent / Outdent */}
      <ToolbarButton
        title="Indent"
        onClick={() => editor.chain().focus().indent().run()}
      >
        <Icon name="arrow-right-end-on-rectangle" size={16} />
      </ToolbarButton>
      <ToolbarButton
        title="Outdent"
        onClick={() => editor.chain().focus().outdent().run()}
      >
        <Icon name="arrow-left-end-on-rectangle" size={16} />
      </ToolbarButton>
    </div>
  );
};

export default RichTextListButton;
