import {
  checkLowerCaseLetter, checkNumbers, checkSpecialCharacter, checkUpperCaseLetter,
} from '@/common/utils/regex';
import lang from '@/common/lang';
import { ValidationType } from './types';

const { auth: { password } } = lang;

export const passwordValidator = (input: string, validation: ValidationType) => {
  const isLengthCorrect = (length: number) => input.length >= length;
  const isHasUpperCaseLetter = checkUpperCaseLetter.test(input);
  const isHasLowerCaseLetter = checkLowerCaseLetter.test(input);
  const isHasSpecialLetter = checkSpecialCharacter.test(input);
  const isNumber = checkNumbers.test(input);
  const validations = [];

  if (validation.min) {
    validations.push(
      {
        id: validations.length + 1,
        valid: isLengthCorrect(validation.min),
        message: password.length,
        value: input,
      },
    );
  }

  if (validation.lowercase) {
    validations.push(
      {
        id: validations.length + 1,
        valid: isHasLowerCaseLetter,
        message: password.lowercase,
        value: input,
      },
    );
  }

  if (validation.uppercase) {
    validations.push(
      {
        id: validations.length + 1,
        valid: isHasUpperCaseLetter,
        message: password.uppercase,
        value: input,
      },
    );
  }

  if (validation.number) {
    validations.push(
      {
        id: validations.length + 1,
        valid: isNumber,
        message: password.number,
        value: input,
      },
    );
  }

  if (validation.specialCharacter) {
    validations.push(
      {
        id: validations.length + 1,
        valid: isHasSpecialLetter,
        message: password.special,
        value: input,
      },
    );
  }

  return validations;
};
export default passwordValidator;
