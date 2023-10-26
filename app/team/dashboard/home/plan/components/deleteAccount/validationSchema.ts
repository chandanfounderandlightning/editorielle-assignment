import * as Yup from 'yup';

export const otherReasonValidationSchema = Yup.object().shape({
  other: Yup.string()
    .matches(/^(?!\s*$).+/, 'Spaces only are not allowed')
    .matches(/^$|.{2,}/, 'Reason should be at least 2 characters long')
    .nullable(),
});
