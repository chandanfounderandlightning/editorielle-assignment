'use client';
import {
  useForm, Controller, SubmitHandler,
} from 'react-hook-form';
import { ContentLayout } from '@/common/designSystem';
import { Typography } from "@/common/components/atoms/typography";
import lang from '@/common/lang';
import {
  Input, useAlert,
} from "@/common/components/molecules";
import { Button } from "@/common/components/atoms";
import {
  EmailVerificationDTO, ResendOtpDTO,
} from '@/app/account/types';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useRouter, useSearchParams,
} from 'next/navigation';
import useSWRMutation from 'swr/mutation';
import { team } from "@/common/utils/network/endpoints";
import { fetcher } from '@/common/utils/network/baseFetcher';
import {
  signIn, useSession,
} from 'next-auth/react';
import { emailVerificationValidationSchema } from './validationSchema';

const { signUpVerification: signUpVerificationCopy } = lang;
const {
  verifyEmailDashboard, resendEmailVerificationCode,
} = team;

const EmailVerification = () => {
  const resolver = { resolver: yupResolver(emailVerificationValidationSchema) };
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const {
    handleSubmit,
    control,
  } = useForm<EmailVerificationDTO>({
    ...resolver,
    mode: 'onSubmit',
  });

  const {
    data: session,
  } = useSession();

  const {
    setAlertState, Alert,
  } = useAlert();

  const router = useRouter();

  const emailVerify = useSWRMutation(verifyEmailDashboard, fetcher<HeadersInit, EmailVerificationDTO>);
  const {
    trigger, isMutating: isLoading,
  } = emailVerify;

  const resendCode = useSWRMutation(resendEmailVerificationCode, fetcher<HeadersInit, ResendOtpDTO>);
  const { trigger: resendTrigger } = resendCode;

  const onSubmit: SubmitHandler<EmailVerificationDTO> = async (data) => {
    trigger({
      method: 'POST',
      body: data,
      headers: {
        Authorization: `Bearer ${session?.token}`,
      },
    })
      .then(async () => {
        await signIn('credentials', {
          email,
          token: session?.token,
          firstName: session?.user?.firstName,
          lastName: session?.user?.lastName,
          businessName: session?.user?.businessName || '',
          id: session?.user?.id,
          redirect: false,
        }).then(() => {
          router.push('/team/dashboard/home/general');
        });
      }).catch((error) => {
        setAlertState({
          type: 'error',
          title: '',
          content: error?.message,
          show: true,
        });
      });
  };

  const onResendCode = () => {
    if (email === null) {
      return;
    }
    resendTrigger({
      method: 'PUT',
      body: {
        email,
      },
      headers: {
        Authorization: `Bearer ${session?.token}`,
      },
    })
      .then(() => {
        setAlertState({
          type: 'success',
          title: '',
          content: 'Code sent!',
          show: true,
        });
      }).catch((error) => {
        setAlertState({
          type: 'error',
          title: '',
          content: error?.message,
          show: true,
        });
      });
  };

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
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
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
              disabled={isLoading}
              onClick={onResendCode}
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

export default EmailVerification;
