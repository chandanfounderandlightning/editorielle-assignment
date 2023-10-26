import { fetcher } from "@/common/utils/network/baseFetcher";
import { resetPasswordUrl } from "@/common/utils/network/endpoints";
import { successFEUrl } from "@/common/utils/network/appRoutes";
import {
  useEffect, useMemo, useRef, useState,
} from "react";
import { ResetPasswordDTO } from "../types";
import useSWRMutation from "swr/mutation";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordValidationSchema } from "./validationSchema";
import {
  SubmitHandler, useForm,
} from "react-hook-form";
import { useAlert } from "@/common/components/molecules";
import { PasswordValidation } from "@/common/designSystem";
import { parseObjectPropertiesToSnakeCase } from "@/common/utils/helpers";
import { errorHandler } from "@/common/utils/network/errorHandler";
import lang from "@/common/lang";
import { useRouter } from "next/navigation";

export const usePasswordReset = (token: string, email: string) => {
  const { resetPassword: resetPasswordCopy } = lang;
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const router = useRouter();

  const resetPasswordOnBE = useSWRMutation(resetPasswordUrl, fetcher<never, ResetPasswordDTO>);
  const {
    trigger, isMutating: isLoading,
  } = resetPasswordOnBE;

  const resolver = { resolver: yupResolver(resetPasswordValidationSchema) };
  const {
    handleSubmit, control, formState: { isValid }, watch,
  } = useForm<ResetPasswordDTO>({
    ...resolver,
    mode: 'onBlur',
  });

  const {
    setAlertState, Alert,
  } = useAlert();

  const password = watch('password');
  const passwordConfirmation = watch('passwordConfirmation');

  const validatorRef = useRef<HTMLDivElement | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

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
    return (() => {
      passwordElement?.removeEventListener('focusout', hideValidation);
    });
  }, []);

  const hideValidation = () => {
    if (validatorRef.current) {
      validatorRef.current.classList.remove('h-20', 'px-2', 'mt-3');
      validatorRef.current.classList.add('h-0');
    }
  };

  const showValidation = () => {
    if (validatorRef.current) {
      validatorRef.current.classList.remove('h-0');
      validatorRef.current.classList.add('h-20', 'px-2', 'mt-3');
    }
  };

  useEffect(() => {
    setPasswordsMatch(password === passwordConfirmation);
  }, [password, passwordConfirmation]);

  const onSubmit: SubmitHandler<ResetPasswordDTO> = (data) => {
    const body = parseObjectPropertiesToSnakeCase({
      ...data,
      token,
      email,
    });

    trigger({
      body,
      method: 'POST',
    })
      .then(() => {
        setAlertState({
          type: 'success',
          title: '',
          content: resetPasswordCopy.successMessage,
          show: true,
        });
        router.push(successFEUrl);
      })
      .catch((error) => {
        errorHandler(error);
        setAlertState({
          type: 'error',
          title: '',
          content: error?.message || resetPasswordCopy.error,
          show: true,
        });
      })
  };

  return {
    passwordsMatch,
    handleSubmit,
    control,
    Alert,
    resetPasswordCopy,
    isLoading,
    isSuccess,
    onSubmit,
    showValidation,
    validatorRef,
    passwordValidations,
    isValid,
  };
};