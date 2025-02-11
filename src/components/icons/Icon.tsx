import React, { forwardRef } from 'react';
import cx from 'classnames';
import COLORS from '../../libs/color';
import { IconProps } from '../../types';

export type MonotoneIconNames = 'arrow-down';

export type IconNames = MonotoneIconNames;

const Icon = forwardRef<HTMLSpanElement, IconProps>((props, ref) => {
  const {
    name,
    variant = 'outline',
    color = COLORS.neutral['90'],
    size = 24,
    strokeWidth = 2,
    className,
    onClick,
  } = props;

  return (
    <span
      onClick={onClick}
      className={cx(
        {
          'cursor-pointer': !!onClick,
        },
        className,
      )}
      ref={ref}
    >
      <svg width={size} height={size} stroke={color} strokeWidth={strokeWidth}>
        <use href={`/${name}.svg#${variant}`} />
      </svg>
    </span>
  );
});

export default Icon;
