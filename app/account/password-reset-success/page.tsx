'use client';
import { useRouter } from 'next/navigation';
import { ContentLayout } from '@/common/designSystem';
import { Typography } from "@/common/components/atoms/typography";
import { Button } from "@/common/components/atoms/button";
import lang from '@/common/lang';

const { passwordResetSuccess } = lang;
const PasswordResetSuccess = () => {
  const router = useRouter();
  return (
    <ContentLayout>
      <div className="flex items-center flex-col mt-[10vw]">
        <Typography variant="heading-md" classes="text-center font-semibold text-grey-900">
          {passwordResetSuccess.header}
        </Typography>
        <Typography variant='body-sm' classes='text-center text-grey-500'>
          {passwordResetSuccess.instruction}
        </Typography>
        <div className="mt-8">
          <Button
            type="button"
            variant="solid"
            size="sm"
            data-cy="login"
            width="w-full"
            onClick={() => router.push('/account/signin')}
          >
            {passwordResetSuccess.login}
          </Button>
        </div>
      </div>
    </ContentLayout>
  );
};

export default PasswordResetSuccess;
