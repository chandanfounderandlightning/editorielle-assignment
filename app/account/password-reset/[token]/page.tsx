'use client';
import { Controller } from 'react-hook-form';
import {
  ContentLayout, Loader,
} from '@/common/designSystem';
import { Button } from "@/common/components/atoms";
import { Typography } from "@/common/components/atoms/typography";
import { Input } from "@/common/components/molecules";
import { usePasswordReset } from '../usePasswordReset';

const ResetPassword = ({
  params, searchParams,
}: {params: {token: string}, searchParams: {email: string}}) => {
  const { token } = params;
  const { email } = searchParams;
  const {
    control, handleSubmit, Alert, resetPasswordCopy, isLoading, isSuccess, onSubmit, showValidation, validatorRef, passwordValidations, isValid, passwordsMatch,
  } = usePasswordReset(token, email);

  return (
    <ContentLayout>
      {isLoading && <Loader />}
      <div className="flex items-center flex-col mt-0 md:mt-[15vh] lg:mt-[15vh]">
        <div className="w-full sm:w-96 flex items-center flex-col">
          <div className="mb-12">
            <Typography variant="heading-md" classes="text-2xl text-center font-bold text-grey-900">
              {isSuccess ? resetPasswordCopy.headerSuccess : resetPasswordCopy.header}
            </Typography>
            <Typography variant="body-sm" classes="text-center font-medium text-grey-500 mt-2">
              {isSuccess ? resetPasswordCopy.successMessage : resetPasswordCopy.instruction}
            </Typography>
          </div>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
              <Controller
                control={control}
                name="password"
                render={({
                  field, fieldState,
                }) => {
                  const { error } = fieldState;
                  return (
                    <Input
                      width="w-full"
                      id={field.name}
                      type="password"
                      data-cy="password"
                      labelText={resetPasswordCopy.newPassword}
                      error={!!error}
                      errorMessage={error?.message}
                      onFocus={showValidation}
                      {...field}
                    />)}
                }
              />
            </div>
            <div
              ref={validatorRef}
              className="h-0 overflow-hidden transition-all duration-300 ease-in-out"
            >
              {passwordValidations}
            </div>
            <div className='mt-10'>
              <Controller
                control={control}
                name="passwordConfirmation"
                render={({
                  field, fieldState,
                }) => {
                  const { error } = fieldState;
                  return (
                    <Input
                      width="w-full"
                      id={field.name}
                      type="password"
                      data-cy="password-confirmation"
                      labelText={resetPasswordCopy.confirmPassword}
                      error={!!error}
                      errorMessage={error?.message}
                      {...field}
                    />)}
                }
              />
            </div>
            <Alert />
            <div className="mt-8 pb-8 lg:pb-0">
              <Button
                type="submit"
                variant="solid"
                size="sm"
                data-cy="reset-password"
                width="w-full"
              >
                {resetPasswordCopy.resetPasswordCTA}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ContentLayout>
  );
};

export default ResetPassword;
