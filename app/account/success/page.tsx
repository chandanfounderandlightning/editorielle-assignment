'use client';
import { useRouter } from 'next/navigation';
import { ContentLayout } from '@/common/designSystem';
import { Typography } from "@/common/components/atoms/typography";
import { Button } from "@/common/components/atoms/button";
import lang from '@/common/lang';
import { signInFEUrl } from '@/common/utils/network/appRoutes';

const { resetPassword } = lang;
const Success = () => {
  const router = useRouter();
  return (
    <ContentLayout>
      <div className="flex flex-col items-center mt-[25vh]">
        <Typography variant="heading-md" classes="text-2xl text-center font-bold text-grey-900">
          {resetPassword.success}
        </Typography>
        <Typography variant="body-md" classes="text-sm text-center font-medium text-grey-500 mt-2">
          {resetPassword.descriptionLine1}<br/>
          {resetPassword.descriptionLine2}
        </Typography>
        <div className="mt-8">
          <Button
            type="button"
            variant="solid"
            size="sm"
            data-cy="login"
            width="w-full"
            onClick={() => router.push(signInFEUrl)}
          >
            {resetPassword.login}
          </Button>
        </div>
      </div>
    </ContentLayout>
  );
};

export default Success;
