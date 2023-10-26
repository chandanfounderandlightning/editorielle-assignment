import * as Yup from 'yup';
import lang from '@/common/lang';
import {
  emailRegex, nameRegex,
} from '@/common/constants';
const {
  auth: {
    emailFormat, fieldRequired, minimumCharactersFN, minimumCharactersLN, requiredFirstName, requiredLastName, specialCharactersFN, specialCharactersLN,
  },
} = lang;

export const userInformationValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .nullable()
    .required(requiredFirstName)
    .min(2, minimumCharactersFN)
    .matches(nameRegex, specialCharactersFN),
  lastName: Yup.string()
    .nullable()
    .required(requiredLastName)
    .min(2, minimumCharactersLN)
    .matches(nameRegex, specialCharactersLN),
  email: Yup.string()
    .matches(emailRegex, emailFormat)
    .required(fieldRequired)
    .nullable(),
});
