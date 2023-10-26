import {
  useEffect, useState, 
} from "react";
import {
  getStripeDetails, 
} from "./services";
import { useSession } from "next-auth/react";
import {
  SubmitHandler, useForm, 
} from "react-hook-form";
import { fetcher } from "@/common/utils/network/baseFetcher";
import { userCardDetails } from "@/common/utils/network/endpoints";
import useSWRMutation from "swr/mutation";
import { useAlert } from "@/common/components/molecules";
import { UpdatePaymentCardDetails } from "@/app/account/types";


export const usePayment = (setShowFormModal:any) => {
  const [stripeDetails, setStripeDetails] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data: session } = useSession();

  const handlePopUpModal = () => {
    setShowFormModal(true);
  };

  const updatePaymentInfo = useSWRMutation(
    userCardDetails,
    fetcher<HeadersInit, UpdatePaymentCardDetails>,
  );
  const { trigger } = updatePaymentInfo;

  const {
    setAlertState, Alert, 
  } = useAlert();

  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<UpdatePaymentCardDetails>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (!session?.token) {
      return;
    }
    getStripeDetails(session.token).then((res: any) => {
      setStripeDetails(res?.data);
    });
  }, [session?.token]);
  
  
  
  const onSubmit: SubmitHandler<UpdatePaymentCardDetails> = async (data) => {
    setIsLoading(true);

    trigger({
      method: "POST",
      body: data,
      headers: {
        Authorization: `Bearer ${session?.token}`,
      },
    })
      .then((res: any) => {
        setAlertState({
          type: "success",
          title: "",
          content: res.response.message,
          show: true,
        });
        setShowFormModal(false);
        reset();
      })
      .catch((error) => {
        setAlertState({
          type: "error",
          title: "",
          content: error.message,
          show: true,
        });
        setShowFormModal(true);
      });
    setIsLoading(false);
  };
  return {
    onSubmit,
    handleSubmit,
    trigger,
    stripeDetails,
    Alert,
    isLoading,
    handlePopUpModal,
    setAlertState,
  };
};
