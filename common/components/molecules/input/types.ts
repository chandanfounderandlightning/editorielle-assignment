import { InputProps } from "@/common/components/atoms/input/types";
import { ReactNode } from "react";

export type MoleculeInputProps = InputProps & {
  /** The label text of the input */
  labelText?: string;
  /** The optional text of the input */
  optionalText?: ReactNode;
  /** The width of the input */
  width?: string;
  /** The error text of the input */
  errorMessage?: string;
  /** The data-cy value of the input */
  'data-cy'?: string;
};
