'use client';
import { BusinessInfoGeneral as Types } from "@/app/account/types";
import { Button } from "@/common/components/atoms";
import {
  Input, useAlert,
} from "@/common/components/molecules";
import lang from "@/common/lang";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useEffect, useState,
} from "react";
import {
  Controller, SubmitHandler, useForm,
} from "react-hook-form";
import { businessInformationValidationSchema } from "./validationSchema";
import {
  signIn, useSession,
} from "next-auth/react";
import useSWRMutation from 'swr/mutation';
import { team } from "@/common/utils/network/endpoints";
import { fetcher } from "@/common/utils/network/baseFetcher";
import { parseObjectPropertiesToSnakeCase } from "@/common/utils/helpers";
import { Loader } from "@/common/designSystem";

const { generalDashboardHomeTeam } = lang;
const {
  updateBusinessInfoDashboard, getTeamInfo,
} = team;

const BusinessInfoGeneral = () => {
  const saveButtonClassDisabled = 'bg-grey-50 px-3 py-1.5 text-grey-500 font-bold text-sm border border-grey-200 rounded-md';
  const saveButtonClassEnabled = 'bg-rose-200 px-3 py-1.5 text-grey-900 font-bold text-sm border border-rose-200 rounded-md';
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [businessName, setBusinessName] = useState<string>('');

  const resolver = { resolver: yupResolver(businessInformationValidationSchema) };

  const {
    data: session,
  } = useSession();
  
  useEffect(() => {
    fetcher(getTeamInfo, {
      arg: {
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
        method: 'GET',
      },
    }).then((res:any) => {
      setValue('businessName', res.response.data.business_name);
      setBusinessName(res.response.data.business_name);
    });

  }, [session]);

  const {
    control,
    setValue,
    handleSubmit,
    formState: { isDirty },
  } = useForm<Types>({
    ...resolver,
    mode: 'onSubmit',
    defaultValues: {
      businessName,
    },
  });

  const {
    setAlertState, Alert,
  } = useAlert();

  const businessInformationgeneral = useSWRMutation(updateBusinessInfoDashboard, fetcher<HeadersInit, Types>);
  const {
    trigger, isMutating: isLoading, 
  } = businessInformationgeneral;
  const onSubmit: SubmitHandler<Types> = async (data) => {
    trigger({
      method: 'PUT',
      body: parseObjectPropertiesToSnakeCase(data),
      headers: {
        Authorization: `Bearer ${session?.token}`,
      },
    })
      .then(async () => {
        setIsSaveButtonEnabled(false);
        setIsDisabled(true);
        await signIn('credentials', {
          firstName: session?.user?.firstName,
          lastName: session?.user?.lastName,
          email: session?.user?.email,
          businessName: data.businessName,
          token: session?.token,
          id: session?.user?.id,
          redirect: false,
        }).then(() => {
          setAlertState({
            type: 'success',
            title: '',
            content: 'Your information has been updated successfully.',
            show: true,
          });

          setTimeout(() => {
            setAlertState({
              type: 'success',
              title: '',
              content: '',
              show: false,
            });
          }, 3000);
        });
      }).catch((e) => {
        setAlertState({
          type: 'error',
          title: '',
          content: e.message,
          show: true,
        });
      });
  };

  useEffect(() => {
    if (isDirty) {
      setIsSaveButtonEnabled(true);
      setIsDisabled(false);
    }
  }, [isDirty])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isLoading && <Loader />}
      <div className="p-8 border rounded-t-lg">
        <div className="flex">
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
                  data-cy="businessName"
                  labelText={generalDashboardHomeTeam.businessName}
                  error={!!error}
                  errorMessage={error?.message}
                  {...field}
                />
              );
            }}
          />
        </div>
      </div>
      <div className="px-8 py-4 border rounded-b-lg">
        <Button
          variant="solid"
          size="sm"
          disabled={isDisabled}
          className={isSaveButtonEnabled ? saveButtonClassEnabled : saveButtonClassDisabled}
          type="submit"
        >
          {generalDashboardHomeTeam.saveButton}
        </Button>
        <Alert />
      </div>
    </form>
  );
};

export default BusinessInfoGeneral;