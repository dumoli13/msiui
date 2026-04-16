import Icon from '../Icon';
import Typography from '../Typography';

/**
 * Shown inside dropdowns when there are no options to display.
 * Not exported from the library index.
 */
function DropdownEmptyState() {
  return (
    <div
      role="status"
      className="p-4 rounded-md flex flex-col gap-3 items-center justify-center"
    >
      <div className="flex items-center justify-center w-16 h-16 bg-neutral-20 text-neutral-70 rounded-full">
        <Icon name="clipboard" size={36} />
      </div>
      <Typography variant="paragraph-m" className="text-neutral-90 text-center">
        Empty Option
      </Typography>
    </div>
  );
}

export default DropdownEmptyState;
