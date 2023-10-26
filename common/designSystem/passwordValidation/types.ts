type RulesProp = {
  id: number;
  valid: boolean;
  message: string;
  value: string;
}

export type PasswordValidationRulesProps = {
 messages: RulesProp[]
}

export type ValidationStyleProps = {
  colorState: string;
}

export type ValidationType = {
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  min: number;
  specialCharacter: boolean
}

export type InputValue = string | number | readonly string[];
