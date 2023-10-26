import * as Yup from 'yup';
import lang from '@/common/lang';
const {
  auth: {
    passwordFormat, passwordValidationCheck, fieldRequired,
  },
} = lang;

export const resetPasswordValidationSchema = Yup.object().shape({
  oldPassword: Yup.string().required(fieldRequired)
    .min(10, passwordFormat)
    .matches(/[A-Z]/, passwordFormat)
    .matches(/[a-z]/, passwordFormat)
    .matches(/[#?!@$%^&*-]/, passwordFormat)
    .matches(/[0-9]/, passwordFormat)
    .nullable(),
  password: Yup.string().required(fieldRequired)
    .min(10, passwordFormat)
    .matches(/[A-Z]/, passwordFormat)
    .matches(/[a-z]/, passwordFormat)
    .matches(/[#?!@$%^&*-]/, passwordFormat)
    .matches(/[0-9]/, passwordFormat)
    .nullable(),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password')], passwordValidationCheck).required(fieldRequired),
});
