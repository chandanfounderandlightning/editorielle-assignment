import { Fragment } from 'react';
import {
  Dialog, Transition,
} from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/common/components/atoms';
import { Typography } from '@/common/components/atoms/typography';
import { useRouter } from 'next/navigation';

export default function ErrorModal ({
  isOpen, setOpen, heading, bodyText, buttonText, secondButtonText, buttonLink, secondButtonLink, zIndex = 'z-10', secondButtonClass = 'text-grey-900'
}: any) {
  const router = useRouter();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className={`relative ${zIndex}`} onClose={setOpen}>
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

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
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
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Typography variant="heading-md" classes="text-base font-semibold leading-6 text-gray-900">
                      {heading}
                    </Typography>
                    <div className="mt-2">
                      <Typography variant="body-sm" classes="text-sm text-gray-500">
                        {bodyText}
                      </Typography>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row mt-5 sm:mt-6">
                {secondButtonText && (
                  <>
                    <Button
                      type="button"
                      variant='solid'
                      size='sm'
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
                      type="button"
                      variant='solid'
                      size='sm'
                      className={`w-full lg:w-1/2 justify-center rounded-md border border-grey-300 bg-white px-3 py-2 text-sm font-semibold ${secondButtonClass} shadow-sm hover:bg-grey-50`}
                      onClick={() => {
                        setOpen(false);
                        if (typeof secondButtonLink === 'string') {
                          router.push(secondButtonLink);
                        } else if (typeof secondButtonLink === 'function') {
                          secondButtonLink();
                        }
                      }}
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
                    variant='solid'
                    size='sm'
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
      </Dialog>
    </Transition.Root>
  )
}
