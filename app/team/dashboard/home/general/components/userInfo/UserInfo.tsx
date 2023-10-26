"use client";
import { UserInfoGeneral as Types } from "@/app/account/types";
import { Button } from "@/common/components/atoms";
import { Input, useAlert } from "@/common/components/molecules";
import lang from "@/common/lang";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { userInformationValidationSchema } from "./validationSchema";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { team } from "@/common/utils/network/endpoints";
import { fetcher } from "@/common/utils/network/baseFetcher";
import useSWRMutation from "swr/mutation";
import { parseObjectPropertiesToSnakeCase } from "@/common/utils/helpers";
import { useRouter } from "next/navigation";
import { Loader } from "@/common/designSystem";

const { generalDashboardHomeTeam } = lang;
const { updateUserInfoDashboard, getTeamInfo } = team;

const UserInfoGeneral = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [userInfo, setuserInfo] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const saveButtonClasses = isDisabled
    ? "bg-grey-50 px-3 py-1.5 text-grey-500 font-bold text-sm border border-grey-200 rounded-md"
    : "bg-rose-200 px-3 py-1.5 text-grey-900 font-bold text-sm border border-rose-200 rounded-md";

  const resolver = { resolver: yupResolver(userInformationValidationSchema) };
  const { data: session } = useSession();

  const {
    control,
    setValue,
    formState: { isDirty },
    watch,
    handleSubmit,
  } = useForm<Types>({
    ...resolver,
    mode: "onSubmit",
    defaultValues: {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
    },
  });
  const firstNameUI = watch("firstName");
  const lastNameUI = watch("lastName");
  const emailUI = watch("email");

  useEffect(() => {
    fetcher(getTeamInfo, {
      arg: {
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
        method: "GET",
      },
    }).then((res: any) => {
      setValue("firstName", res.response.data.first_name);
      setValue("lastName", res.response.data.last_name);
      setValue("email", res.response.data.email);
      setuserInfo({
        id: res.response.data.id,
        firstName: res.response.data.first_name,
        lastName: res.response.data.last_name,
        email: res.response.data.email,
      });
    });
  }, [session]);

  const { setAlertState, Alert } = useAlert();

  const router = useRouter();

  const userInformationgeneral = useSWRMutation(
    updateUserInfoDashboard,
    fetcher<HeadersInit, Types>
  );
  const { trigger, isMutating: isLoading } = userInformationgeneral;

  const onSubmit: SubmitHandler<Types> = async (data) => {
    const { firstName, lastName, email } = data;
    trigger({
      method: "PUT",
      body: parseObjectPropertiesToSnakeCase(data),
      headers: {
        Authorization: `Bearer ${session?.token}`,
      },
    })
      .then(async (res: any) => {
        setIsDisabled(true);
        const { message } = res.response;
        if (email !== userInfo.email) {
          setAlertState({
            type: "success",
            title: "",
            content: message,
            show: true,
          });
          router.push(`/team/dashboard/email-verification?email=${email}`);
          return;
        }
        await signIn("credentials", {
          firstName,
          lastName,
          email,
          token: session?.token,
          businessName: session?.user?.businessName || "",
          id: userInfo.id,
          redirect: false,
        }).then(() => {
          setAlertState({
            type: "success",
            title: "",
            content: message,
            show: true,
          });
        });

        setTimeout(() => {
          setAlertState({
            type: "success",
            title: "",
            content: "",
            show: false,
          });
        }, 3000);
      })
      .catch((error) => {
        setAlertState({
          type: "error",
          title: "",
          content: error?.message,
          show: true,
        });
      });
  };

  useEffect(() => {
    if (isDirty) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [isDirty, firstNameUI, lastNameUI, emailUI]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {isLoading && <Loader />}
      <div className="p-8 border rounded-t-lg">
        <div className="flex flex-wrap sm:justify-between">
          <div className="w-[47%]">
            <Controller
              control={control}
              name="firstName"
              render={({ field, fieldState }) => {
                const { error } = fieldState;
                return (
                  <Input
                    width="w-full"
                    id={field.name}
                    type="text"
                    data-cy="first-name"
                    labelText={generalDashboardHomeTeam.firstName}
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
          <div className="w-[48%] ml-3">
            <Controller
              control={control}
              name="lastName"
              render={({ field, fieldState }) => {
                const { error } = fieldState;
                return (
                  <Input
                    width="w-full"
                    id={field.name}
                    type="text"
                    data-cy="last-name"
                    labelText={generalDashboardHomeTeam.lastName}
                    error={!!error}
                    errorMessage={error?.message}
                    {...field}
                  />
                );
              }}
            />
          </div>
        </div>
        <div className="flex mt-8">
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => {
              const { error } = fieldState;
              return (
                <Input
                  width="w-full"
                  id={field.name}
                  type="email"
                  data-cy="email"
                  labelText={generalDashboardHomeTeam.email}
                  error={!!error}
                  errorMessage={generalDashboardHomeTeam.errorEmail}
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
          className={saveButtonClasses}
          type="submit"
        >
          {generalDashboardHomeTeam.saveButton}
        </Button>
        <Alert />
      </div>
    </form>
  );
};

export default UserInfoGeneral;
