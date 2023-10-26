import { Fragment } from 'react';
import {
  Dialog, Transition,
} from '@headlessui/react';
import { Typography } from '@/common/components/atoms/typography';
import { Button } from '@/common/components/atoms/button';
import { useAddTeamMember } from './useAddTeamMember';
import { AddTeamSlideOverParams } from './types';
import { InputFields } from './fields';

const SlideOver = ({
  openStatus,
  setOpenStatus,
  title: title = 'Title',
  description: description = 'Description',
  firstNameLabel,
  lastNameLabel,
  emailLabel,
  info,
  cancelButton,
  submitButton,
}: AddTeamSlideOverParams) => {
  const {
    closePopup, handleSubmit, onSubmitData, control, Alert,
  } = useAddTeamMember({ setOpenStatus });

  return (
    <Transition.Root show={openStatus} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closePopup}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#0000004F] bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0" />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="bg-rose-200 px-6 py-6 sm:px-6">
                      <div className="flex items-center justify-between">
                        <Typography
                          variant="heading-md"
                          classes="text-grey-900 text-base font-semibold"
                        >
                          {title}
                        </Typography>
                      </div>
                      <div className="mt-1">
                        <Typography
                          variant="body-sm"
                          classes="pt-1 text-grey-900 text-sm font-normal mt-1"
                        >
                          {description}
                        </Typography>
                      </div>
                    </div>
                    <div className="relative flex-1 py-6 sm:px-6">
                      <form onSubmit={handleSubmit(onSubmitData)} noValidate>
                        <div className="flex flex-col px-6 lg:px-0">
                          <div className="w-full">
                            <InputFields
                              control={control}
                              name={'firstName'}
                              type={"text"}
                              dataCy={'first-name'}
                              labelText={firstNameLabel}
                            />
                          </div>
                          <div className="w-full mt-6">
                            <InputFields
                              control={control}
                              name={'lastName'}
                              type={"text"}
                              dataCy={'last-name'}
                              labelText={lastNameLabel}
                            />
                          </div>
                        </div>
                        <div className="w-full mt-6 px-6 lg:px-0">
                          <InputFields
                            control={control}
                            name={'email'}
                            type={"email"}
                            dataCy={'email'}
                            labelText={emailLabel}
                          />
                        </div>
                        <div className="w-[96%] px-6 lg:px-0">
                          <Typography
                            variant="body-sm"
                            classes="pt-1 text-grey-700 text-sm font-normal mt-6 lg:mt-4"
                            data-cy={'messageInAddMemberForm'}
                          >
                            {info}
                          </Typography>
                        </div>
                        <div className="w-full px-6 lg:px-0">
                          <Alert />
                        </div>
                        <hr className="w-full border-t h-px border-grey-100 fixed bottom-[5.25rem] left-0" />
                        <div className="fixed pl-0 mdsm:static mdsm:pl-[10.3rem] lg:fixed lg:pl-0 bottom-0 right-0 my-6 mr-6 lg:mr-4 flex flex-row lg:px-6">
                          <Button
                            variant="solid"
                            size="sm"
                            type="button"
                            onClick={closePopup}
                            className="bg-white border border-grey-300 rounded-md text-grey-600 px-3 py-1.5 text-sm font-semibold lg:mb-0 mr-2"
                          >
                            {cancelButton}
                          </Button>
                          <Button
                            variant="solid"
                            size="sm"
                            type="submit"
                          >
                            {submitButton}
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SlideOver;
