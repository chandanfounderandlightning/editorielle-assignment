import { LinkProps } from './types';
import './link.scss';
const Link = (props: LinkProps) => {
  const {
    type = 'primary',
    ...rest
  } = props;
  return (
    <a className={`custom-link ${type}`} {...rest} />
  );
};

export default Link;
