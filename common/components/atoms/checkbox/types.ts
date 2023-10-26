import React from 'react';
import {
  Control, ControllerRenderProps, FieldValues,
} from "react-hook-form";
export type CheckboxProps = {
  /** Whether the checkbox is checked or not */
  checked: boolean;
  /** The id of the checkbox */
  id?: string;
  /** The name of the checkbox */
  name?: string;
  /** The aria-describedby attribute of the checkbox */
  ariaDescribedBy?: string;
  /** Optional on change handler */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Optional on blur handler */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Whether the checkbox is in an error state */
  error?: boolean;
}

export type LabelledCheckboxProps = CheckboxProps &{
  field: ControllerRenderProps<FieldValues, string>;
}

export type ControlledCheckboxProps<T extends FieldValues> = CheckboxProps & {
  control: Control<T>;
  name: string;
}
