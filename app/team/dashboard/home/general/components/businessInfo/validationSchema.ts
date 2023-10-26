import lang from '@/common/lang';
import * as Yup from 'yup';

const {
  auth: { minimumCharactersBN },
} = lang;

export const businessInformationValidationSchema = Yup.object().shape({
  businessName: Yup.string()
    .matches(/^$|.{2,}/, minimumCharactersBN)
    .nullable(),
});
