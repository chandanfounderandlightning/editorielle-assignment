import { AddTeamMemberIndividualDTO } from "@/app/account/types";
import { useAlert } from "@/common/components/molecules";
import { parseObjectPropertiesToSnakeCase } from "@/common/utils/helpers";
import { fetcher } from "@/common/utils/network/baseFetcher";
import { individual } from "@/common/utils/network/endpoints";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  SubmitHandler, useForm,
} from "react-hook-form";
import useSWRMutation from 'swr/mutation';
import { addTeamMemberIndividualValidationSchema } from "./validationSchema";
import axios from "axios";
import {
  useEffect, useState,
} from "react";

const {
  addTeamMemberUrl, chooseCategoriesFE,
} = individual;

export const useSubmitHandler = () => {
  const router = useRouter();
  const resolver = { resolver: yupResolver(addTeamMemberIndividualValidationSchema) };

  const [nominatedMember, setNominatedMember] = useState({
    firstName: '',
    lastName: '',
    email: '',
  })

  const {
    data: session, status,
  } = useSession();

  const defaultValues = {
    firstName: session?.user?.firstName || '',
    lastName: session?.user?.lastName || '',
    email: session?.user?.email || '',
    token: session?.token || '',
  };
  
  const {
    Alert, setAlertState,
  } = useAlert();

  useEffect(() => {
    if (defaultValues.token) {
      const getNominatedMember = () => {
        axios({
          method: 'GET',
          url: addTeamMemberUrl,
          headers: {
            Authorization: `Bearer ${defaultValues?.token}`,
          },
        }).then(res => {
          setNominatedMember({
            firstName: res.data.data.first_name,
            lastName: res.data.data.last_name,
            email: res.data.data.email,
          })
        })
      };
      getNominatedMember();
    }
  }, []);

  const {
    handleSubmit,
    setValue,
    formState: { isValid },
    control,
    clearErrors,
  } = useForm<AddTeamMemberIndividualDTO>({
    ...resolver,
    mode: 'onSubmit',
    defaultValues: {
      firstName: nominatedMember.firstName || defaultValues.firstName,
      lastName: nominatedMember.lastName || defaultValues.lastName,
      email: nominatedMember.email || defaultValues.email,
    },
  });

  const addTeamMember = useSWRMutation(addTeamMemberUrl, fetcher<HeadersInit, AddTeamMemberIndividualDTO>);
  
  const {
    trigger, isMutating: isLoading,
  } = addTeamMember;
  
  const onSubmitData: SubmitHandler<AddTeamMemberIndividualDTO> = (data) => {
    const payload: AddTeamMemberIndividualDTO & { isNominated?: boolean } = {
      ...data,
      isNominated: true,
    };

    trigger({
      body: parseObjectPropertiesToSnakeCase(payload),
      method: 'POST',
      headers: {
        Authorization: `Bearer ${defaultValues.token}`,
      },
    })
      .then(() => {
        router.push(chooseCategoriesFE);
      })
      .catch((err) => {
        setAlertState({
          type: 'error',
          title: '',
          content: err.message,
          show: true,
        });
      });
  };

  return {
    useSubmitHandler,
    Alert,
    handleSubmit,
    isValid,
    control,
    isLoading,
    onSubmitData,
    defaultValues,
    setValue,
    nominatedMember,
    clearErrors,
  };
};
