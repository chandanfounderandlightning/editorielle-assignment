import {
  Fragment, useEffect, useState,
} from 'react';
import {
  Dialog, Transition,
} from '@headlessui/react';
import { Typography } from '@/common/components/atoms/typography';
import { Button } from '@/common/components/atoms/button';
import { Loader } from '@/common/designSystem';
import { useEditTeamMember } from './useEditTeamMember';
import {
  isMemberActive, dateString,
} from './utils';
import { InputFields } from '../add-team-member/fields';
import ErrorModal from '@/common/components/atoms/modal/error';

const EditMemberSlideOver = ({
  openStatus,
  setOpenStatus,
  description: description = 'Description',
  firstNameLabel,
  lastNameLabel,
  emailLabel,
  pauseTitle,
  pauseInfo,
  cancelButton,
  submitButton,
  memberId,
  pauseDateLabel,
  pauseButtonText,
  adminId,
}: any) => {

  const activeClass = 'border-green-600 text-green-700 bg-green-50';
  const pauseClass = 'border-grey-600 text-grey-700 bg-grey-50';


  const {
    closePopup,
    Alert,
    name,
    pauseTill,
    isLoading,
    onSubmitData,
    handleDelete,
    isMutating,
    handleSubmit,
    control,
    isPauseSendoutDisabled,
    pauseSendOut,
    pauseLoading,
    className,
    warningModal,
    warningModalData,
    setWarningModal,
  } = useEditTeamMember({
    setOpenStatus,
    memberId,
  });

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
                    {(isMutating || isLoading || pauseLoading) && <Loader />}
                    <div className="bg-rose-200 px-6 py-6 sm:px-6">
                      <div className="flex items-center">
                        <Typography
                          variant="heading-md"
                          classes="text-grey-900 text-base font-semibold"
                        >
                          {name}
                        </Typography>
                        <p className={`text-xs font-medium py-0.5 px-1.5 border rounded-md ml-3 ${isMemberActive(pauseTill) !== 1 ? activeClass :  pauseClass}`}>
                          {isMemberActive(pauseTill) !== 1 ? 'Active' : 'Paused'}
                        </p>
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
                        < hr className="border-t border-grey-100 h-px mt-8 mb-6" />
                        <div className="w-[96%] px-6 lg:px-0">
                          <Typography
                            variant="heading-md"
                            classes="text-grey-900 text-base font-semibold"
                          >
                            {pauseTitle}
                          </Typography>
                          <Typography
                            variant="body-sm"
                            classes="pt-1 text-grey-700 text-sm font-normal mt-6 lg:mt-4"
                          >
                            {pauseInfo}
                          </Typography>
                        </div>
                        <div className="w-full mt-6 px-6 lg:px-0">
                          <InputFields
                            control={control}
                            name={'pauseDate'}
                            type={"text"}
                            dataCy={'pauseDate'}
                            labelText={pauseDateLabel}
                            placeholder='DD/MM/YYYY'
                            min={dateString}
                          />
                          <Button
                            variant="solid"
                            size="sm"
                            type="button"
                            onClick={pauseSendOut}
                            data-cy={'pauseSendoutButton'}
                            disabled={isPauseSendoutDisabled}
                            className={`mt-6 px-3 py-1.5 text-sm rounded-md font-semibold ${isPauseSendoutDisabled === true ? 'text-grey-500 bg-grey-50 border border-grey-200' : 'text-grey-900 bg-rose-200 hover:bg-rose-300'}`}
                          >
                            {pauseButtonText}
                          </Button>
                        </div>
                        <div className="w-full px-6 lg:px-0">
                          <Alert />
                        </div>
                        <hr className={`${className} w-full border-t h-px border-grey-100 bottom-[5.25rem] left-0`} />
                        <div className={`${className} pl-0 lg:fixed lg:pl-0 left-0 bottom-0 right-0 my-6 mx-6 lg:mr-4 flex flex-row justify-between lg:px-6`}>
                          {memberId !== adminId ? (
                            <Button
                              variant="solid"
                              size="sm"
                              type="button"
                              onClick={handleDelete}
                              className="bg-white border border-grey-300 text-red-500 rounded-md px-3 py-1.5 text-sm font-semibold"
                            >
                              Delete
                            </Button>
                          ) : (
                            <div></div>
                          )}
                          <div className="flex">
                            <Button
                              variant="solid"
                              size="sm"
                              type="button"
                              onClick={closePopup}
                              className="bg-white border border-grey-300 rounded-md text-grey-600 px-3 py-1.5 text-sm font-semibold mr-2"
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
                        </div>
                      </form>
                      <ErrorModal
                        isOpen={warningModal}
                        setOpen={setWarningModal}
                        heading={warningModalData.heading}
                        bodyText={warningModalData.bodyText}
                        buttonText={warningModalData.buttonText}
                        secondButtonText={warningModalData.secondButtonText}
                        buttonLink={warningModalData.buttonLink}
                        secondButtonLink={warningModalData.secondButtonLink}
                        zIndex={`z-[100]`}
                        secondButtonClass={`text-red-500`}
                      />
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
}

export default EditMemberSlideOver;