import * as Yup from 'yup';
import lang from '@/common/lang';
import { emailRegex } from '@/common/constants';
const {
  auth: {
    emailFormat,
  },
} = lang;

export const forgotPasswordValidationSchema = Yup.object().shape({
  email: Yup.string().trim().nonNullable().email(emailFormat).required(emailFormat).matches(emailRegex, emailFormat),
});
