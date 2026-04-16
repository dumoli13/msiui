import React from 'react';
import { useCurrentEditor } from '@tiptap/react';
import cx from 'classnames';
import Icon from '../../../Icon';
import type { IconNames } from '../../../Icon';
import { useEditorRerender } from './useEditorRerender';

type StyleType = 'bold' | 'italic' | 'underline' | 'strike' | 'code';

const STYLE_CONFIG: Record<
  StyleType,
  { icon: IconNames; label: string; command: string }
> = {
  bold: { icon: 'bold', label: 'Bold', command: 'toggleBold' },
  italic: { icon: 'italic', label: 'Italic', command: 'toggleItalic' },
  underline: {
    icon: 'underline',
    label: 'Underline',
    command: 'toggleUnderline',
  },
  strike: {
    icon: 'strikethrough',
    label: 'Strikethrough',
    command: 'toggleStrike',
  },
  code: { icon: 'code-bracket', label: 'Code', command: 'toggleCode' },
};

interface ToolbarButtonProps {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  title?: string;
  onClick: () => void;
}

export const ToolbarButton = ({
  children,
  active,
  disabled,
  title,
  onClick,
}: ToolbarButtonProps) => (
  <button
    type="button"
    title={title}
    disabled={disabled}
    onClick={onClick}
    className={cx(
      'flex items-center justify-center w-7 h-7 rounded text-14px transition-colors',
      {
        'bg-primary-focus dark:bg-primary-focus-dark text-white': active,
        'text-neutral-70 dark:text-neutral-30-dark hover:bg-neutral-20 dark:hover:bg-neutral-60-dark':
          !active && !disabled,
        'opacity-40 cursor-not-allowed': disabled,
      },
    )}
  >
    {children}
  </button>
);

interface RichTextStyleButtonProps {
  style: StyleType;
}

const RichTextStyleButton = ({ style }: RichTextStyleButtonProps) => {
  const { editor } = useCurrentEditor();
  useEditorRerender(editor);
  if (!editor) return null;

  const config = STYLE_CONFIG[style];
  const isActive = editor.isActive(style);

  return (
    <ToolbarButton
      active={isActive}
      title={config.label}
      onClick={() => {
        const chain = editor.chain().focus() as unknown as Record<
          string,
          () => { run: () => void }
        >;
        chain[config.command]().run();
      }}
    >
      <Icon name={config.icon} size={16} />
    </ToolbarButton>
  );
};

export default RichTextStyleButton;
