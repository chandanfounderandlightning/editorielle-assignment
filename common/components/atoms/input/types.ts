import React, { InputHTMLAttributes } from 'react';
export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  /** The id of the input. */
  id: string;
  /** The name of the checkbox */
  name: string;
  /** The value of the input */
  value: string;
  /** Whether the checkbox is disabled or not */
  disabled?: boolean;
  /** The type of the input */
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'date';
  /** The placeholder for the input */
  placeholder?: string;
  /** The error state of the input */
  error?: boolean | undefined;
  /** The onChange handler of the input */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** The onFocus handler of the input */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** The data-cy attribute of the input */
  'data-cy'?: string;
}
