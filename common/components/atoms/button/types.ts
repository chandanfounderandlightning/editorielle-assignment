import {
  ButtonHTMLAttributes, ReactNode, SVGProps,
} from "react";

export type ButtonType = 'button' | 'submit';
export type Variants = 'solid' | 'outlined' | 'circular';
export type Sizes = 'sm' | 'md' | 'lg';
export const TVariants = {
  solid: 'solid',
  outlined: 'outlined',
  circular: 'circular',
}
export const TSizes = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
}
export type IconComponent = (props: SVGProps<SVGSVGElement>) => JSX.Element;
export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
  variant: Variants;
  size: Sizes;
  width?: string;
  type?: ButtonType;
  disabled?: boolean;
  icon?: IconComponent;
  children: ReactNode;
}
