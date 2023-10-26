import lang from '@/common/lang';
import * as Yup from 'yup';
const {
  auth: {
    minimumCharactersFN, minimumCharactersLN, requiredFirstName, requiredLastName, specialCharactersFN, specialCharactersLN, emailFormat, emailValidation,
  },
} = lang;

export const addTeamMemberIndividualValidationSchema = Yup.object().shape({
  firstName: Yup.string().trim().nonNullable().required(requiredFirstName).min(2, minimumCharactersFN).matches(/^[a-zA-Z\s-]*$/, specialCharactersFN),
  lastName: Yup.string().trim().nonNullable().required(requiredLastName).min(2, minimumCharactersLN).matches(/^[a-zA-Z\s-]*$/, specialCharactersLN),
  email: Yup.string().trim().nonNullable().email(emailFormat).required(emailValidation).matches(/^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, emailFormat),
});
