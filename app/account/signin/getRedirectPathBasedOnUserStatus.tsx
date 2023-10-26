'use client';
export function getRedirectPathBasedOnUserStatus (user:
  {
    email: string;
    firstName: string;
    lastName: string;
    isVerified: boolean;
    step: string;
    role: string;
    id: number;
  } & { name?: string | null | undefined; email?: string | null | undefined; image?: string | null | undefined; }) {
  const isIndividualAdmin = user.role === 'individual_admin';
  const isTeamAdmin = user.role === 'team_admin';
  const isTeamMember = user.role === 'team_member';
  const isIndividualMember = user.role === 'individual_member';
  if (isIndividualAdmin) {
    switch (user.step) {
    case 'subscribed':
      return '/admin';
    case 'category_selected':
      return '/individual/choose-categories';
    case 'member_added':
      return '/individual/choose-categories';
    case 'verified':
      return '/individual/add-team-member';
    case 'not_verified':
      return `/individual/account/signup-verification?email=${user.email}`;
    }
  }

  if (isTeamAdmin) {
    switch (user.step) {
    case 'subscribed':
      return '/team/dashboard/home/general';
    case 'category_selected':
      return '/team/choose-categories';
    case 'member_added':
      return '/team/choose-categories';
    case 'verified':
      return '/team/add-team-member';
    case 'not_verified':
      return `/team/account/signup-verification?email=${user.email}`;
    }
  }

  if (isTeamMember) {
    return '/team/member/dashboard';
  }

  if (isIndividualMember) {
    return '/individual/member/dashboard';
  }
}
