import {
  ButtonHTMLAttributes, ReactNode, SVGProps,
} from 'react';

export type ButtonType = 'button' | 'submit';

export type Variant = 'primary' | 'secondary' | 'outlined' | 'solid';
export type IconComponent = (props: SVGProps<SVGSVGElement>) => JSX.Element;
export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
  variant?: Variant;
  size?: 'small' | 'medium' | 'large' | 'base';
  type?: ButtonType;
  icon?: IconComponent;
  children: ReactNode;
  width?: string;
}
