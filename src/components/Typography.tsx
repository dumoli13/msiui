import sx from 'classnames';
import { variantMap } from '../const';
import type { TypographyProps } from '../types';

const Typography = ({
  variant = 'paragraph-m',
  children,
  className,
  ...props
}: TypographyProps) => {
  const Variant = variantMap[variant] || 'div';

  return (
    <Variant
      className={sx(
        {
          'text-40px leading-[48px] font-bold -tracking-[2%]': variant === 'h1',
          'text-32px leading-[38px] font-bold -tracking-[2%]': variant === 'h2',
          'text-28px leading-[34px] font-bold -tracking-[2%]': variant === 'h3',
          'text-24px leading-[28px] font-bold -tracking-[2%]': variant === 'h4',
          'text-20px leading-[24px] font-bold -tracking-[2%]': variant === 'h5',
          'text-16px leading-[19px] font-bold -tracking-[2%]': variant === 'h6',
          'text-20px leading-[32px]': variant === 'paragraph-xl',
          'text-18px leading-[28px]': variant === 'paragraph-l',
          'text-16px leading-[28px]': variant === 'paragraph-m',
          'text-14px leading-[20px]': variant === 'paragraph-s',
          'text-12px leading-[20px]': variant === 'paragraph-xs',
        },
        className,
      )}
      {...props}
    >
      {children}
    </Variant>
  );
};

export default Typography;
