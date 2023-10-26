'use client';
import { Input } from '@/common/components/molecules';
import { Controller } from 'react-hook-form';
import { InputFieldParams } from './types';

export const InputFields = ({
  control,
  name,
  type,
  dataCy,
  labelText,
  placeholder,
  min,
  disabled,
  required,
}: InputFieldParams) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field, fieldState,
      }) => {
        const { error } = fieldState;
        return (
          <Input
            width="w-full"
            id={field.name}
            type={type}
            data-cy={dataCy}
            labelText={labelText}
            error={!!error}
            errorMessage={error?.message}
            placeholder={placeholder}
            min={min}
            disabled={disabled}
            {...field}
            onChange={(e) => {
              field.onChange(e);
            }}
          />
        );
      }}
    />
  );
};
