import {
  TypographyProps,
  variantMapping,
  InlineStyles,
} from './types';
import './typography.scss';
import { ElementType } from "react";

const Typography = (props: TypographyProps) => {
  const {
    children,
    className = '',
    variant = 'body-01',
    style = {},
    color = '',
    fontWeight = '',
    onClick = () => { return; },
    noMargin = false,
    ...rest
  } = props;
  let styleObj: InlineStyles = {};

  if (color !== '') {
    styleObj.color = color;
  }
  if (fontWeight !== '') {
    styleObj.fontWeight = fontWeight;
  }
  if (noMargin) {
    styleObj.marginTop = '0px';
    styleObj.marginBottom = '0px';
  }
  styleObj = {
    ...style,
    ...styleObj,
  };
  const Component: ElementType = variantMapping[variant];

  return (
    <Component className={[variant, className].join(' ')} style={styleObj} onClick={onClick} {...rest}>
      {children}
    </Component>
  );
};

export default Typography;
