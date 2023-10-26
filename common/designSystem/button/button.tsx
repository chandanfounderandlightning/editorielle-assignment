/* eslint-disable react/button-has-type */
import './button.scss';
import { ButtonProps } from "@/common/designSystem/button/types";

export const Button = ({
  variant = 'primary',
  size = 'medium',
  children,
  type = 'button',
  icon: Icon,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={['custom-button', size, variant].join(' ')}
      {...props}
      type={type}
    >
      {Icon !== undefined && <Icon />}
      {children}
    </button>
  );
};

export default Button;
