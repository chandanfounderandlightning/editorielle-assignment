import lang from '@/common/lang';
import * as Yup from 'yup';

const { signUpVerification: signUpVerificationCopy } = lang;

export const emailVerificationValidationSchema = Yup.object().shape({
  otp: Yup.string()
    .nullable()
    .trim()
    .required(signUpVerificationCopy.requiredText)
    .matches(/^[0-9]+$/, signUpVerificationCopy.numberValidation)
    .min(6, signUpVerificationCopy.lengthValidation)
    .max(6, signUpVerificationCopy.lengthValidation),
});