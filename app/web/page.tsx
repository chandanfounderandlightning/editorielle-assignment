'use client';
import React from 'react';
import lang from '@/common/lang';
import { useRouter } from "next/navigation";
import { Button } from "@/common/components/atoms";
import { BoltOrangeImage } from "@/common/components/icons";
import Logo from "@/stories/assets/logo.png"
import Image from 'next/image'

const { exampleWebPage: webCopy } = lang;

const WebPage = () => {
  const router = useRouter();

  return (
    <section>
      <header>
        <div className="flex row-auto items-center justify-center px-4 sm:px-6 lg:px-8 gap-5">
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
            src={Logo}
            alt="Editorielle Logo"
            width={90}
          />
        </div>
      </header>
      <div className="flex flex-row items-center space-x-1 justify-center mt-10">
        <Button
          variant="solid"
          size="md"
          data-cy="button-sign-up-individual"
          onClick={() => router.push('/individual/account/signup')}
          className='bg-grey-900 text-rose-200 rounded-md px-4 py-2 text-base font-medium'
        >
          Individual {webCopy.signUp}
        </Button>
        <Button
          variant="solid"
          size="md"
          data-cy="button-sign-up-team"
          onClick={() => router.push('/team/account/signup')}
          className='bg-grey-900 text-rose-200 rounded-md px-4 py-2 text-base font-medium'
        >
          Team {webCopy.signUp}
        </Button>
        <Button
          variant="solid"
          size="md"
          data-cy="button-sign-in"
          onClick={() => router.push('/account/signin')}
          className='bg-grey-900 text-rose-200 rounded-md px-4 py-2 text-base font-medium'
        >
          {webCopy.login}
        </Button>
      </div>
    </section>
  );
};

export default WebPage;
