'use client';
import { Controller } from 'react-hook-form';
import { ReactElement } from 'react';
import InputText from './inputText';
import type { ControlledInputTextProps } from '../types';

export const ControlledInputText = ({
  name, control, error: baseError = false, ...propsToPass
}: ControlledInputTextProps<any>): ReactElement => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field, fieldState,
      }) => {
        const { error } = fieldState;
        const isError = baseError || error?.message;
        return (
          <InputText
            {...propsToPass}
            field={field}
            error={!!isError}
            errorMessage={error?.message}
            value={field.value || ''}
          />
        );
      }}
    />
  );
};

export default ControlledInputText;
