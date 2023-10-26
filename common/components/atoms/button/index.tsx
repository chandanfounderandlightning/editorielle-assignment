import { useMemo } from 'react';
import { themeElements } from '../../../../common/theme/themeElements';
import {
  ButtonProps, TVariants, TSizes,
} from './types';
const getVariantClasses = (variant: keyof typeof TVariants) => themeElements.buttons[variant].style;
const getSizeClasses = (variant: keyof typeof TVariants, size: keyof typeof TSizes) => themeElements.buttons[variant].size[size];
export const Button = ({
  variant = 'solid',
  size = 'md',
  width = 'w-auto',
  type = 'button',
  disabled = false,
  icon: Icon,
  children,
  ...props
}: ButtonProps) => {
  const computedClasses = useMemo(() => {
    const variantClasses = getVariantClasses(variant);
    const sizeClasses = getSizeClasses(variant, size);

    return [variantClasses, sizeClasses].join(' ');
  }, [variant, size]);
  return (
    <button
      className={`${width} ${computedClasses}`}
      {...props}
      type={type}
      disabled={disabled}
    >
      {children}
      {!!Icon && <Icon />}
    </button>
  );
};
