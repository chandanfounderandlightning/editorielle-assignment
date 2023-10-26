import {
  ElementType, ReactElement, useMemo,
} from "react";
import {
  TypographyProps, TVariants, variantMapping,
} from "./types";
import { themeElements } from '../../../../common/theme/themeElements';

const getSizeClasses = (variant: keyof typeof TVariants) => themeElements.typography[variant];

export const Typography = ({
  variant = 'heading-md', classes = '', children, ...rest
}: TypographyProps): ReactElement => {
  const computedClasses = useMemo(() => {
    const sizeClasses =  getSizeClasses(variant);
    return `${sizeClasses} ${classes}`;
  }, [classes, variant]);
  const Component: ElementType = variantMapping[variant];
  return (
    <Component className={`${computedClasses}`} {...rest}>
      {children}
    </Component>
  );
}
