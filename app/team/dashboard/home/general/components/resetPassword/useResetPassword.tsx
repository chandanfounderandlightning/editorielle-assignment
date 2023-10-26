import type { ResetPasswordGeneral } from "@/app/account/types";
import {
  SubmitHandler, useForm,
} from "react-hook-form";
import { updatePassword } from "@/common/utils/network/endpoints";
import { fetcher } from '@/common/utils/network/baseFetcher';
import useSWRMutation from "swr/mutation";
import { parseObjectPropertiesToSnakeCase } from "@/common/utils/helpers";
import { useSession } from "next-auth/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordValidationSchema } from "./validationSchema";
import {
  useEffect, useMemo, useState, 
} from "react";
import { PasswordValidation } from "@/common/designSystem";
import { useAlert } from "@/common/components/molecules";
import { useSignUp } from "@/common/components/organisms/signup/useSignUp";

export const useResetPassword = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const saveButtonClasses = isDisabled
    ? 'bg-grey-50 px-3 py-1.5 text-grey-500 font-bold text-sm border border-grey-200 rounded-md'
    : 'bg-rose-200 px-3 py-1.5 text-grey-900 font-bold text-sm border border-rose-200 rounded-md';

  const { hideValidation } = useSignUp("team");
  const updatePasswordInfo = useSWRMutation(updatePassword, fetcher<HeadersInit, ResetPasswordGeneral>);
  const {
    trigger, isMutating: isLoading, 
  } = updatePasswordInfo;
  const {
    data: session,
  } = useSession();
  const resolver = { resolver: yupResolver(resetPasswordValidationSchema) };
  const {
    handleSubmit,
    control,
    watch,
    formState: { isDirty },
  } = useForm<ResetPasswordGeneral>({
    ...resolver,
    mode: 'onSubmit',
  });
  const password = watch('password');
  const passwordValidations = useMemo(() => {
    return (
      <PasswordValidation
        passwordValue={password}
        onValidityChange={() => {
          return;
        }}
      />
    );
  }, [password]);

  useEffect(() => {
    const passwordElement = document.getElementById('password');
    passwordElement?.addEventListener('focusout', hideValidation);
    return () => {
      passwordElement?.removeEventListener('focusout', hideValidation);
    };
  }, []);

  useEffect(() => {
    if (isDirty) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [isDirty]);

  const {
    setAlertState, Alert,
  } = useAlert();

  const onSubmit: SubmitHandler<ResetPasswordGeneral> = async (data) => {
    trigger({
      method: 'PUT',
      body: parseObjectPropertiesToSnakeCase(data),
      headers: {
        Authorization: `Bearer ${session?.token}`,
      },
    })
      .then((res:any) => {
        setIsDisabled(true);
        setAlertState({
          type: 'success',
          title: '',
          content: res.response.message,
          show: true,
        });
        window.location.reload();
      }).catch((error) => {
        setAlertState({
          type: 'error',
          title: '',
          content: error.message,
          show: true,
        });
      });
  };
  return {
    onSubmit,
    handleSubmit,
    control,
    passwordValidations,
    Alert,
    saveButtonClasses,
    isDisabled,
    isLoading,
  };
}

