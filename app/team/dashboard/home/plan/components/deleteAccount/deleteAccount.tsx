'use client';
import { Button } from "@/common/components/atoms";
import lang from "@/common/lang";
import { useDeleteAccount } from "./useDeleteAccount";
import WarningModal from "./warningModal";

const { planDashboardHomeTeam } = lang;

const DeleteAccount = () => {
  const {
    warningModal,
    setWarningModal,
    warningModalText,
    triggerWarning,
    handleDelete,
  } = useDeleteAccount();

  return (
    <>
      <Button
        variant="solid"
        size="sm"
        type="button"
        className="px-3 py-1.5 text-red-500 font-semibold text-sm rounded-md border border-grey-300 bg-white hover:bg-grey-50"
        onClick={triggerWarning}
      >
        {planDashboardHomeTeam.deleteButton}
      </Button>
      <WarningModal
        isOpen={warningModal}
        setOpen={setWarningModal}
        heading={warningModalText.heading}
        bodyText={warningModalText.bodyText}
        buttonText={warningModalText.buttonText}
        secondButtonText={warningModalText.secondButtonText}
        buttonLink={warningModalText.buttonLink}
        secondButtonLink={(warningModalText.secondButtonLink)}
        zIndex={`z-[100]`}
        secondButtonClass={`text-red-500`}
        onSubmit={handleDelete}
      />
    </>
  );
};

export default DeleteAccount;