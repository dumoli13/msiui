import cx from 'classnames';
import RichTextAlignButton from './toolbar/RichTextAlignButton';
import RichTextColorPicker from './toolbar/RichTextColorPicker';
import RichTextHeadingSelect from './toolbar/RichTextHeadingSelect';
import RichTextImageButton from './toolbar/RichTextImageButton';
import RichTextLinkDialog from './toolbar/RichTextLinkDialog';
import RichTextListButton from './toolbar/RichTextListButton';
import RichTextStyleButton from './toolbar/RichTextStyleButton';
import RichTextTableDialog from './toolbar/RichTextTableDialog';

const Divider = () => (
  <div className="w-0 h-8 border border-neutral-30 dark:bg-neutral-60-dark mx-2" />
);

interface RichTextToolbarProps {
  disabled?: boolean;
  className?: string;
}

const RichTextToolbar = ({ disabled, className }: RichTextToolbarProps) => {
  if (disabled) return null;

  return (
    <div
      className={cx(
        'flex flex-wrap items-center gap-0.5 px-2 py-1.5 w-full',
        'border-b border-neutral-30 dark:border-neutral-60-dark',
        'bg-neutral-10 dark:bg-neutral-10-dark rounded-t-md',
        className,
      )}
    >
      {/* Text variant + font size */}
      <RichTextHeadingSelect />

      <Divider />

      {/* Inline formatting */}
      <RichTextStyleButton style="bold" />
      <RichTextStyleButton style="italic" />
      <RichTextStyleButton style="underline" />
      <RichTextStyleButton style="strike" />
      <RichTextStyleButton style="code" />

      <Divider />

      {/* Color */}
      <RichTextColorPicker />

      <Divider />

      {/* Alignment */}
      <RichTextAlignButton />

      <Divider />

      {/* Lists + Indent */}
      <RichTextListButton />

      <Divider />

      {/* Insert: link, image, table */}
      <RichTextLinkDialog />
      <RichTextImageButton />
      <RichTextTableDialog />
    </div>
  );
};

export default RichTextToolbar;
