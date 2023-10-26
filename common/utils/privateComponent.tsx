'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export function PrivateComponent ({ children }: Props) {
  const {
    data: session, status,
  } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (status === 'loading') {
      return;
    }

    if (!session) {
      router.push('/account/signin');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}

export default PrivateComponent;
