'use client';
import { Typography } from "@/common/components/atoms/typography";
import lang from "@/common/lang";
import { Button } from "@/common/components/atoms";
import {
  useEffect,
  useState, 
} from "react";
import EditPaymentModal from "./editCardDetails/EditPaymentModal";
import { usePayment } from "./usePayment";
import { getPaymentService } from "./services";
import { useSession } from "next-auth/react";
import { Loader } from "@/common/designSystem";

const { planDashboardHomeTeam } = lang;

const Payment = () => {
  const { data: session } = useSession();
  const [showFormModal, setShowFormModal] = useState(false);
  const [isLoading , setIsLoading] = useState(false)
  const {
    onSubmit, Alert, setAlertState,
  } = usePayment(setShowFormModal);
  const [cardDetails, setCardDetails] = useState<any>({});

  const getPaymentDetails = (token: any) => {
    setIsLoading(true)
    getPaymentService(token).then((res: any) => {
      setCardDetails(res?.data?.[0]);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    if (!session?.token) {
      return;
    }
    getPaymentDetails(session.token)
  }, [session?.token, showFormModal]);

  const openEditPaymentModal = () => {
    setShowFormModal(true);
  };
  
  const formatLastFour = (value:any) => {
    const paddedValue = value?.toString().padStart(4, '0');
    return paddedValue;
  };

  return (
    <>
      <div className="px-4 py-5 border border-gray-200 rounded-lg">
        {(isLoading && !showFormModal) && <Loader />}
        <div>
          <Typography
            variant="heading-md"
            classes="text-grey-900 text-base font-semibold pb-5"
          >
            {planDashboardHomeTeam.paymentMethod}
          </Typography>
          <div className="border-0 bg-grey-50 border-gray-200 rounded-lg w-full mr-0 sm:mr-3 md:mr-4 lg:mr-4">
            <div className="px-4 py-5 flex flex-col sm:flex-row sm:justify-between">
              <div>
                <Typography
                  variant="body-md"
                  classes="pt-1 text-grey-900 text-sm font-medium max-w-sm"
                >
                  Ending in {formatLastFour(cardDetails?.last_four)}
                </Typography>
                <Typography
                  variant="body-sm"
                  classes="pt-1 text-grey-600 text-sm font-normal max-w-sm"
                >
                  Expires {cardDetails?.pm_exp_month}/{cardDetails?.pm_exp_year}
                </Typography>
              </div>
              <div className="mt-3 lg:mt-0 md:mt-0">
                <Button
                  size="sm"
                  variant="solid"
                  className="bg-white text-grey-600 font-semibold text-sm py-2 px-3 rounded-md border border-grey-300"
                  onClick={openEditPaymentModal}
                  data-cy="editPayment"
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>

          <EditPaymentModal
            openStatus={showFormModal}
            setOpenStatus={setShowFormModal}
            showFormModal={showFormModal}
            onSubmit={onSubmit} Alert={Alert} setAlertState={setAlertState}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default Payment;