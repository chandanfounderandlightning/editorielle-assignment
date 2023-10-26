import { useMemo, ReactNode } from 'react';
import { Input as DefaultInput } from '../../atoms/input'
import { MoleculeInputProps } from "@/common/components/molecules/input/types";

const getOptionalTextPlacingClass = (optionalText: string | ReactNode | undefined, labelText: string | undefined) => {
  return optionalText && !labelText ? 'justify-end' : 'justify-between';
}

export const Input = ({
  id = 'input-id',
  name = 'input-name',
  type = 'text',
  value = '',
  labelText = '',
  optionalText = '',
  width = 'w-60',
  disabled = false,
  error = false,
  errorMessage = '',
  placeholder = '',
  autoFocus = false,
  onChange = () => null,
  ...rest
}: MoleculeInputProps) => {
  const inputProps = {
    id,
    name,
    type,
    value,
    onChange,
    disabled,
    error,
    placeholder,
    autoFocus,
    ...rest,
  }
  const optionalTextPlacingClass = useMemo(() => {
    return getOptionalTextPlacingClass(optionalText, labelText)
  }, [optionalText, labelText]);

  if (!labelText && !optionalText) return (
    <>
      <div className={width}>
        <DefaultInput {...inputProps} />
      </div>
      {error && (
        <p className="mt-0.5 text-sm text-red-600" data-cy={`${name}-error`}>
          {errorMessage}
        </p>
      )}
    </>
  );

  return (
    <div className={width}>
      <div className={`flex ${optionalTextPlacingClass}`}>
        {labelText && (
          <label htmlFor={id} className="block text-sm font-medium text-gray-900">
            {labelText}
          </label>
        )}
        {optionalText && (
          <span className="text-sm text-gray-500">
            {optionalText}
          </span>
        )}
      </div>
      <div className="mt-2">
        <DefaultInput {...inputProps} />
      </div>
      {error && (
        <p className="mt-0.5 text-sm text-red-600" data-cy={`${name}-error`}>
          {errorMessage}
        </p>
      )}
    </div>
  )
}
