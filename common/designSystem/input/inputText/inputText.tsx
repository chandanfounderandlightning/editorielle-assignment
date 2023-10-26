'use client';
import './inputText.scss';
import { useState } from 'react';
import { InputTextProps } from '@/common/designSystem/input/types';
import { theme } from '@/common/theme/theme';
import Typography from '../../typography';
import {
  ShowPasswordIcon, HidePasswordIcon,
} from "@/common/components/icons";

export const InputText = ({
  labelText,
  id,
  type,
  error = false,
  errorMessage = '',
  helperText = '',
  field,
  onlyAlphabets = false,
  ...rest
}: InputTextProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState(type);

  const handleShowPassword = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    setShowPassword(true);
    setInputType('text');
    e.stopPropagation();
    e.preventDefault();
  };
  const handleHidePassword = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    setShowPassword(false);
    setInputType('password');
    e.stopPropagation();
    e.preventDefault();
  };
  const acceptOnlyAlphabets = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (onlyAlphabets) {
      const { code } = e;
      if (code.includes('Key')
      || code === 'Enter'
      || code === 'Backspace'
      || code === 'Space'
      || code === 'Tab'
      || code.includes('Arrow')
      ) {
        return;
      }
      e.preventDefault();
    }
  };

  return (
    <label className="custom-label" htmlFor={id}>
      <Typography variant="heading-compact-01" fontWeight={450}>
        {labelText}
      </Typography>
      <div className="custom-input-container">
        <input
          id={id}
          className={`custom-input ${type === 'password' ? 'password-type' : ''}`}
          type={inputType}
          onKeyDown={acceptOnlyAlphabets}
          {...field}
          {...rest}
        />
        { type === 'password' && !showPassword && <ShowPasswordIcon className="eye-icon-hidden" onClick={(e) => handleShowPassword(e)} /> }
        { type === 'password' && showPassword && <HidePasswordIcon className="eye-icon-hidden" onClick={(e) => handleHidePassword(e)} /> }
        {!error && helperText && (
          <Typography className="helper-text" variant="helper-text-01" color={theme.colors['grey-900']}>
            {helperText}
          </Typography>
        )}
        {error && errorMessage && (
          <Typography className="helper-text" variant="helper-text-01" color={theme.colors['red-600']} data-cy={`${field?.name}-error`}>
            {errorMessage}
          </Typography>
        )}
      </div>
    </label>
  );
};

export default InputText;
