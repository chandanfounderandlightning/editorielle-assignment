"use client";
import { Typography } from "@/common/components/atoms/typography";
import { ContentLayout } from "@/common/designSystem";
import lang from "@/common/lang";
import { Controller } from "react-hook-form";
import { Input } from "@/common/components/molecules";
import { useSubmitHandler } from "./useAddTeamMember";
import { PlanDetails } from "./components/PlanDetails";
import SubmitButton from "./components/SubmitButton";
import { SendToToggle } from "./components/SendToToggle";
import { Field } from "./types";

const { individualAddTeamMember } = lang;

const AddTeamMember = () => {
  const {
    handleSubmit,
    onSubmitData,
    control,
    Alert,
    sendToAccount,
    disableSubmit,
    onSendToToggle,
    fields,
  } = useSubmitHandler();

  return (
    <div className="flex flex-col h-screen justify-center">
      <ContentLayout>
        <form
          className="flex flex-col md:flex-row py-3 lg:px-[80px] lg:py-[48px] xl:px-[80px] xl:py-[48px] mt-0 lg:mt-[15vh]"
          onSubmit={handleSubmit(onSubmitData)}
        >
          <div className="w-full md:w-2/3">
            <Typography
              variant="heading-md"
              classes="font-bold text-grey-900 text-center lg:text-left xl:text-left"
            >
              {individualAddTeamMember.header}
            </Typography>
            <Typography
              variant="body-sm"
              classes="font-medium text-grey-700 mt-3 text-center lg:text-left xl:text-left"
            >
              {individualAddTeamMember.bodyText}
            </Typography>
            <SendToToggle classes="my-4 pt-[40px] hidden lg:block" checked={sendToAccount} change={onSendToToggle} />
            <div className="w-full mt-10 lg:mt-4">
              <div className="flex flex-wrap -mx-2">
                {fields.map((inputField: Field) => (
                  <div key={inputField.name} className={inputField.wrapClassName}>
                    <Controller
                      control={control}
                      name={inputField.name}
                      render={({
                        field, fieldState, 
                      }) => {
                        const { error } = fieldState;
                        return (
                          <Input
                            width="w-full"
                            id={field.name}
                            type="text"
                            data-cy={inputField.dataCY}
                            error={!!error}
                            errorMessage={error?.message}
                            {...field}
                            placeholder={inputField.placeholder}
                            disabled={sendToAccount}
                            onChange={field.onChange}
                          />
                        );
                      }}
                    />
                  </div>
                ))}
              </div>
              <SendToToggle classes="mt-4 lg:hidden" checked={sendToAccount} change={onSendToToggle} />
              <div className="mt-[40px] hidden lg:block">
                <SubmitButton disabled={disableSubmit()} />
              </div>
              <Alert />
            </div>
          </div>

          <div className="w-full md:w-1/3 lg:w-1/3 lg:pl-24 lg:relative md:relative fixed bottom-0 left-0 right-0 mdsm:static md:static lg:static bg-white lg:bg-transparent shadow-md lg:shadow-none mdsm:py-3 md:py-3 lg:py-0">
            <div className="container rounded-xl p-6 lg:p-8 shadow-[0px_0px_20px_0px_rgba(0,0,0,0.06)] items-start border-0">
              <PlanDetails />
              <div className="mt-2 flex justify-end lg:hidden">
                <SubmitButton disabled={disableSubmit()} />
              </div>
            </div>
          </div>
        </form>
      </ContentLayout>
    </div>
  );
};

export default AddTeamMember;
