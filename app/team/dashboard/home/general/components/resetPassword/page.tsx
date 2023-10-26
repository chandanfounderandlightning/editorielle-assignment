'use client';
import { Button } from "@/common/components/atoms";
import { Input } from "@/common/components/molecules";
import { Controller } from "react-hook-form";
import lang from "@/common/lang";

import { useResetPassword } from "./useResetPassword";
import { Loader } from "@/common/designSystem";
import { useSignUp } from "@/common/components/organisms/signup/useSignUp";

const { generalDashboardHomeTeam } = lang;

const ResetPasswordGeneral = () => {
  const {
    showValidation,
    validatorRef,
  } = useSignUp("team");

  const {
    onSubmit,
    handleSubmit,
    control,
    passwordValidations,
    Alert,
    saveButtonClasses,
    isDisabled,
    isLoading,
  } = useResetPassword();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isLoading && <Loader />}
      <div className="p-8 border rounded-t-lg">
        <div className="flex flex-col">
          <div className="pb-3">
            <Controller
              control={control}
              name="oldPassword"
              render={({
                field, fieldState,
              }) => {
                const { error } = fieldState;
                return (
                  <Input
                    width="w-full"
                    id={field.name}
                    type="password"
                    data-testid="currentPassword"
                    data-cy="oldPassword"
                    labelText={generalDashboardHomeTeam.currentPassword}
                    error={!!error}
                    errorMessage={error?.message}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                );
              }}
            />
          </div>
          <div className="pt-4 pb-3">
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
                    data-testid="newPassword"
                    data-cy="newPassword"
                    labelText={generalDashboardHomeTeam.newPassword}
                    error={!!error}
                    errorMessage={error?.message}
                    onFocus={showValidation}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
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
          <div className="pt-4">
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
                    data-testid="confirmPassword"
                    data-cy="confirmPassword"
                    labelText={generalDashboardHomeTeam.confirmPassword}
                    error={!!error}
                    errorMessage={error?.message}
                    {...field}
                  />
                );
              }}
            />
          </div>
        </div>

      </div>
      <div className="px-8 py-4 border rounded-b-lg">
        <Button
          type="submit"
          variant="solid"
          size="sm"
          data-testid="changePassword"
          disabled={isDisabled}
          className={saveButtonClasses}
        >
          {generalDashboardHomeTeam.changePassword}
        </Button>
        <Alert />
      </div>
    </form>
  );
};

export default ResetPasswordGeneral;