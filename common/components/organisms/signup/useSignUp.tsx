import { SignUpDTO } from "@/app/account/types";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useEffect, useMemo, useRef,
} from "react";
import {
  SubmitHandler, useForm,
} from "react-hook-form";
import { signupValidationSchema } from "./validationSchema";
import useSWRMutation from 'swr/mutation';
import lang from "@/common/lang";
import { individual, team } from "@/common/utils/network/endpoints";
import { PasswordValidation } from "@/common/designSystem";
import { fetcher } from "@/common/utils/network/baseFetcher";
import { useAlert } from "@/common/components/molecules";
import { parseObjectPropertiesToSnakeCase } from "@/common/utils/helpers";
import {
  mixpanelUserEvent,
  Dict,
  MixpanelEventName,
} from '@/common/utils/mixpanel/eventTriggers';
import { useRouter } from "next/navigation";
import { errorHandler } from "@/common/utils/network/errorHandler";

export const useSignUp = (mod: string) => {
  const validatorRef = useRef<HTMLDivElement | null>(null);
  const resolver = { resolver: yupResolver(signupValidationSchema) };
  const { signUp: signUpCopy } = lang;

  const {
    signUpUrl, signUpVerifyUrlFE,
  } = mod === 'team' ? team : individual;
  const {
    setAlertState, Alert,
  } = useAlert();
  const router = useRouter();

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
    formState: { isValid },
  } = useForm<SignUpDTO>({
    ...resolver,
    mode: 'onSubmit',
  });

  const signUp = useSWRMutation(signUpUrl, fetcher<HeadersInit, SignUpDTO>);
  const {
    trigger, isMutating: isLoading,
  } = signUp;
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

  const onSubmit: SubmitHandler<SignUpDTO> = async (data) => {
    setAlertState({
      type: 'success',
      title: '',
      content: '',
      show: false,
    });
    const payload: SignUpDTO & {
      isAgreeTermAndConditions?: boolean
    } = {
      ...data,
      isIndividual: mod !== 'team',
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore

    trigger({
      body: parseObjectPropertiesToSnakeCase(payload),
      method: 'POST',
    })
      .then((res: any) => {
        const id = res.data?.id.toString();
        const mixpanelProps: Dict = {
          $name: `${payload.firstName} ${payload.lastName}`,
          $distinct_id: id,
          $email: payload.email,
        };
        mixpanelUserEvent({
          mixpanelProps,
          id: id?.toString(),
          eventName: MixpanelEventName.register,
        });

        router.push(`${signUpVerifyUrlFE}?email=${watch('email')}`);
      })
      .catch((error: any) => {
        errorHandler(error);
        setAlertState({
          type: 'error',
          title: '',
          content: error?.message || signUpCopy.errorSigningUp,
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
    signUpCopy,
    passwordValidations,
    Alert,
  };
};