import { InputHTMLAttributes } from 'react';
import {
  Control, ControllerRenderProps, FieldValues,
} from 'react-hook-form';

export type InputTextProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  labelText: string;
  id?: string;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  field?: ControllerRenderProps<FieldValues, string>;
  onlyAlphabets?: boolean;
}

export type ControlledInputTextProps<T extends FieldValues> = InputTextProps & {
  control: Control<T>;
  name: string;
  pattern?:string;
}
