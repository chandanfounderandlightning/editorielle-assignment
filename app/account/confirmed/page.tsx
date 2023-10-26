'use client';
import { useRouter } from "next/navigation";
import { ContentLayout } from '@/common/designSystem';
import { Button } from "@/common/components/atoms";
import { Typography } from "@/common/components/atoms/typography";
import {
  signOut, useSession,
} from "next-auth/react";
import useSWRMutation from "swr/mutation";
import { logoutUrl } from "@/common/utils/network/endpoints";
import { authorizedFetcher } from "@/common/utils/network/baseFetcher";
import { useEffect } from "react";
import lang from '@/common/lang';

const { confirmEmailSuccess } = lang;

const Confirmed = () => {
  const session = useSession();
  const signOutOnBE = useSWRMutation(
    logoutUrl, authorizedFetcher);
  const { trigger } = signOutOnBE;
  const router = useRouter();


  useEffect(() => {
    const handleLogout = async () => {
      const token = session?.data?.token;
      if (token) {
        const headers = {
          Authorization: `Bearer ${session?.data?.token}`,
        };
        await trigger({
          method: 'POST',
          headers,
        });
      }
      await signOut({ redirect: false });
    };
    void handleLogout();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ContentLayout>
      <div className="flex items-center flex-col">
        <div className="w-full flex items-center flex-col">
          <Typography variant="heading-md" classes="text-center font-semibold text-grey-900">
            {confirmEmailSuccess.header}
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
              {confirmEmailSuccess.login}
            </Button>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default Confirmed;
