import { useMemo } from 'react';
import { InputProps } from './types';

const baseInputClasses = `flex w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-300 sm:text-sm leading-tight
disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200`;
const getRingClass = (error: boolean | undefined) => error ? 'ring-2 ring-red-500' : '';
export const Input = ({
  type = 'text',
  name = 'input-name',
  id = 'input-id',
  placeholder = 'input placeholder',
  value = '',
  disabled = false,
  error = false,
  onChange = () => null,
  ...rest
}: InputProps) => {
  const computedClasses = useMemo(() => {
    return getRingClass(error);
  }, [error]);

  return (
    <input
      type={type}
      name={name}
      id={id}
      value={value}
      className={`${baseInputClasses} ${computedClasses}`}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
      {...rest}
    />
  )
}
