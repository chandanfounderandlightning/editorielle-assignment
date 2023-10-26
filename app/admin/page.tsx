'use client';
import { ContentLayout } from '@/common/designSystem';
import { Button } from "@/common/components/atoms/button";
import { Typography } from "@/common/components/atoms/typography";
import { useRouter } from "next/navigation";
import { PrivateComponent } from "@/common/utils/privateComponent";
import React from "react";
import lang from "@/common/lang";
import { useLogout } from "@/common/utils/useLogout";

const { exampleWebPage: webCopy } = lang;

const AdminPage = () => {
  const router = useRouter();
  const { handleLogout } = useLogout();

  return (
    <PrivateComponent>
      <ContentLayout>
        <div
          className="flex flex-col justify-center items-center w-screen gap-2 mt-10"
        >
          <Typography variant="heading-md" classes="text-center font-semibold text-grey-900 mb-12" data-cy="login-success-heading">
            {webCopy.loggedIn}
          </Typography>
          <Button
            type="button"
            variant="solid"
            size="sm"
            data-cy="button-test-logout"
            onClick={handleLogout}
          >
            {webCopy.logout}
          </Button>
          <Button
            type="button"
            variant="solid"
            size="sm"
            data-cy="button-test-payment"
            onClick={() => router.push('/payment')}
          >
            {webCopy.payment}
          </Button>
        </div>
      </ContentLayout>
    </PrivateComponent>
  );
};

export default AdminPage;
