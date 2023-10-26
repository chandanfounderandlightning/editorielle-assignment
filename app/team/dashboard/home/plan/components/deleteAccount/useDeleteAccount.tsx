'use client';
import {
  DeleteAccountDTO, ErrorModalData, 
} from '@/app/account/types';
import { useAlert } from '@/common/components/molecules';
import lang from '@/common/lang';
import { parseObjectPropertiesToSnakeCase } from '@/common/utils/helpers';
import { fetcher } from '@/common/utils/network/baseFetcher';
import { team } from '@/common/utils/network/endpoints';
import {
  signOut, useSession, 
} from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  useEffect, useState, 
} from 'react';
import { useForm } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';

const { planDashboardHomeTeam } = lang;
const {
  deleteAccount, getTeamInfo,
} = team;

export const useDeleteAccount = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const {
    Alert, setAlertState, 
  } = useAlert();
  const { handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(0);
  const [warningModal, setWarningModal] = useState(false);
  const [warningModalText, setWarningModalText] = useState<ErrorModalData>({
    heading: '',
    bodyText: '',
    buttonText: '',
    secondButtonText: '',
    buttonLink: null,
    secondButtonLink: null,
  });

  useEffect(() => {
    fetcher(getTeamInfo, {
      arg: {
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
        method: 'GET',
      },
    }).then((res:any) => {
      setUserId(res.response.data.id);
    });

  }, [session]);

  const deleteUrl = `${deleteAccount}/${userId}`
  const deleteMember = useSWRMutation(
    deleteUrl,
    fetcher<HeadersInit, DeleteAccountDTO>,
  );
  const { trigger } = deleteMember;

  const onDeleteButton = async (data:any) => {
    setAlertState({
      type: 'error',
      title: '',
      content: 'Please select reason',
      show: false,
    })
    const payload: any = {
      reason: data.reason.name,
    };
    
    if (data.reason.id === 0) {
      setAlertState({
        type: 'error',
        title: '',
        content: 'Please select reason',
        show: true,
      })
      return;
    }
    if (payload.reason === "Other" && data.other !== undefined) {
      payload["reason"] = data.other
    }
    setIsLoading(true);
    return trigger({
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${session?.token}`,
      },
      body: parseObjectPropertiesToSnakeCase(payload),
    }).then(async () => {
      await signOut({ redirect: false });
      router.push('/account/signin');
    }).catch((err) => {
      setAlertState({
        type: 'error',
        title: '',
        content: err?.message,
        show: true,
      })
    });
  };

  const triggerWarning = () => {
    setWarningModal(true);
    setWarningModalText({
      heading: planDashboardHomeTeam.deleteWarningTitle,
      bodyText: planDashboardHomeTeam.deleteWarningDesc,
      buttonText: planDashboardHomeTeam.deleteWarningCancelCTA,
      secondButtonText: planDashboardHomeTeam.deleteWarningDeleteCTA,
      buttonLink: null,
      secondButtonLink: onDeleteButton,
    });
  };

  const handleDelete = (data:any) => {
    onDeleteButton(data);
  };

  return {
    triggerWarning,
    warningModal,
    setWarningModal,
    warningModalText,
    handleSubmit,
    onDeleteButton,
    handleDelete,
    Alert,
    isLoading,
  };
};
