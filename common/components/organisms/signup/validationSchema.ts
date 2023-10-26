import * as Yup from 'yup';
import lang from '@/common/lang';
import { emailRegex } from '@/common/constants';
const {
  auth: {
    emailFormat, passwordFormat, passwordValidationCheck, fieldRequired, consent, minimumCharactersFN, minimumCharactersLN, requiredFirstName, requiredLastName, specialCharactersFN, specialCharactersLN,
  },
} = lang;

export const signupValidationSchema = Yup.object().shape({
  firstName: Yup.string().nullable().required(requiredFirstName).min(2, minimumCharactersFN).matches(/^[a-zA-Z\s-]*$/, specialCharactersFN),
  lastName: Yup.string().nullable().required(requiredLastName).min(2, minimumCharactersLN).matches(/^[a-zA-Z\s-]*$/, specialCharactersLN),
  businessName: Yup.string().nullable(),
  email: Yup.string().matches(emailRegex, emailFormat).required(fieldRequired).nullable(),
  password: Yup.string().required(fieldRequired)
    .min(10, passwordFormat)
    .matches(/[A-Z]/, passwordFormat)
    .matches(/[a-z]/, passwordFormat)
    .matches(/[#?!@$%^&*-]/, passwordFormat)
    .matches(/[0-9]/, passwordFormat)
    .nullable(),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password')], passwordValidationCheck).required(fieldRequired),
  isAgreeTermAndConditions: Yup.boolean().oneOf([true], consent).required(consent),
});
