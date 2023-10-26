import {
  ElementType, ReactNode,
} from 'react';

export const TVariants = {
  'heading-xs': 'heading-xs',
  'heading-sm': 'heading-sm',
  'heading-md': 'heading-md',
  'heading-lg': 'heading-lg',
  'heading-xl': 'heading-xl',
  'heading-2xl': 'heading-2xl',
  'body-xs': 'body-xs',
  'body-sm': 'body-sm',
  'body-md': 'body-base',
  'body-lg': 'body-lg',
  'body-xl': 'body-xl',
  'body-2xl': 'body-2xl',
  'body-3xl': 'body-3xl',
  'body-4xl': 'body-4xl',
  'body-5xl': 'body-5xl',
  'body-6xl': 'body-6xl',
  'body-7xl': 'body-7xl',
  'body-8xl': 'body-8xl',
  'body-9xl': 'body-9xl',
  'span-xs': 'span-xs',
  'span-sm': 'span-sm',
  'span-md': 'span-md',
}

export type TypographyProps = {
  /** The size of the typography */
  variant: keyof typeof TVariants;
  /** The content of the typography */
  children: ReactNode;
  /** Additional Tailwind classes */
  classes?: string;
}

export type VariantMapping = {
  [key: string] : ElementType
}

export const variantMapping: VariantMapping = {
  'heading-xs': 'h6',
  'heading-sm': 'h5',
  'heading-md': 'h4',
  'heading-lg': 'h3',
  'heading-xl': 'h2',
  'heading-2xl': 'h1',
  'body-xs': 'p',
  'body-sm': 'p',
  'body-md': 'p',
  'body-lg': 'p',
  'body-xl': 'p',
  'body-2xl': 'p',
  'body-3xl': 'p',
  'body-4xl': 'p',
  'body-5xl': 'p',
  'body-6xl': 'p',
  'body-7xl': 'p',
  'body-8xl': 'p',
  'body-9xl': 'p',
  'span-xs': 'span',
  'span-sm': 'span',
  'span-md': 'span',
};
