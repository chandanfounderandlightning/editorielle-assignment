"use client";
import lang from "@/common/lang";
import { Button } from "@/common/components/atoms";

const { individualAddTeamMember } = lang;

const SubmitButton = ({ disabled }: { disabled: boolean }) => {
  return (
    <Button
      disabled={disabled}
      type="submit"
      variant="solid"
      size="sm"
      data-cy="next"
      className={`min-w-[120px] h-auto border rounded-md text-grey-900 font-semibold w-24 h-6 py-1 px-3 text-base ${
        disabled
          ? "bg-grey-200 text-grey-500"
          : "bg-rose-200 hover:bg-rose-300 border-rose-200"
      }`}
    >
      {individualAddTeamMember.buttonText}
    </Button>
  );
};

export default SubmitButton;
