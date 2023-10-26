'use client';
import {
  useForm, Controller,
} from 'react-hook-form';
import { ContentLayout } from '@/common/designSystem';
import { Typography } from "@/common/components/atoms/typography";
import lang from '@/common/lang';
import { Input } from "@/common/components/molecules";
import { Button } from "@/common/components/atoms";
import { SignUpVerificationDTO } from '@/app/account/types';
import { useVerificationSignUp } from './useVerificationSignUp'
import { signUpVerificationValidationSchema } from './validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSearchParams } from 'next/navigation';

const { signUpVerification: signUpVerificationCopy } = lang;

const SignupVerification = ({ mod }: any) => {
  const resolver = { resolver: yupResolver(signUpVerificationValidationSchema) };
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const {
    useResendOtp,
    useSubmitHandler,
    Alert,
    isLoading,
  } = useVerificationSignUp(mod);

  const {
    handleResendCode,
  } = useResendOtp();
  const {
    onSubmitData,
  } = useSubmitHandler();

  const {
    handleSubmit,
    formState: { isValid },
    control,
  } = useForm<SignUpVerificationDTO>({
    ...resolver,
    mode: 'onSubmit',
  });

  return (
    <ContentLayout>
      <div className="flex items-center flex-col">
        <div className="w-full sm:w-96 flex items-center flex-col">
          <div className="mb-12">
            <Typography variant="heading-md" classes="text-center font-semibold text-grey-900">
              {signUpVerificationCopy.header}
            </Typography>
            <Typography variant="body-sm" classes="text-center font-medium text-grey-700 mt-3">
              {signUpVerificationCopy.instructions + email}
            </Typography>
          </div>
          <form className="w-full" onSubmit={handleSubmit(onSubmitData)}>
            <Controller
              control={control}
              name="otp"
              render={({
                field, fieldState,
              }) => {
                const { error } = fieldState;
                return (
                  <Input
                    width="w-full"
                    id={field.name}
                    type="text"
                    data-cy="verification-code"
                    labelText={signUpVerificationCopy.code}
                    error={!!error}
                    errorMessage={error?.message}
                    {...field}
                    autoFocus
                  />)}
              }
            />
            <div className="mt-8">
              <Button
                type="submit"
                variant="solid"
                size="sm"
                data-cy="submit-button"
                width="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : signUpVerificationCopy.verifyAccount}
              </Button>
            </div>
          </form>
          <div className="w-full mt-9 text-center">
            <Typography variant="span-sm" classes="text-grey-500" data-cy="no-code">
              {signUpVerificationCopy.noCode}
            </Typography>
            {' '}
            <Button
              variant="solid"
              size="sm"
              className={isLoading ? "text-sm text-grey-400" : "text-sm text-rose-300 hover:text-rose-400"}
              data-cy="resend-code"
              onClick={handleResendCode}
              disabled={isLoading}
            >
              {signUpVerificationCopy.resendCode}
            </Button>
            <Alert />
          </div>
        </div>
      </div>
    </ContentLayout>
  )
}

export default SignupVerification;
