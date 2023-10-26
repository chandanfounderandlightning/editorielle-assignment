import * as Yup from 'yup';
import lang from '@/common/lang';
import { emailRegex } from '@/common/constants';
const {
  auth: {
    emailFormat, passwordFormat,
  },
} = lang;

export const signInValidationSchema = Yup.object().shape({
  email: Yup.string().matches(emailRegex, emailFormat).required(emailFormat),
  password: Yup.string().required(passwordFormat)
    .min(10, passwordFormat)
    .matches(/[A-Z]/, passwordFormat)
    .matches(/[a-z]/, passwordFormat)
    .matches(/[#?!@$%^&*-]/, passwordFormat)
    .matches(/[0-9]/, passwordFormat),
});
