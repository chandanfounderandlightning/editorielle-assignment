'use client';

import { fetcher } from "@/common/utils/network/baseFetcher";
import { notificationDetails } from "@/common/utils/network/endpoints";
import { useSession } from "next-auth/react";
import {
  useEffect, useState, 
} from "react";
import { notificationSampleData } from "./sampleNotifData";

export const useNotifications = ()=>{
  const [isLoading, setIsLoading] = useState(false);
  const [notificationInfo, setNotificationInfo] = useState();
  const {
    data: session,
  } = useSession();

  useEffect(() => {
    setIsLoading(true);
    fetcher(notificationDetails, {
      arg: {
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
        method: 'GET',
      },
    }).then((res:any) => {
      setNotificationInfo(res?.data);
    });
    setIsLoading(false);
  }, [session]);
  return {
    isLoading,
    notificationInfo,
    notificationSampleData,
  };
}