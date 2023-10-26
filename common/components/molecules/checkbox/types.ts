import { ReactNode } from 'react';
export type CheckboxProps = {
  /** Whether the checkbox is checked or not */
  checked: boolean;
  /** The id of the checkbox */
  id?: string;
  /** The name of the checkbox */
  name?: string;
  /** The label of the checkbox */
  label: ReactNode | string;
  /** The error state of the checkbox */
  error?: boolean;
  /** The error message of the checkbox */
  errorMessage?: string;
}
