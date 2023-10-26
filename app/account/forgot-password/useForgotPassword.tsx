import { useAlert } from "@/common/components/molecules";
import {
  SubmitHandler, useForm,
} from "react-hook-form";
import { ForgotPasswordDTO } from "../types";
import { errorHandler } from "@/common/utils/network/errorHandler";
import lang from "@/common/lang";
import { forgotPasswordUrl } from "@/common/utils/network/endpoints";
import { fetcher } from "@/common/utils/network/baseFetcher";
import useSWRMutation from "swr/mutation";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordValidationSchema } from "./validationSchema";
import { useState } from "react";

export const useForgotPassword = () => {
  const resendButtonClassDisabled = 'text-grey-300 text-sm font-medium';
  const resendButtonClassEnabled = 'text-rose-300 hover:text-rose-400 text-sm font-medium';
  const [resendButtonState, setResendButtonState] = useState(true);
  const [resendButtonClass, setResendButtonClass] = useState(resendButtonClassDisabled);

  const {
    setAlertState, Alert,
  } = useAlert();

  const { forgotPassword: forgotPasswordCopy } = lang;
  const resolver = { resolver: yupResolver(forgotPasswordValidationSchema) };

  const signOutOnBE = useSWRMutation(forgotPasswordUrl, fetcher<HeadersInit, ForgotPasswordDTO>);
  const {
    trigger, isMutating: isLoading,
  } = signOutOnBE;

  const {
    handleSubmit, control, watch, setValue,
  } = useForm<ForgotPasswordDTO>({
    ...resolver,
    mode: 'onBlur',
  });
  let userEmail = watch('email');

  const onSubmit: SubmitHandler<ForgotPasswordDTO> = async (data) => {
    await trigger({
      body: data,
      method: 'POST',
    })
      .then(() => {
        setAlertState({
          type: 'success',
          title: '',
          content: forgotPasswordCopy.success,
          show: true,
        });
        setResendButtonState(false);
        setResendButtonClass(resendButtonClassEnabled);
      })
      .catch((error:any) => {
        errorHandler(error);
        setAlertState({
          type: 'error',
          title: '',
          content: error?.message,
          show: true,
        });
        userEmail = '';
      });
  };
  
  const onResendPassword = async () => {
    await onSubmit({ email: userEmail });
  };

  return {
    onResendPassword,
    Alert,
    forgotPasswordCopy,
    onSubmit,
    isLoading,
    handleSubmit,
    control,
    resendButtonState,
    resendButtonClass,
  }
};