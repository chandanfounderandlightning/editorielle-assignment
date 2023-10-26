import * as Yup from 'yup';
import lang from '@/common/lang';

const {
  auth: {
    passwordFormat, passwordValidationCheck, fieldRequired,
  },
} = lang;

export const resetPasswordValidationSchema = Yup.object().shape({
  password: Yup.string().required(passwordFormat)
    .min(10, passwordFormat)
    .matches(/[A-Z]/, passwordFormat)
    .matches(/[a-z]/, passwordFormat)
    .matches(/[#?!@$%^&*-]/, passwordFormat)
    .matches(/[0-9]/, passwordFormat),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password')], passwordValidationCheck)
    .required(fieldRequired),
});
