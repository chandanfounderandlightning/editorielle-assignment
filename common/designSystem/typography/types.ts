import {
  ElementType, ReactNode,
} from "react";

export type TypographyVariants =
'heading-01' |
'heading-02' |
'heading-03' |
'heading-04' |
'heading-05' |
'heading-06' |
'heading-compact-01' |
'heading-compact-02' |
'heading-07' |
'heading-compact-01-underline' |
'heading-compact-02-underline' |
'body-compact-01-linethrough' |
'body-compact-02-linethrough' |
'body-compact-01-underline' |
'body-compact-02-underline' |
'body-01' |
'body-02' |
'body-compact-01' |
'body-compact-02' |
'body-03' |
'helper-text-01' |
'label-01' |
'label-02';

export type VariantMapping = {
    [key: string] : ElementType
}

export type InlineStyles = {
  color?: string;
  fontWeight?: string | number;
  marginTop?: string;
  marginBottom?: string;
}

export type TypographyProps = {
    children?: ReactNode;
    variant?: TypographyVariants;
    className?: string;
    color?: string;
    fontWeight?: string | number;
    style?: object;
    onClick?: () => void;
    noMargin?: boolean;
}

export const variantMapping: VariantMapping = {
  'heading-01': 'h1',
  'heading-02': 'h2',
  'heading-03': 'h3',
  'heading-04': 'h4',
  'heading-05': 'h5',
  'heading-06': 'h6',
  'heading-compact-01': 'h6',
  'heading-compact-02': 'h6',
  'heading-07': 'h6',
  'heading-compact-01-underline': 'h6',
  'heading-compact-02-underline': 'h6',
  'body-01': 'p',
  'body-02': 'p',
  'body-compact-01': 'p',
  'body-compact-02': 'p',
  'body-compact-01-linethrough': 'p',
  'body-compact-02-linethrough': 'p',
  'body-compact-01-underline': 'p',
  'body-compact-02-underline': 'p',
  'body-03': 'p',
  'helper-text-01': 'p',
  'label-01': 'p',
  'label-02': 'p',
};
