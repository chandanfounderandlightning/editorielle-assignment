import { AnchorHTMLAttributes } from 'react';

type LinkType = 'primary' | 'secondary' | 'light'
export type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, ''> & {
  type?: LinkType,
}
