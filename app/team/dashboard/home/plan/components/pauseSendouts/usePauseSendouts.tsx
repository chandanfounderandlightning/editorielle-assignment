'use client';

import { useAlert } from "@/common/components/molecules";
import { fetcher } from "@/common/utils/network/baseFetcher";
import { useSession } from "next-auth/react";
import {
  useEffect, useState,
} from "react";
import {
  SubmitHandler, useForm,
} from "react-hook-form";
import { PauseSendoutsPlan as Types } from "@/app/account/types";
import { parseObjectPropertiesToSnakeCase } from "@/common/utils/helpers";
import { team } from "@/common/utils/network/endpoints";
import useSWRMutation from 'swr/mutation';
import {
  compareDates, dateString, 
} from "@/app/team/dashboard/team/members/edit-team-member/utils";

const {
  getMembersWithStatus, pausePlanPage,
} = team;

export const usePauseSendouts = () => {
  const [isPauseSendoutDisabled, setIsPauseSendoutDisabled] = useState(true);

  const {
    data: session,
  } = useSession();

  const {
    setAlertState, Alert,
  } = useAlert();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isDirty },
  } = useForm<Types>({
    mode: 'onSubmit',
  });
  const pauseDateValue = watch('pauseTill');
  useEffect(() => {
    if (pauseDateValue && isDirty) {
      setIsPauseSendoutDisabled(false);
    } else {
      setIsPauseSendoutDisabled(true);
    }
  }, [pauseDateValue]);

  useEffect(() => {
    fetcher(getMembersWithStatus, {
      arg: {
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
        method: 'GET',
      },
    }).then((res:any) => {
      const pauseTill = res.response.data.sort((a:any, b:any) => a.id - b.id)[0].pause_till;
      const checkPauseDate = compareDates(pauseTill, dateString);
      if (checkPauseDate == 1) {
        const pauseTillDate = pauseTill?.split(' ')[0]
        setValue("pauseTill", pauseTillDate);
      }
    });
  }, [session]);

  const pauseTeamMemberSendout = useSWRMutation(pausePlanPage, fetcher<HeadersInit, Types>);
  const {
    trigger, isMutating,
  } = pauseTeamMemberSendout;
  const onSubmit: SubmitHandler<Types> = async (data) => {
    trigger({
      method: 'POST',
      body: parseObjectPropertiesToSnakeCase(data),
      headers: {
        Authorization: `Bearer ${session?.token}`,
      },
    })
      .then(() => {
        setAlertState({
          type: 'success',
          title: '',
          content: 'Sendouts paused',
          show: true,
        });
        window.location.reload();
      }).catch((e) => {
        setAlertState({
          type: 'error',
          title: '',
          content: e.message,
          show: true,
        });
      });
  };

  return {
    isPauseSendoutDisabled,
    control,
    handleSubmit,
    onSubmit,
    dateString,
    Alert,
    isMutating,
  }
};