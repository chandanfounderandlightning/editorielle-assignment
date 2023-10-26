import {
  Fragment, useEffect, 
} from "react";
import {
  Dialog, Transition, 
} from "@headlessui/react";
import Payment from "@/stories/assets/payment.svg";
import lang from "@/common/lang";
import { Typography } from "@/common/components/atoms/typography";
import { SplitCheckoutForm } from "./SplitCheckoutForm";
const { planDashboardHomeTeam } = lang;

export default function EditPaymentModal ({
  openStatus,
  setOpenStatus,
  showFormModal,
  onSubmit, Alert, setAlertState, isLoading,
}: any) {
  const closePopup = () => {
    setOpenStatus(false);
  };
  
  useEffect(() => {
    if (showFormModal) {
      setAlertState({
        show: false,
        type: "success",
        title: "",
        content: "",
      });
    }
  }, [showFormModal]);

  return (
    <Transition.Root show={openStatus} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closePopup}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div className="pb-4">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <Payment
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <Typography
                  variant="heading-md"
                  classes="text-grey-900 text-base font-semibold pb-6 text-center"
                >
                  {planDashboardHomeTeam.changeCardDetails}
                </Typography>
                <form id="card-update-form">
                  <Typography
                    variant="body-md"
                    classes="text-grey-900 text-sm font-medium max-w-sm pb-2"
                  >
                    {planDashboardHomeTeam.cardDetails}
                  </Typography>
            
                  <SplitCheckoutForm onSubmit={onSubmit} isLoading={isLoading} />
                  <Alert />
                  
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
