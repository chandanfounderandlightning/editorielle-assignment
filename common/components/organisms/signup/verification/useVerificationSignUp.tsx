import {
  useRef, useEffect, useState,
} from 'react';
import useSWRMutation from 'swr/mutation';
import { fetcher } from '@/common/utils/network/baseFetcher';
import { parseObjectPropertiesToSnakeCase } from '@/common/utils/helpers';
import {
  verifyEmailUrl, resendOtpUrl, team, individual,
} from '@/common/utils/network/endpoints';
import { SignUpVerificationDTO } from '@/app/account/types';
import lang from '@/common/lang';
import {
  useRouter, useSearchParams,
} from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';
import { useAlert } from '@/common/components/molecules';
import {
  signIn, useSession,
} from 'next-auth/react';


const { signUpVerification: signUpVerificationCopy } = lang;

export const useVerificationSignUp = (mod: string) => {
  const { addTeamMemberUrlFE } = mod === "team" ? team : individual;
  const {
    setAlertState, Alert,
  } = useAlert();
  const [loading, setLoading] = useState(false);
  let email:string;
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromSearchParams = searchParams.get('email');
  if (emailFromSearchParams) {
    email = emailFromSearchParams;
  }
  const {
    data: session, status,
  } = useSession();

  const useVerifyOtp = () => {
    const signUpVerification = useSWRMutation(verifyEmailUrl, fetcher<HeadersInit, SignUpVerificationDTO>, {
      onSuccess: (data) => {
        setAlertState({
          type: 'success',
          title: '',
          content: signUpVerificationCopy.accountVerified,
          show: true,
        });
        return data;
      },
      onError: (error) => {
        setAlertState({
          type: 'error',
          title: '',
          content: signUpVerificationCopy.error,
          show: true,
        });
        return error;
      },
    });
  
    const verifyOtp = async (payload: SignUpVerificationDTO) => {
      setLoading(true);
      try {
        const data:any = await signUpVerification.trigger({
          body: parseObjectPropertiesToSnakeCase(payload),
          method: 'POST',
        });
        if (data && data.response && data.response.data) {
          const {
            id: responseDataId,
            email: responseDataEmail,
            first_name: responseDataFirstName,
            last_name: responseDataLastName,
            token: responseDataToken,
          } = data.response.data;

          const signInId = responseDataId || session?.user?.id;
          const signInEmail = responseDataEmail || session?.user?.email;
          const signInFirstName = responseDataFirstName || session?.user?.firstName;
          const signInLastName = responseDataLastName || session?.user?.lastName;
          const signInToken = responseDataToken || session?.token;
    
          signIn('credentials', {
            redirect: false,
            id: signInId,
            email: signInEmail,
            firstName: signInFirstName,
            lastName: signInLastName,
            token: signInToken,
          });
        }
        const verifyAlertData = {
          type: 'success',
          title: '',
          content: signUpVerificationCopy.accountVerified,
          show: true,
        };
        return Promise.resolve(verifyAlertData);
      } catch (error:any) {
        const verifyAlertData = {
          type: 'error',
          title: '',
          content: error.message,
          show: true,
        };
        setLoading(false);
        return Promise.reject(verifyAlertData);
      }
    };
  
    return {
      verifyOtp,
      isLoading: signUpVerification.isMutating,
      setAlertState,
    };
  };

  const useSubmitHandler = () => {
    const { verifyOtp } = useVerifyOtp();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const onSubmitData: SubmitHandler<SignUpVerificationDTO> = async (data) => {
      const payload = {
        otp: data.otp,
        email,
      };
      try {
        const verifyAlertData = await verifyOtp(payload);
        setAlertState({
          type: 'success',
          title: '',
          content: verifyAlertData.content,
          show: verifyAlertData.show,
        });
        timeoutRef.current = setTimeout(() => {
          router.push(addTeamMemberUrlFE);
        }, 3000);
        return Promise.resolve(verifyAlertData);
      } catch (verifyAlertData: any) {
        setAlertState({
          type: 'error',
          title: '',
          content: verifyAlertData.content,
          show: verifyAlertData.show,
        });
        return Promise.reject(verifyAlertData);
      }
    };

    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);
  
    return {
      onSubmitData,
      Alert,
    };
  };

  const useResendOtp = () => {
    const resendOtp = useSWRMutation(resendOtpUrl, fetcher<HeadersInit, string>, {
      onSuccess: (data) => {
        setAlertState({
          type: 'success',
          title: '',
          content: signUpVerificationCopy.codeSuccess,
          show: true,
        });
        return data;
      },
      onError: (error) => {
        setAlertState({
          type: 'error',
          title: '',
          content: signUpVerificationCopy.codeExpired,
          show: true,
        });
        return error;
      },
    });
  
    const resendCode = async (email: string) => {
      try {
        const data = await resendOtp.trigger({
          body: parseObjectPropertiesToSnakeCase({ email }),
          method: 'POST',
        });
        return Promise.resolve(setAlertState({
          type: 'success',
          title: '',
          content: signUpVerificationCopy.codeSuccess,
          show: true,
        }));
      } catch (error) {
        return Promise.reject(setAlertState({
          type: 'error',
          title: '',
          content: signUpVerificationCopy.codeExpired,
          show: true,
        }));
      }
    };
  
    const handleResendCode = async () => {
      const payload: string = email;
      try {
        const alertData = await resendCode(payload);
        return Promise.resolve(alertData);
      } catch (alertData: any) {
        return Promise.reject(alertData);
      }
    };
    
    return {
      resendCode,
      handleResendCode,
      isResending: resendOtp.isMutating,
    };  
  };

  return {
    useSubmitHandler,
    useResendOtp,
    useVerifyOtp,
    Alert,
    setAlertState,
    isLoading: loading,
  };
};
