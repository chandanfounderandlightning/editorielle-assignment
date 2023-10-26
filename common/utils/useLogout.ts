import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import {
  signOut, useSession,
} from "next-auth/react";
import { authorizedFetcher } from "@/common/utils/network/baseFetcher";
import { logoutUrl } from "@/common/utils/network/endpoints";

export const useLogout = () => {
  const router = useRouter();
  const session = useSession();
  const signOutOnBE = useSWRMutation(
    logoutUrl, authorizedFetcher);
  const {
    trigger, isMutating: isLoading,
  } = signOutOnBE;

  const handleLogout = async () => {
    const headers = {
      Authorization: `Bearer ${session?.data?.token}`,
    };
    await signOut({ redirect: false });
    await trigger({
      method: 'POST',
      headers,
    });
    router.push('/account/signin');
  };

  return {
    handleLogout,
    isLoading,
  };
};
