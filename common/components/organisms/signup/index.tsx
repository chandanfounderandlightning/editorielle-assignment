'use client';
import { Controller } from 'react-hook-form';
import { Loader } from '@/common/designSystem';
import { Checkbox } from '@/common/components/molecules';
import { Input } from '@/common/components/molecules';
import { Typography } from "@/common/components/atoms/typography";
import { Button } from "@/common/components/atoms";
import { useSignUp } from './useSignUp';

const SignUp = ({ mod }: any) => {
  const {
    showValidation,
    validatorRef,
    isLoading,
    handleSubmit,
    onSubmit,
    control,
    signUpCopy,
    passwordValidations,
    Alert,
  } = useSignUp(mod);

  return (
    <div className="py-6 lg:py-12 px-6 sm:px-8 h-screen">
      {isLoading && <Loader />}
      <div className="flex items-center flex-col">
        <div className="w-full sm:w-96 flex items-center flex-col">
          <div className="my-4 lg:my-10">
            <Typography variant="heading-md" classes="font-semibold text-grey-900">
              {signUpCopy.header}
            </Typography>
          </div>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-wrap sm:justify-between">
              <Controller
                control={control}
                name="firstName"
                render={({
                  field, fieldState,
                }) => {
                  const { error } = fieldState;
                  return (
                    <Input
                      width="w-full sm:w-[47%]"
                      id={field.name}
                      type="text"
                      data-cy="first-name"
                      labelText={signUpCopy.firstName}
                      error={!!error}
                      errorMessage={error?.message}
                      {...field}
                    />
                  );
                }}
              />
              <Controller
                control={control}
                name="lastName"
                render={({
                  field, fieldState,
                }) => {
                  const { error } = fieldState;
                  return (
                    <Input
                      width="w-full mt-5 sm:w-[47%] sm:mt-0"
                      id={field.name}
                      type="text"
                      data-cy="last-name"
                      labelText={signUpCopy.lastName}
                      error={!!error}
                      errorMessage={error?.message}
                      {...field}
                    />
                  );
                }}
              />
            </div>
            <div className="flex mt-5">
              <Controller
                control={control}
                name="businessName"
                render={({
                  field, fieldState,
                }) => {
                  const { error } = fieldState;
                  return (
                    <Input
                      width="w-full"
                      id={field.name}
                      type="text"
                      data-cy="business-name"
                      optionalText='Optional'
                      labelText={signUpCopy.businessName}
                      error={!!error}
                      errorMessage={error?.message}
                      {...field}
                    />
                  );
                }}
              />
            </div>
            <div className="flex mt-5">
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
                      labelText={signUpCopy.email}
                      error={!!error}
                      errorMessage={signUpCopy.errorEmail}
                      {...field}
                    />
                  );
                }}
              />
            </div>
            <div className="flex mt-5">
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
                      labelText={signUpCopy.password}
                      error={!!error}
                      errorMessage={signUpCopy.errorPassword}
                      onFocus={showValidation}
                      {...field}
                    />
                  );
                }}
              />
            </div>
            <div
              ref={validatorRef}
              className="h-0 overflow-hidden transition-all duration-300 ease-in-out"
            >
              {passwordValidations}
            </div>
            <div className="flex mt-5">
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
                      labelText={signUpCopy.confirmPassword}
                      error={!!error}
                      errorMessage={error?.message}
                      {...field}
                    />
                  );
                }}
              />
            </div>
            <Alert />
            <div className="flex mt-6">
              <Controller
                name="isAgreeTermAndConditions"
                control={control}
                render={({
                  field, fieldState,
                }) => {
                  const { error } = fieldState;
                  return (
                    <Checkbox
                      error={!!error}
                      errorMessage={error?.message}
                      checked={!!field.value}
                      id={field.name}
                      data-cy="terms-and-conditions"
                      {...field}
                      label={
                        <div className="inline-block">
                          <Typography variant="span-sm" classes="text-grey-500">
                            {signUpCopy.iAgree}
                          </Typography>
                          {' '}
                          <a
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-rose-300 hover:text-rose-400"
                          >
                            {signUpCopy.terms}
                          </a>
                        </div>
                      }
                    />
                  );
                }}
              />
            </div>
            <div className="mt-6">
              <Button
                type="submit"
                variant="solid"
                size="sm"
                data-cy="submit-button"
                width="w-full"
              >
                {signUpCopy.submitButtonLabel}
              </Button>
            </div>

          </form>

        </div>
        <div className="w-full flex flex-col items-center mt-8">
          <div className='pb-20'>
            <Typography variant="span-sm" classes="text-grey-500">
              {signUpCopy.accountExists}
            </Typography>
            {' '}
            <a href="/account/signin" className="text-sm text-rose-300 hover:text-rose-400">
              {signUpCopy.login}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
