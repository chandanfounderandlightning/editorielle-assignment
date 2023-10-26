'use client';
import theme from '@/common/theme/theme';
import {
  useEffect, useMemo, useState,
} from 'react';
import passwordValidator from './passwordValidator';
import { InputValue } from './types';
import Typography from '../typography';
import './passwordValidation.scss';

type PasswordValidationProps = {
  passwordValue: InputValue | null,
  onValidityChange?: (validity: boolean) => void,
}

export const PasswordValidation = ({
  passwordValue, onValidityChange = () => { return; },
} : PasswordValidationProps) => {
  const passwordValidationSchema = {
    uppercase: true,
    lowercase: true,
    number: true,
    min: 10,
    specialCharacter: true,
  };

  const [passwordValidations, setPasswordValidations] = useState(passwordValidator('', passwordValidationSchema));

  useEffect(() => {
    if (passwordValue === '' || passwordValue === null) {
      const validationRules = passwordValidator('', passwordValidationSchema);
      setPasswordValidations([...validationRules]);
      return;
    }
    if (passwordValue) {
      validatePassword(passwordValue);
    }
  }, [passwordValue]);

  useEffect(() => {
    const valid = passwordValidations.every((validation) => validation.valid);
    onValidityChange(valid);
  }, [passwordValidations]);

  const validatePassword = (value: InputValue) => {
    const castedValue = typeof value === 'string' ? value : value.toString();
    const valid = passwordValidator(castedValue, passwordValidationSchema);
    setPasswordValidations([...valid]);
  };

  const getValidationMessageColor = (colorState: string) => {
    switch (colorState) {
    case 'default':
      return '#000';
    case 'valid':
      return theme.colors['green-700'];
    case 'invalid':
      return '#000';
    default:
      return '#000';
    }
  };

  const getColorState = (valid: boolean, value: string) => {
    let defaultColorState = 'default';
    if (value.length > 0) {
      defaultColorState = valid ? 'valid' : 'invalid';
    }
    return defaultColorState;
  };

  const rules = useMemo(() => {
    const content = passwordValidations.map(({
      id, valid, message, value,
    }) => {
      const color = getValidationMessageColor(getColorState(valid, value));
      return (
        <div className="rule-container" key={id}>
          <div className="rule-state" style={{ background: color }}></div>
          <div><Typography variant="helper-text-01" color={color}>{message}</Typography></div>
        </div>
      );
    });
    return content;
  }, [passwordValidations]);

  return (
    <div className="password-rules">
      {rules}
    </div>
  );
};
