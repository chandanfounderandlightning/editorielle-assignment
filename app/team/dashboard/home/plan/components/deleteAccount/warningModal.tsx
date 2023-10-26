'use client';
import {
  Listbox, Dialog, Transition, 
} from '@headlessui/react';
import {
  ExclamationTriangleIcon, ChevronUpDownIcon, 
} from '@heroicons/react/24/outline';
import { Button } from '@/common/components/atoms';
import { Typography } from '@/common/components/atoms/typography';
import { InputFields } from '@/app/team/dashboard/team/members/add-team-member/fields';
import {
  useForm, Controller, 
} from 'react-hook-form';
import { useDeleteAccount } from './useDeleteAccount';
import { useRouter } from 'next/navigation';
import { Loader } from '@/common/designSystem';
import {
  useEffect, useState, 
} from 'react';

const options = [
  {
    id: 0,
    name: 'I’m deleting my account because...', 
  },
  {
    id: 1,
    name: 'Too expensive', 
  },
  {
    id: 2,
    name: 'Not using it enough', 
  },
  {
    id: 3,
    name: 'Hired a PR agency/freelancer', 
  },
  {
    id: 4,
    name: 'Not securing enough press coverage', 
  },
  {
    id: 5,
    name: 'Switching service', 
  },
  {
    id: 6,
    name: 'Other', 
  },
];

function classNames (...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function DeletionFeedbackModal ({
  isOpen,
  setOpen,
  heading,
  bodyText,
  buttonText,
  secondButtonText,
  buttonLink,
  secondButtonLink,
  zIndex = 'z-10',
  secondButtonClass = 'text-grey-900',
}: any) {
  const router = useRouter();
  const {
    control, watch, handleSubmit,
  } = useForm();
  const reason = watch("reason");
  const otherFieldActivate = reason?.id === 6;

  const {
    onDeleteButton, Alert, isLoading,
  } = useDeleteAccount();
  const [selectedOptionId, setSelectedOptionId] = useState(options[0].id);
  const [submitButtonClass, setSubmitButtonClass] = useState('w-full lg:w-1/2 justify-center rounded-md border border-grey-200 bg-grey-50 px-3 py-2 text-sm font-semibold text-grey-500');
  useEffect(() => {
    if (reason) {
      setSelectedOptionId(reason.id);
      if (reason.id !== 0) {
        setSubmitButtonClass(`w-full lg:w-1/2 justify-center rounded-md border border-grey-300 bg-white px-3 py-2 text-sm font-semibold ${secondButtonClass} shadow-sm hover:bg-grey-50`)
      } else {
        setSubmitButtonClass('w-full lg:w-1/2 justify-center rounded-md border border-grey-200 bg-grey-50 px-3 py-2 text-sm font-semibold text-grey-500');
      }
    }
  }, [reason]);

  return (
    <Transition.Root show={isOpen} as="div">
      {isLoading && <Loader />}
      <Dialog as="div" className={`relative ${zIndex}`} onClose={setOpen}>
        <form onSubmit={handleSubmit(onDeleteButton)}>
          <Transition.Child
            as="div"
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as="div"
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-[30rem] sm:w-[30rem] sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-200">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Typography
                        variant="heading-md"
                        classes="text-base font-semibold leading-6 text-gray-900"
                      >
                        {heading}
                      </Typography>
                      <div className="mt-2">
                        <Typography
                          variant="body-sm"
                          classes="text-sm text-gray-500"
                        >
                          {bodyText}
                        </Typography>
                      </div>
                    </div>
                    <div className="my-4">
                      <Controller
                        name="reason"
                        control={control}
                        defaultValue={options[0]}
                        render={({ field }) => (
                          <Listbox value={field.value} onChange={field.onChange}>
                            {({ open }) => (
                              <>
                                <div className="relative mt-2">
                                  <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-grey-300 focus:outline-none sm:text-sm sm:leading-6">
                                    <span
                                      className={classNames(
                                        field.value.id === 0
                                          ? 'text-grey-400'
                                          : 'text-gray-900',
                                        'block truncate',
                                      )}
                                    >
                                      {field.value.name}
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                      <ChevronUpDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  </Listbox.Button>

                                  <Transition
                                    show={open}
                                    as="div"
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                  >
                                    <Listbox.Options data-cy="deleteReasons" className="static mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                      {options.map((option: any) => (
                                        <Listbox.Option
                                          as="li"
                                          key={option.id}
                                          className={({ active }) =>
                                            classNames(
                                              option.id === 0
                                                ? 'text-grey-400'
                                                : active
                                                  ? 'bg-grey-50 text-grey-900 text-sm font-normal'
                                                  : 'text-grey-900 text-sm font-normal',
                                              'relative cursor-default select-none py-2 px-3',
                                            )
                                          }
                                          value={option}
                                        >
                                          {({ selected }) => (
                                            <span
                                              className={classNames(
                                                selected
                                                  ? 'font-semibold'
                                                  : 'font-normal',
                                                'block truncate',
                                              )}
                                            >
                                              {option.name}
                                            </span>
                                          )}
                                        </Listbox.Option>
                                      ))}
                                    </Listbox.Options>
                                  </Transition>
                                </div>
                              </>
                            )}
                          </Listbox>
                        )}
                      />
                      {otherFieldActivate && (
                        <div className="mt-4">
                          <InputFields
                            control={control}
                            name={'other'}
                            type={'text'}
                            dataCy={'other'}
                            labelText={'Please detail why'}
                            data-cy="otherField"
                          />
                        </div>
                      )}
                      <Alert />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row mt-5 sm:mt-6">
                    {secondButtonText && (
                      <>
                        <Button
                          type="button"
                          variant="solid"
                          size="sm"
                          data-cy="goBackButton"
                          className="w-full lg:w-1/2 justify-center rounded-md bg-rose-200 px-3 py-2 text-sm font-semibold text-grey-900 shadow-sm hover:bg-rose-300 mb-5 sm:mb-0 sm:mr-4"
                          onClick={() => {
                            setOpen(false);
                            if (typeof buttonLink === 'string') {
                              router.push(buttonLink);
                            } else if (typeof buttonLink === 'function') {
                              buttonLink();
                            }
                          }}
                        >
                          {buttonText}
                        </Button>
                        <Button
                          type="submit"
                          variant="solid"
                          size="sm"
                          data-cy="deleteAccount"
                          disabled={selectedOptionId === 0}
                          className={submitButtonClass}
                        >
                          {secondButtonText}
                        </Button>
                      </>
                    )}
                  </div>
                  {!secondButtonText && (
                    <div className="mt-5 sm:mt-6">
                      <Button
                        type="button"
                        variant="solid"
                        size="sm"
                        className={`inline-flex w-full justify-center rounded-md bg-rose-200 px-3 py-2 text-sm text-grey-900 font-semibold shadow-sm hover:bg-rose-300`}
                        onClick={() => {
                          setOpen(false);
                          if (typeof buttonLink === 'string') {
                            router.push(buttonLink);
                          } else if (typeof buttonLink === 'function') {
                            buttonLink();
                          }
                        }}
                      >
                        {buttonText}
                      </Button>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </form>
      </Dialog>
    </Transition.Root>
  );
}
