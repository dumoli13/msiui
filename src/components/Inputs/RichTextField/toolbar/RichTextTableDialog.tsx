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
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside([ref], () => setOpen(false));

  if (!editor) return null;

  const handleInsert = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: withHeader })
      .run();
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <ToolbarButton
        active={editor.isActive('table')}
        title="Insert table"
        onClick={() => setOpen((v) => !v)}
      >
        <Icon name="table-cells" size={16} />
      </ToolbarButton>

      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 bg-neutral-10 dark:bg-neutral-80-dark border border-neutral-30 dark:border-neutral-60-dark rounded shadow-box-3 p-3 w-56">
          <p className="text-12px font-medium text-neutral-60 dark:text-neutral-40-dark mb-3">
            Insert Table
          </p>

          <div className="flex flex-col gap-2 mb-3">
            {/* Rows */}
            <div className="flex items-center justify-between">
              <label className="text-12px text-neutral-60 dark:text-neutral-40-dark">
                Rows
              </label>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setRows((r) => Math.max(1, r - 1))}
                  className="w-6 h-6 rounded border border-neutral-30 dark:border-neutral-60-dark text-neutral-70 dark:text-neutral-30-dark hover:bg-neutral-20 dark:hover:bg-neutral-60-dark flex items-center justify-center"
                >
                  <Icon name="minus" size={12} />
                </button>
                <span className="w-8 text-center text-14px text-neutral-80 dark:text-neutral-20-dark">
                  {rows}
                </span>
                <button
                  type="button"
                  onClick={() => setRows((r) => Math.min(20, r + 1))}
                  className="w-6 h-6 rounded border border-neutral-30 dark:border-neutral-60-dark text-neutral-70 dark:text-neutral-30-dark hover:bg-neutral-20 dark:hover:bg-neutral-60-dark flex items-center justify-center"
                >
                  <Icon name="plus" size={12} />
                </button>
              </div>
            </div>

            {/* Cols */}
            <div className="flex items-center justify-between">
              <label className="text-12px text-neutral-60 dark:text-neutral-40-dark">
                Columns
              </label>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setCols((c) => Math.max(1, c - 1))}
                  className="w-6 h-6 rounded border border-neutral-30 dark:border-neutral-60-dark text-neutral-70 dark:text-neutral-30-dark hover:bg-neutral-20 dark:hover:bg-neutral-60-dark flex items-center justify-center"
                >
                  <Icon name="minus" size={12} />
                </button>
                <span className="w-8 text-center text-14px text-neutral-80 dark:text-neutral-20-dark">
                  {cols}
                </span>
                <button
                  type="button"
                  onClick={() => setCols((c) => Math.min(20, c + 1))}
                  className="w-6 h-6 rounded border border-neutral-30 dark:border-neutral-60-dark text-neutral-70 dark:text-neutral-30-dark hover:bg-neutral-20 dark:hover:bg-neutral-60-dark flex items-center justify-center"
                >
                  <Icon name="plus" size={12} />
                </button>
              </div>
            </div>

            {/* Header row */}
            <div className="flex items-center justify-between">
              <label className="text-12px text-neutral-60 dark:text-neutral-40-dark">
                Header row
              </label>
              <button
                type="button"
                aria-label="Toggle header row"
                onClick={() => setWithHeader((v) => !v)}
                className={cx(
                  'w-8 h-4 rounded-full transition-colors relative',
                  withHeader
                    ? 'bg-primary-main dark:bg-primary-main-dark'
                    : 'bg-neutral-40 dark:bg-neutral-60-dark',
                )}
              >
                <span
                  className={cx(
                    'absolute top-0.5 w-3 h-3 bg-white rounded-full transition-transform',
                    withHeader ? 'translate-x-4' : 'translate-x-0.5',
                  )}
                />
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleInsert}
            className="w-full py-1.5 text-14px rounded bg-primary-main dark:bg-primary-main-dark text-white hover:bg-primary-hover dark:hover:bg-primary-hover-dark transition-colors"
          >
            Insert Table
          </button>

          {/* Table actions when a table is selected */}
          {editor.isActive('table') && (
            <div className="mt-2 pt-2 border-t border-neutral-20 dark:border-neutral-60-dark">
              <p className="text-12px font-medium text-neutral-60 dark:text-neutral-40-dark mb-1">
                Table actions
              </p>
              <div className="flex flex-wrap gap-1">
                {[
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
                ].map(({ label, cmd }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={cmd}
                    className={cx(
                      'px-2 py-0.5 text-12px rounded border transition-colors',
                      label === 'Delete'
                        ? 'border-danger-main text-danger-main hover:bg-danger-light dark:hover:bg-danger-light-dark'
                        : 'border-neutral-30 dark:border-neutral-60-dark text-neutral-70 dark:text-neutral-30-dark hover:bg-neutral-20 dark:hover:bg-neutral-60-dark',
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RichTextTableDialog;
