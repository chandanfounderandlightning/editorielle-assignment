import { fetcher } from '@/common/utils/network/baseFetcher';
import { team } from '@/common/utils/network/endpoints';
import useSWRMutation from 'swr/mutation';
import {
  AddTeamMemberIndividualDTO,
  AddTeamMemberIndividualDTO as Types,
} from '@/app/account/types';
import {
  SubmitHandler, useForm,
} from 'react-hook-form';
import { parseObjectPropertiesToSnakeCase } from '@/common/utils/helpers';
import { useSession } from 'next-auth/react';
import { useAlert } from '@/common/components/molecules';
import { yupResolver } from '@hookform/resolvers/yup';
import { inviteMemberValidationSchema } from './validationSchema';

const { getMembersWithStatus } = team;

export const useAddTeamMember = ({ setOpenStatus }: any) => {

  const { data: session } = useSession();
  const {
    setAlertState, Alert,
  } = useAlert();

  const resolver = { resolver: yupResolver(inviteMemberValidationSchema) };

  const {
    control, handleSubmit, reset,
  } = useForm<AddTeamMemberIndividualDTO>({
    ...resolver,
    mode: 'onSubmit',
  });

  const inviteNewMember = useSWRMutation(getMembersWithStatus, fetcher<HeadersInit, Types>);

  const { trigger } = inviteNewMember;

  const onSubmitData: SubmitHandler<Types> = async (data) => {
    const payload: Types = {
      ...data,
    };

    await trigger({
      method: 'POST',
      body: parseObjectPropertiesToSnakeCase(payload),
      headers: {
        Authorization: 'Bearer ' + session?.token,
      },
    })
      .then((res: any) => {
        setAlertState({
          type: 'success',
          title: '',
          content: res.response.message,
          show: true,
        });
        setOpenStatus(false);
        reset();
        setAlertState({
          type: 'success',
          title: '',
          content: '',
          show: false,
        });
      })
      .catch((error) => {
        setAlertState({
          type: 'error',
          title: '',
          content: error.message,
          show: true,
        });
      });
  };

  const closePopup = () => {
    setOpenStatus(false);
    reset();
    setAlertState({
      type: 'success',
      title: '',
      content: '',
      show: false,
    });
  };

  return {
    closePopup,
    handleSubmit,
    onSubmitData,
    control,
    Alert,
  };
};
