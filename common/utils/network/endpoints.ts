const apiRootUrl =
  `${process.env.NEXT_PUBLIC_API_URL}/api/v1` || "http://localhost:1010/api/v1";
export const mixpanelToken = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

export const verifySignUpUrl = `${apiRootUrl}/account/signup-verification`;
export const getCategoriesUrl = `${apiRootUrl}/categories`;
export const getPricingUrl = `${apiRootUrl}/pricing`;
export const signInUrl = `${apiRootUrl}/login`;
export const logoutUrl = `${apiRootUrl}/logout`;
export const forgotPasswordUrl = `${apiRootUrl}/forgot-password`;
export const resetPasswordUrl = `${apiRootUrl}/reset-password`;
export const resendOtpUrl = `${apiRootUrl}/resend/verification-otp`;
export const verifyEmailUrl = `${apiRootUrl}/verify-otp`;
export const signUpInvitedMember = `${apiRootUrl}/account/invited-member/create-account`;
export const updatePassword = `${apiRootUrl}/change-password`;
export const currentPlan = `${apiRootUrl}/plans`;
export const userCardDetails = `${apiRootUrl}/users/cards`;
export const stripeDetails = `${apiRootUrl}/stripe-details`;
export const notificationDetails = `${apiRootUrl}/profile/notifications`;

export const individual = {
  signUpUrl: `${apiRootUrl}/individual/register`,
  addTeamMemberUrl: `${apiRootUrl}/individual/daily-newsletter/members`,
  sendCategoriesUser: `${apiRootUrl}/individual/user-categories`,
  signUpVerifyUrlFE: `/individual/account/signup-verification`,
  addTeamMemberUrlFE: `/individual/add-team-member`,
  chooseCategoriesFE: `/individual/choose-categories`,
};

export const team = {
  signUpUrl: `${apiRootUrl}/team/register`,
  addTeamMemberUrl: `${apiRootUrl}/team/daily-newsletter/members`,
  sendCategoriesUser: `${apiRootUrl}/team/user-categories`,
  signUpVerifyUrlFE: `/team/account/signup-verification`,
  addTeamMemberUrlFE: `/team/add-team-member`,
  chooseCategoriesFE: `/team/choose-categories`,
  updateUserInfoDashboard: `${apiRootUrl}/general-information`,
  verifyEmailDashboard: `${apiRootUrl}/team/email/verify-otp`,
  updateBusinessInfoDashboard: `${apiRootUrl}/business-name`,
  resendEmailVerificationCode: `${apiRootUrl}/email/resend-otp`,
  getMembersWithStatus: `${apiRootUrl}/team/members`,
  postMembersSelectedData: `${apiRootUrl}/team/members/categories`,
  pauseMember: `${apiRootUrl}/team/members/pause`,
  pausePlanPage: `${apiRootUrl}/users/sendouts`,
  deleteAccount: `${apiRootUrl}/users`,
  getTeamInfo: `${apiRootUrl}/user-info`,
};
