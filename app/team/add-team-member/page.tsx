'use client';
import {
  useState, useEffect, useRef,
} from "react";
import { Toggle } from "@/common/components/molecules/toggle";
import { Typography } from "@/common/components/atoms/typography";
import { ContentLayout } from "@/common/designSystem";
import lang from "@/common/lang";
import {
  Controller, useFieldArray,
} from "react-hook-form";
import { Input } from "@/common/components/molecules";
import { Button } from "@/common/components/atoms";
import UserGroup from "@/stories/assets/user-group.svg";
import Add from "@/stories/assets/add.svg";
import { useSubmitHandler } from "./useAddTeamMember";

const { teamAddTeamMember } = lang;

const AddTeamMember = () => {
  const {
    handleSubmit, onSubmitData, setDefaultValuesForForm, resetFormValues, control, Alert, defaultValues, setValues, nominatedMember, clearErrors, calculatePrice, prices, totalPrice, dataFields,
  } = useSubmitHandler();

  const {
    fields, append, remove,
  } = useFieldArray({
    control,
    name: "members",
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const [toggleButtonText, setToggleButtonText] = useState(teamAddTeamMember.toggleText);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && dataFields && dataFields.length > 0) {
      fields.forEach((_, index) => remove(index));
      dataFields.forEach((_:any, index:any) => remove(index));
      setIsDisabled(false);
      append(dataFields);
      initialized.current = true;
    } 
    else if (initialized.current && dataFields && dataFields.length > 0) {
      fields.forEach((_, index) => remove(index));
      dataFields.forEach((_:any, index:any) => remove(index));
      setIsDisabled(false);
      dataFields.forEach((field: any) => append(field));
    }
    else if (!initialized.current) {
      append([
        {
          id: 0,
          firstName: defaultValues.firstName,
          lastName: defaultValues.lastName,
          email: defaultValues.email,
        },
        {
          id: 1,
          firstName: '',
          lastName: '',
          email: '',
        },
      ]);
      initialized.current = true;
    }
  }, [dataFields]);

  useEffect(() => {
    calculatePrice(fields.length);
  }, [fields.length, prices]);

  const handleToggle = () => {
    const newState = !isDisabled;
    setIsDisabled(newState);
  
    if (newState) {
      clearErrors(["members.0.firstName", "members.0.lastName", "members.0.email"]);
      resetFormValues();
      setToggleButtonText(teamAddTeamMember.toggleText);
    } else {
      const memberData = {
        firstName: nominatedMember.firstName || '',
        lastName: nominatedMember.lastName || '',
        email: nominatedMember.email || '',
      };
      if (memberData.firstName !== '') {
        setValues({
          members: [{
            firstName: memberData.firstName,
            lastName: memberData.lastName,
            email: memberData.email,
          }],
        });
        setDefaultValuesForForm(memberData);
      } else {
        setValues({
          members: [{
            firstName: '',
            lastName: '',
            email: '',
          }],
        });
        setDefaultValuesForForm({
          firstName: '',
          lastName: '',
          email: '',
        });
      }
      setToggleButtonText(teamAddTeamMember.toggleTextInActive);
    }
  };

  return (
    <div className="flex flex-col h-screen items-center">
      <ContentLayout>
        <form className="flex flex-col md:flex-row py-3 md:py-0 lg:px-[80px] lg:py-[48px] xl:px-[80px] xl:py-[48px] mt-0 lg:mt-[7vh]" onSubmit={handleSubmit(onSubmitData)}>
          <div className="w-full md:w-2/3">
            <Typography variant="heading-md" classes="text-2xl font-semibold text-grey-900 text-center lg:text-left xl:text-left">
              {teamAddTeamMember.header}
            </Typography>
            <Typography variant="body-sm" classes="hidden lg:block font-medium text-grey-700 mt-3 text-center lg:text-left xl:text-left pr-[27vw]">
              {teamAddTeamMember.bodyText}
            </Typography>
            <Typography variant="body-sm" classes="block lg:hidden font-medium text-grey-700 mt-3 text-center lg:text-left xl:text-left mb-12">
              {teamAddTeamMember.bodyTextSmallDevices}
            </Typography>
            <div className="w-full mt-4 overflow-y-auto max-h-[50vh] lg:overflow-y-visible lg:max-h-full overflow-x-hidden pb-28 lg:pb-0 md:pb-0">
              <Toggle
                data-cy="email-toggle"
                labelText={toggleButtonText}
                checked={isDisabled}
                classes="lg:my-4 pt-1 lg:pt-[40px] ml-2 lg:ml-1"
                onChange={() => handleToggle()}
              />
              {fields.map((field, index) => (
                <div key={field.id} className="flex flex-wrap -mx-2 mt-3">
                  <div className="px-2 w-1/2 lg:w-1/5 xl:w-1/5">
                    <Controller
                      control={control}
                      name={`members.${index}.firstName`}
                      render={({
                        field, fieldState,
                      }) => {
                        const { error } = fieldState;
                        return (
                          <Input
                            width="w-full"
                            id={field.name}
                            type="text"
                            data-cy={`first-name-${index}`}
                            error={!!error}
                            errorMessage={error?.message}
                            {...field}
                            placeholder="First name"
                            disabled={index === 0 ? isDisabled : false}
                          />
                        );
                      }}
                    />
                  </div>
                  <div className="px-2 w-1/2 lg:w-1/5 xl:w-1/5">
                    <Controller
                      control={control}
                      name={`members.${index}.lastName`}
                      render={({
                        field, fieldState,
                      }) => {
                        const { error } = fieldState;
                        return (
                          <Input
                            width="w-full"
                            id={field.name}
                            type="text"
                            data-cy={`last-name-${index}`}
                            error={!!error}
                            errorMessage={error?.message}
                            {...field}
                            placeholder="Last name"
                            disabled={index === 0 ? isDisabled : false}
                          />
                        );
                      }}
                    />
                  </div>
                  <div className="px-2 w-full mt-4 lg:w-[30%] lg:mt-0">
                    <Controller
                      control={control}
                      name={`members.${index}.email`}
                      render={({
                        field, fieldState,
                      }) => {
                        const { error } = fieldState;
                        return (
                          <Input
                            width="w-full"
                            id={field.name}
                            type="text"
                            data-cy={`email-${index}`}
                            error={!!error}
                            errorMessage={error?.message}
                            {...field}
                            placeholder="Email"
                            disabled={index === 0 ? isDisabled : false}
                          />
                        );
                      }}
                    />
                  </div>
                  {index >= 2 && <Button variant="solid" size="sm" type="button" className="text-rose-300 text-sm font-medium ml-2 lg:ml-0" onClick={() => remove(index)}>Remove</Button>}
                </div>
              ))}

              {fields.length < 7 && (
                <>
                  <div className="text-center mt-3 block lg:hidden">
                    <Button
                      type="submit"
                      variant="solid"
                      size="sm"
                      data-cy="next"
                      className="mt-3 text-sm text-grey-900 font-normal"
                      onClick={() => {
                        append({
                          id: fields.length,
                          firstName: "",
                          lastName: "",
                          email: "",
                        });
                      } }
                    >
                      <Add className="h-6 w-6 inline" /> Add Member
                    </Button>
                    <Alert />
                  </div>
                  <div className="hidden lg:block">
                    <Button
                      type="button"
                      variant="solid"
                      size="sm"
                      className="mt-3 text-sm text-grey-900 font-normal"
                      onClick={() => {
                        append({
                          id: fields.length,
                          firstName: "",
                          lastName: "",
                          email: "",
                        });
                      }}
                    >
                      <Add className="h-6 w-6 inline" /> Add Member
                    </Button>
                  </div>
                </>
              )}
              <div className="mt-[40px] hidden lg:block">
                <Button
                  type="submit"
                  variant="solid"
                  size="sm"
                  data-cy="next"
                  width="w-[12%]"
                  className="border rounded-md bg-rose-200 text-grey-900 font-semibold border-rose-200 px-11 py-1 hover:bg-rose-300"
                >
                  {teamAddTeamMember.buttonText}
                </Button>
                <Alert />
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/3 lg:w-1/3 lg:pl-24 lg:relative md:relative fixed bottom-0 left-0 right-0 mdsm:static md:static lg:static bg-white lg:bg-transparent shadow-md lg:shadow-none mdsm:py-0 mdsm:mt-10 md:py-3 lg:py-0 lg:mt-8">
            <div className="rounded-xl p-6 lg:p-8 shadow-[0px_0px_20px_0px_rgba(0,0,0,0.06)] items-start">
              <Typography variant="heading-md" classes="font-semibold text-black hidden lg:block">
                {teamAddTeamMember.priceHeader}
              </Typography>
              <Typography variant="body-sm" classes="font-medium text-black lg:mt-3 hidden lg:block">
                {teamAddTeamMember.priceBody}
              </Typography>
              <div className="flex border rounded-md mt-3 lg:mt-8 items-center justify-center h-12">
                <div className="bg-red-200 p-3 rounded-l-md">
                  <UserGroup className="h-6 w-6 pl-0.5" />
                </div>
                <div className="flex-grow pl-2">
                  <Typography variant="body-sm" classes="font-normal text-grey-700 text-xs">
                    {teamAddTeamMember.memberCountText}
                  </Typography>
                </div>
                <div className="pl-2 pr-4">
                  <Typography variant="body-xl" classes="font-bold text-grey-900">
                    {fields.length}x
                  </Typography>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex-grow">
                  <div className="mt-3 lg:mt-8">
                    <Typography variant="body-md" classes="hidden lg:block text-base font-bold text-grey-900 pl-2 mt-2.5">
                      {teamAddTeamMember.total}
                      <span className="font-semibold">£{totalPrice}/month</span>
                      <span className="text-xs font-normal">{teamAddTeamMember.vat}</span>
                    </Typography>
                    <Typography variant="body-md" classes="block lg:hidden text-base font-bold text-grey-900 pl-2 mt-2.5">
                      {teamAddTeamMember.total}
                      <span className="font-semibold">£{totalPrice}/month</span><br />
                      <span className="text-xs font-normal">{teamAddTeamMember.vat}</span>
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex justify-end lg:hidden">
                <Button
                  type="submit"
                  variant="solid"
                  size="md"
                  data-cy="next"
                  width="w-1/2"
                >
                  {teamAddTeamMember.buttonText}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </ContentLayout>
    </div>
  );
};

export default AddTeamMember;