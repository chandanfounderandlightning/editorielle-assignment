'use client';
import { Typography } from "@/common/components/atoms/typography";
import lang from '@/common/lang';
import { Button } from '@/common/components/atoms';
import { useSession } from 'next-auth/react';
import { Loader } from "@/common/designSystem";

const { confirmationIndividual } = lang;

const ConfirmationIndividual = () => {

  const {
    data: session, status,
  } = useSession();

  if (status === 'loading') {
    return <Loader />;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-rose-300 overflow-y-auto">
      <div className="flex flex-col items-center py-40 px-8 lg:py-16 lg:px-6">
        <div className="w-full sm:w-96 flex flex-col items-center">
          <div className="items-center text-center">
            <Typography variant='body-sm' classes="text-white px-14 font-medium">
              {confirmationIndividual.header}
            </Typography>
            <Typography variant="heading-md" classes="font-semibold text-white mt-2 text-3xl">
              {`Congrats ${session?.user?.firstName || confirmationIndividual.firstName}!`}
            </Typography>
          </div>
          <div className="items-center">
            <Typography variant="span-sm" classes="text-white font-medium">
              {confirmationIndividual.message}
            </Typography>
            <div className='mt-20'>
              <Button
                variant='solid'
                size='sm'
                width='w-full'
                type='button'
                data-cy='confirmation-individual-button'
                className='mb-12 lg:mb-0 fixed bottom-0 left-7 right-7 lg:left-0 lg"right-0 w-[85%] lg:w-full sm:relative sm:bottom-auto rounded-3xl border-white bg-white text-black px-10 py-3 lg:px-[31%] lg:py-3 text-sm ease-in-out duration-500 hover:bg-grey-900 hover:text-white font-medium'
              >
                {confirmationIndividual.buttonText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationIndividual;
