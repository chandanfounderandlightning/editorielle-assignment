import { InvitedMemberCreateAccountDTO } from "@/app/account/types";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useEffect, useMemo, useRef,
} from "react";
import {
  SubmitHandler, useForm,
} from "react-hook-form";
import { invitedMemberValidationSchema } from "./validationSchema";
import useSWRMutation from 'swr/mutation';
import lang from "@/common/lang";
import { signUpInvitedMember } from "@/common/utils/network/endpoints";
import { invitedMemberConfirmedUrl } from "@/common/utils/network/appRoutes";
import { PasswordValidation } from "@/common/designSystem";
import { fetcher } from "@/common/utils/network/baseFetcher";
import { useAlert } from "@/common/components/molecules";
import { parseObjectPropertiesToSnakeCase } from "@/common/utils/helpers";
import {
  useRouter, useSearchParams,
} from "next/navigation";
import { errorHandler } from "@/common/utils/network/errorHandler";
import { signIn } from 'next-auth/react';

export const useInvitedmemberCreateAccount = ({ token }: { token: string }) => {
  const validatorRef = useRef<HTMLDivElement | null>(null);
  const resolver = { resolver: yupResolver(invitedMemberValidationSchema) };
  const { invitedMemberCreateAccount } = lang;
  const {
    setAlertState, Alert,
  } = useAlert();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const name = searchParams.get('name');

  useEffect(() => {
    const passwordElement = document.getElementById('password');
    passwordElement?.addEventListener('focusout', hideValidation);
    return () => {
      passwordElement?.removeEventListener('focusout', hideValidation);
    };
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

  const {
    handleSubmit,
    control,
    watch,
  } = useForm<InvitedMemberCreateAccountDTO>({
    ...resolver,
    mode: 'onSubmit',
  });

  const invitedMemberSignUp = useSWRMutation(signUpInvitedMember, fetcher<HeadersInit, InvitedMemberCreateAccountDTO>);
  const {
    trigger, isMutating: isLoading,
  } = invitedMemberSignUp;
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

  const onSubmit: SubmitHandler<InvitedMemberCreateAccountDTO> = async (data) => {
    setAlertState({
      type: 'success',
      title: '',
      content: '',
      show: false,
    });
    const payload: InvitedMemberCreateAccountDTO & {
      isAgreeTermAndConditions?: boolean
    } = {
      ...data,
      emailVerificationToken: token,
    };

    trigger({
      body: parseObjectPropertiesToSnakeCase(payload),
      method: 'POST',
    })
      .then((res: any) => {
        signIn('credentials', {
          email,
          token: res.response.data.token,
          redirect: false,
          firstName: name,
        });
        router.push(`${invitedMemberConfirmedUrl}`);
      })
      .catch((error: any) => {
        errorHandler(error);
        setAlertState({
          type: 'error',
          title: '',
          content: error?.message || invitedMemberCreateAccount.errorSigningUp,
          show: true,
        });
      });
  };

  return {
    hideValidation,
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
  };
};