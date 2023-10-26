import { ReactNode } from "react";
import Link from "next/link";

interface CustomLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

const CustomLink: React.FC<CustomLinkProps> = ({ href, children, className = '', ...props }) => {
  return (
    <Link className={`custom-link ${className}`} href={href} {...props}>
      {children}
    </Link>
  );
};

export default CustomLink;
