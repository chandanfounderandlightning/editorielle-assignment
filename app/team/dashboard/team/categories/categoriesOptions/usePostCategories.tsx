import useSWRMutation from "swr/mutation";
import { useAlert } from "@/common/components/molecules";
import { team } from "@/common/utils/network/endpoints";
import { fetcher } from "@/common/utils/network/baseFetcher";
import { useSession } from "next-auth/react";
import { useState } from "react";
const { postMembersSelectedData } = team;

export const usePostCategories = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const { setAlertState } = useAlert();
  const { data: session } = useSession();
  const chooseCategories = useSWRMutation(
    postMembersSelectedData,
    fetcher<HeadersInit>
  );

  const { trigger } = chooseCategories;

  const submitForm = (payload: any) => {
    setLoader(true);
    trigger({
      body: payload,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session?.token}`,
      },
    }).then((res: any) => {
      setSuccessMessage(res.response.message);
      setLoader(false);
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    });
  };
  return { submitForm, setAlertState, successMessage, loader };
};
