import {
  useEffect, useState,
} from "react";
import { currentPlan } from "@/common/utils/network/endpoints";
import { useSession } from "next-auth/react";
import { fetcher } from "@/common/utils/network/baseFetcher";

export const useCurrentPlan = () => {
  const [planDetails, setPlanDetails] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [teamPlanPrice, setTeamPlanPrice] = useState<number>(0)
  const {
    data: session,
  } = useSession();
  useEffect(() => {
    setIsLoading(true);
    fetcher(currentPlan, {
      arg: {
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
        method: 'GET',
      },
    }).then((res:any) => {
      const { data } = res.response;
      setPlanDetails(data);
      const {
        team_members_count, instant_categories_count,
      } = data
      const userPrice = ((team_members_count - 1) * 5) + 10;
      const categoryPrice = instant_categories_count * 5;
      setTeamPlanPrice(userPrice + categoryPrice);
      setIsLoading(false);
    });
  }, [session?.token, teamPlanPrice]);
  return {
    planDetails,
    isLoading,
    teamPlanPrice,
  }
}