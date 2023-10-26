'use client';
import { Controller } from 'react-hook-form';
import {
  ContentLayout, Loader,
} from '@/common/designSystem';
import { Input } from "@/common/components/molecules";
import { Typography } from "@/common/components/atoms/typography";
import { Button } from "@/common/components/atoms/button";
import { useForgotPassword } from './useForgotPassword';

const ForgotPassword = () => {
  const {
    onResendPassword, Alert, forgotPasswordCopy, onSubmit, isLoading, handleSubmit, control, resendButtonState, resendButtonClass,
  } = useForgotPassword();

  return (
    <ContentLayout>
      {isLoading && <Loader />}
      <div className="flex items-center flex-col mt-0 md:mt-[15vh] lg:mt-[15vh]">
        <div className="w-full sm:w-96 flex items-center flex-col">
          <div className="mb-12">
            <Typography variant="heading-md" classes="text-2xl text-center font-bold text-grey-900">
              {forgotPasswordCopy.resetPassword}
            </Typography>
            <Typography variant="body-sm" classes="text-center font-medium text-grey-700 mt-3">
              {forgotPasswordCopy.instructions}
            </Typography>
          </div>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Controller
              control={control}
              name="email"
              render={({
                field, fieldState,
              }) => {
                const { error } = fieldState;
                return (
                  <Input
                    width="w-full"
                    id={field.name}
                    type="email"
                    data-cy="email"
                    labelText={forgotPasswordCopy.emailAddress}
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
                data-cy="send-link"
                width="w-full"
              >
                {forgotPasswordCopy.sendEmail}
              </Button>
            </div>
          </form>
          <div className="w-full mt-9 text-center">
            <Typography variant="span-sm" classes="text-grey-500" data-cy="no-email">
              {forgotPasswordCopy.noEmail}
            </Typography>
            {' '}
            <Button
              type='button'
              variant="solid"
              size="sm"
              data-cy="resend"
              disabled={resendButtonState}
              className={resendButtonClass}
              onClick={onResendPassword}
            >
              {forgotPasswordCopy.resend}
            </Button>
            <div className='text-left'>
              <Alert />
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default ForgotPassword;
