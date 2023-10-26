'use client';
import {
  useState, useEffect,
} from "react";
import { Toggle } from "@/common/components/molecules/toggle";
import { Typography } from "@/common/components/atoms/typography";
import { ContentLayout } from "@/common/designSystem";
import lang from "@/common/lang";
import { Controller } from "react-hook-form";
import { Input } from "@/common/components/molecules";
import { Button } from "@/common/components/atoms";
import UserGroup from "@/stories/assets/user-group.svg";
import { useSubmitHandler } from "./useAddTeamMember";

const { individualAddTeamMember } = lang;

const AddTeamMember = () => {
  const {
    handleSubmit, onSubmitData, control, Alert, defaultValues, setValue, nominatedMember, clearErrors,
  } = useSubmitHandler();
  const [isDisabled, setIsDisabled] = useState(true);
  const [toggleButtonText, setToggleButtonText] = useState(individualAddTeamMember.toggleText);

  const [isFirstNameEmpty, setIsFirstNameEmpty] = useState(true);
  const [isLastNameEmpty, settIsLastNameEmpty] = useState(true);
  const [isEmailEmpty, setIsEmailEmpty] = useState(true);

  const [isFormEmpty, setIsFormEmpty] = useState(false);
  useEffect(() => {
    if (isEmailEmpty === true || isLastNameEmpty === true || isFirstNameEmpty === true) {
      setIsFormEmpty(true)
      return;
    }
    setIsFormEmpty(false)
  })
  const [defaultValuesForForm, setDefaultValuesForForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const [placeholders, setPlaceholders] = useState({
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
  });

  const setValues = (values: any) => {
    Object.entries(values).forEach(([key, value]: any) => {
      setValue(key, value);
    });
  };

  useEffect(() => {
    const {
      firstName, lastName, email,
    } = nominatedMember;
    if (firstName && firstName !== '' && lastName && lastName !== '' && email && email !== '') {
      setIsDisabled(false);
      setValues({
        firstName,
        lastName,
        email,
      });
    }
  }, [nominatedMember]);

  const handleToggle = () => {
    const newState = !isDisabled;
    setIsDisabled(newState);

    if (newState) {
      clearErrors(["firstName", "lastName", "email"]);
      resetFormValues();
      setToggleButtonText(individualAddTeamMember.toggleText);
    } else {
      const memberData = {
        firstName: nominatedMember.firstName || '',
        lastName: nominatedMember.lastName || '',
        email: nominatedMember.email || '',
      };
      if (memberData.firstName !== '') {
        setValues(memberData);
        setDefaultValuesForForm(memberData);
      } else {
        setValue('firstName', '');
        setValue('lastName', '');
        setValue('email', '');
        setDefaultValuesForForm({
          firstName: '',
          lastName: '',
          email: '',
        });
      }
      setToggleButtonText(individualAddTeamMember.toggleTextInActive);
    }
  };

  const resetFormValues = () => {
    setDefaultValuesForForm({
      firstName: defaultValues.firstName,
      lastName: defaultValues.lastName,
      email: defaultValues.email,
    });
    setValues({
      firstName: defaultValues.firstName,
      lastName: defaultValues.lastName,
      email: defaultValues.email,
    });
  };

  return (
    <div className="flex flex-col h-screen justify-center">
      <ContentLayout>
        <form className="flex flex-col md:flex-row py-3 lg:px-[80px] lg:py-[48px] xl:px-[80px] xl:py-[48px] mt-0 lg:mt-[15vh]" onSubmit={handleSubmit(onSubmitData)}>
          <div className="w-full md:w-2/3">
            <Typography variant="heading-md" classes="font-bold text-grey-900 text-center lg:text-left xl:text-left">
              {individualAddTeamMember.header}
            </Typography>
            <Typography variant="body-sm" classes="font-medium text-grey-700 mt-3 text-center lg:text-left xl:text-left">
              {individualAddTeamMember.bodyText}
            </Typography>

            <Toggle
              data-cy="email-toggle"
              labelText={toggleButtonText}
              checked={isDisabled}
              classes="my-4 pt-[40px] hidden lg:block"
              onChange={() => handleToggle()}
            />

            <div className="w-full mt-10 lg:mt-4">
              <div className="flex flex-wrap -mx-2">
                <div className="px-2 w-1/2 lg:w-1/5 xl:w-1/5">
                  <Controller
                    control={control}
                    name="firstName"
                    render={({
                      field, fieldState,
                    }) => {
                      const { error } = fieldState;
                      setIsFirstNameEmpty(!field.value)
                      return (
                        <Input
                          width="w-full"
                          id={field.name}
                          type="text"
                          data-cy="first-name"
                          error={!!error}
                          errorMessage={error?.message}
                          {...field}
                          placeholder={placeholders.firstName}
                          disabled={isDisabled}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                      );
                    }}
                  />
                </div>
                <div className="px-2 w-1/2 lg:w-1/5 xl:w-1/5">
                  <Controller
                    control={control}
                    name="lastName"
                    render={({
                      field, fieldState,
                    }) => {
                      const { error } = fieldState;
                      settIsLastNameEmpty(!field.value)
                      return (
                        <Input
                          width="w-full"
                          id={field.name}
                          type="text"
                          data-cy="last-name"
                          error={!!error}
                          errorMessage={error?.message}
                          {...field}
                          placeholder={placeholders.lastName}
                          disabled={isDisabled}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                      );
                    }}
                  />
                </div>
                <div className="px-2 w-full mt-4 lg:w-[30%] lg:mt-0">
                  <Controller
                    control={control}
                    name="email"
                    render={({
                      field, fieldState,
                    }) => {
                      const { error } = fieldState;
                      setIsEmailEmpty(!field.value)
                      return (
                        <Input
                          width="w-full"
                          id={field.name}
                          type="text"
                          data-cy="email"
                          error={!!error}
                          errorMessage={error?.message}
                          {...field}
                          placeholder={placeholders.email}
                          disabled={isDisabled}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <Toggle
                data-cy="email-toggle"
                labelText={toggleButtonText}
                checked={isDisabled}
                classes="mt-4 lg:hidden"
                onChange={() => handleToggle()}
              />
              <div className="mt-[40px] hidden lg:block">
                <Button
                  disabled={isFormEmpty}
                  type="submit"
                  variant="solid"
                  size="sm"
                  data-cy="next"
                  className={`min-w-[120px] h-auto border rounded-md text-grey-900 font-semibold w-24 h-6 py-1 px-3 text-base ${isFormEmpty ? 'bg-grey-200 text-grey-500' : 'bg-rose-200 hover:bg-rose-300 border-rose-200'
                  }`}
                >
                  {individualAddTeamMember.buttonText}
                </Button>
              </div>
              <Alert />
            </div>
          </div>

          <div className="w-full md:w-1/3 lg:w-1/3 lg:pl-24 lg:relative md:relative fixed bottom-0 left-0 right-0 mdsm:static md:static lg:static bg-white lg:bg-transparent shadow-md lg:shadow-none mdsm:py-0 mdsm:mt-10 md:py-3 lg:py-0">
            <div className="rounded-xl p-6 lg:p-8 shadow-[0px_0px_20px_0px_rgba(0,0,0,0.06)] items-start border-0">
              <Typography variant="heading-md" classes="font-semibold hidden lg:block text-xl leading-7 text-grey-900">
                {individualAddTeamMember.priceHeader}
              </Typography>
              <Typography variant="body-sm" classes="font-normal lg:mt-3 hidden lg:block text-grey-700">
                {individualAddTeamMember.priceBody}
              </Typography>
              <div className="flex border rounded-md mt-3 lg:mt-8 items-center justify-center h-12 text-grey-300 border-solid">
                <div className="bg-red-200 p-3 rounded-l-md">
                  <UserGroup className="h-6 w-6 pl-0.5" />
                </div>
                <div className="flex-grow pl-2">
                  <Typography variant="body-sm" classes="font-normal text-grey-700 text-xs">
                    {individualAddTeamMember.memberCountText}
                  </Typography>
                </div>
                <div className="pl-2 pr-4">
                  <Typography variant="body-md" classes="font-bold text-grey-900 text-base">
                    {individualAddTeamMember.memberCount}
                  </Typography>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex-grow">
                  <div className="mt-3 lg:mt-8">
                    <Typography variant="body-md" classes="hidden lg:block text-base font-bold text-grey-900 pl-2 mt-2.5">
                      {individualAddTeamMember.total}
                      <span className="font-semibold">{individualAddTeamMember.price}</span>
                      <span className="text-xs font-normal">{individualAddTeamMember.vat}</span>
                    </Typography>
                    <Typography variant="body-md" classes="block lg:hidden text-base font-bold text-grey-900 pl-2 mt-2.5">
                      {individualAddTeamMember.total}
                      <span className="font-semibold">{individualAddTeamMember.price}</span><br />
                      <span className="text-xs font-normal">{individualAddTeamMember.vat}</span>
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex justify-end lg:hidden">
                {/* <Button
                  type="submit"
                  variant="solid"
                  size="md"
                  data-cy="next"
                  width="w-1/2"
                  disabled={isFormEmpty}
                >
                  {individualAddTeamMember.buttonText}
                </Button> */}
                <Button
                  disabled={isFormEmpty}
                  type="submit"
                  variant="solid"
                  size="sm"
                  data-cy="next"
                  className={`min-w-[120px] h-auto border rounded-md text-grey-900 font-semibold w-24 h-6 py-1 px-3 text-base ${isFormEmpty ? 'bg-grey-200 text-grey-500' : 'bg-rose-200 hover:bg-rose-300 border-rose-200'
                  }`}
                >
                  {individualAddTeamMember.buttonText}
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