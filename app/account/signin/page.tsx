'use client';
import {
  useForm, SubmitHandler, Controller,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ContentLayout, Loader,
} from '@/common/designSystem';
import {
  Checkbox, useAlert,
} from '@/common/components/molecules';
import { Typography } from "@/common/components/atoms/typography";
import { Button } from "@/common/components/atoms/button";
import { Input } from "@/common/components/molecules/input";
import { Logo } from '@/common/components/icons';
import lang from '@/common/lang';
import type { SignInDTO } from '../types';
import { signInValidationSchema } from './validationSchema';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { getRedirectPathBasedOnUserStatus } from './getRedirectPathBasedOnUserStatus';
import { fetcher } from '@/common/utils/network/baseFetcher';
import { signInUrl } from '@/common/utils/network/endpoints';
import useSWRMutation from "swr/mutation";

const { signIn: signInCopy } = lang;

const SignIn = () => {
  const resolver = { resolver: yupResolver(signInValidationSchema) };
  const {
    data: session, status,
  } = useSession();

  const {
    handleSubmit, control, formState: { isValid },
  } = useForm<SignInDTO>({
    ...resolver,
    mode: 'onBlur',
  });
  const login = useSWRMutation(signInUrl, fetcher<HeadersInit, SignInDTO>);
  const { trigger } = login;
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    setAlertState, Alert,
  } = useAlert();


  const onSubmit: SubmitHandler<SignInDTO> = async (data) => {
    setIsLoading(true);
    await trigger({
      body: data,
      method: 'POST',
    }).then(async (res: any) => {
      const { data: user } = res.response;
      let businessName;
      if (user.business_name === null || user.business_name === undefined) {
        businessName = ''
      } else {
        businessName = user.business_name;
      }
      await signIn('credentials', {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        token: user.token,
        businessName,
        redirect: false,
      }).then(() => {
        const redirectPath = getRedirectPathBasedOnUserStatus(user);
        if (redirectPath !== undefined) {
          router.push(redirectPath);
        } else {
          console.error('Redirect path is undefined');
        }
      });
    }).catch((e) => {
      setIsLoading(false);
      setAlertState({
        type: 'error',
        title: '',
        content: e.message,
        show: true,
      });
    });
  };
  return (
    <ContentLayout>
      {isLoading && <Loader />}
      <div className="flex items-center flex-col mt-0 md:mt-[15vh] lg:mt-[15vh]">
        {/* <Logo width={80} height={40} /> */}
        <div className="w-full sm:w-96 flex items-center flex-col">
          <div className="mt-10 lg:mt-0 md:mt-0 mb-10">
            <Typography variant="heading-md" classes="font-semibold text-grey-900">
              {signInCopy.header}
            </Typography>
          </div>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
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
                    labelText={signInCopy.email}
                    placeholder={signInCopy.emailPlaceholder}
                    error={!!error}
                    errorMessage={error?.message}
                    {...field}
                  />)
              }
              }
            />
            <div className="mt-6">
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
                      labelText={signInCopy.password}
                      placeholder={signInCopy.passwordPlaceholder}
                      error={!!error}
                      errorMessage={error?.message}
                      optionalText={
                        <Link href="/account/forgot-password" className="text-sm font-medium text-rose-300 hover:text-rose-400">
                          {signInCopy.forgotPassword}
                        </Link>}
                      {...field}
                    />)
                }
                }
              />
            </div>
            <div className="flex mt-6">
              <Controller
                name="rememberMe"
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
                      data-cy="remember-me"
                      {...field}
                      label={
                        <div className="inline-block">
                          <Typography variant="span-sm" classes="text-black">
                            {signInCopy.rememberMe}
                          </Typography>
                        </div>
                      }
                    />
                  );
                }}
              />
            </div>
            <Alert />
            <div className="mt-8">
              <Button
                type="submit"
                variant="solid"
                size="sm"
                data-cy="submit-button"
                width="w-full"
              >
                {signInCopy.submitButtonLabel}
              </Button>
            </div>
          </form>
          <div className="w-full flex flex-col items-center mt-9">
            <div className="mt-8">
              <Typography variant="span-sm" classes="text-grey-500">
                {signInCopy.notAMember}
              </Typography>
              {' '}
              <a href="/account/signup" className="text-sm text-rose-300 hover:text-rose-400">
                {signInCopy.createAccount}
              </a>
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default SignIn;
