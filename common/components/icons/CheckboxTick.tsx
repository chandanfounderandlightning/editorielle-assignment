import * as React from "react";
import type { SVGProps } from "react";
const SvgCheckboxTick = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 10 8"
    {...props}
  >
    <path
      fill="#fff"
      d="M9.207.793a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L3.5 5.086 7.793.793a1 1 0 0 1 1.414 0Z"
    />
  </svg>
);
export default SvgCheckboxTick;
