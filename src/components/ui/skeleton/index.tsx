/* eslint-disable react/no-array-index-key */
import cx from 'classnames';

interface SkeletonProps {
  width?: number;
  height?: number;
  type?: 'circle' | 'rounded' | 'rect';
}

/**
 * Input Skeleton Component
 *
 * A predefined skeleton loader for input fields, designed to simulate loading states for forms or inputs.
 * It consists of a title placeholder and a large input field placeholder.
 *
 * @returns {JSX.Element} A skeleton loader simulating an input field and its title.
 *
 * @example Basic Usage:
 * ```tsx
 * <Skeleton.input />
 * ```
 */

const Skeleton = ({ width, height, type = 'circle' }: SkeletonProps) => {
  return (
    <div
      className={cx('bg-neutral-30 animate-pulse', {
        'rounded-full': type === 'circle',
        'rounded-md': type === 'rounded',
        'shrink-0': !!height || !!width,
      })}
      style={{
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : '100%',
      }}
    />
  );
};

Skeleton.input = () => {
  return (
    <div>
      <div className="w-1/5 h-7 mb-1 bg-neutral-30 rounded-full animate-pulse" />
      <div className="w-full h-[57px] bg-neutral-30 rounded-full animate-pulse" />
    </div>
  );
};

Skeleton.table = ({ column }: { column: number }) => {
  return (
    <div className="overflow-y-auto border border-neutral-30 rounded-md">
      <table className="w-full">
        <thead>
          <tr>
            {new Array(column).fill(0).map((_col, key) => (
              <th
                key={key}
                className="text-left bg-neutral-20 px-4 py-3 border-r border-neutral-30 last:border-none"
                scope="col"
                aria-label={`Column ${key + 1}`}
              >
                <div className="flex gap-4 items-center justify-between">
                  <div className="w-full flex items-center gap-2.5">
                    <div className="bg-neutral-40 rounded-full animate-pulse w-1/3 h-5" />
                    <div className="flex flex-col gap-0.5">
                      <span className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-8 border-neutral-30" />
                      <span className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-8 border-neutral-30" />
                    </div>
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {new Array(5).fill(0).map((_row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-neutral-30 last:border-none"
            >
              {new Array(column).fill(0).map((_col, colIndex) => (
                <td
                  key={colIndex}
                  aria-label={`Row ${rowIndex + 1}, Column ${colIndex + 1}`}
                >
                  <div className="flex items-center justify-start px-4 py-2 min-h-[44px]">
                    <div className="bg-neutral-40 rounded-full animate-pulse w-4/5 h-4" />
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Skeleton;
