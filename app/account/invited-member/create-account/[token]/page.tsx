'use client';
import { Controller } from 'react-hook-form';
import { Loader } from '@/common/designSystem';
import { Checkbox } from '@/common/components/molecules';
import { Input } from '@/common/components/molecules';
import { Typography } from "@/common/components/atoms/typography";
import { Button } from "@/common/components/atoms";
import { useInvitedmemberCreateAccount } from '../useInvitedMemberCreateAccount';

const InvitedMemberCreateAccount = ({ params }: any) => {
  const {
    showValidation,
    validatorRef,
    isLoading,
    handleSubmit,
    onSubmit,
    control,
    invitedMemberCreateAccount,
    passwordValidations,
    Alert,
    router,
    email,
    name,
  } = useInvitedmemberCreateAccount(params);

  if (!name && !email) {
    router.push('/account/signin');
    return;
  }

  return (
    <div className="py-12 px-6 sm:py-24 sm:px-8 h-screen">
      {isLoading && <Loader />}
      <div className="flex items-center flex-col">
        <div className="w-full sm:w-96 flex items-center flex-col">
          <div className="mt-10 mb-10">
            <Typography variant="heading-md" classes="font-bold text-2xl text-grey-900 text-center">
              {invitedMemberCreateAccount.headerLine1 + ' ' + name?.[0].toUpperCase() + name?.substring(1)}!<br />
              {invitedMemberCreateAccount.headerLine2}
            </Typography>
          </div>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
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
                      labelText={invitedMemberCreateAccount.password}
                      error={!!error}
                      errorMessage={invitedMemberCreateAccount.errorPassword}
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
                      labelText={invitedMemberCreateAccount.confirmPassword}
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
                            {invitedMemberCreateAccount.iAgree}
                          </Typography>
                          {' '}
                          <a
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-rose-300 hover:text-rose-400"
                          >
                            {invitedMemberCreateAccount.terms}
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
                {invitedMemberCreateAccount.submitButtonLabel}
              </Button>
            </div>
          </form>
        </div>
        <div className="w-full flex flex-col items-center mt-8">
          <div className='pb-20'>
            <Typography variant="span-sm" classes="text-grey-500">
              {invitedMemberCreateAccount.accountExists}
            </Typography>
            {' '}
            <a href="/team/account/signin" className="text-sm text-rose-300 hover:text-rose-400">
              {invitedMemberCreateAccount.login}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitedMemberCreateAccount;
