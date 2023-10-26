export type SignInDTO = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type SignUpDTO = {
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  isAgreeTermAndConditions: boolean;
  isIndividual: boolean;
  isNominated: boolean;
};

export type InvitedMemberCreateAccountDTO = {
  password: string;
  passwordConfirmation: string;
  isAgreeTermAndConditions: boolean;
  emailVerificationToken: string;
};

export type SignUpVerificationDTO = {
  otp: string;
  email: string;
};

export type EmailVerificationDTO = {
  otp: string;
};

export type ResendOtpDTO = {
  email: string;
};

export type AddTeamMemberIndividualDTO = {
  firstName: string;
  lastName: string;
  email: string;
};

export type EditInvitedTeamMemberDTO = {
  firstName: string;
  lastName: string;
  email: string;
  pauseDate: string;
};

export type TeamMemberDTO = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type TeamDTO = {
  members: TeamMemberDTO[];
};

export type ChooseCategoriesDTO = {
  categories: string[];
};

export type SignUpResponseDTO = {
  data: User & Token;
}

export type ForgotPasswordDTO = {
  email: string;
}

export type ResetPasswordDTO = {
  token?: string;
  email?: string;
  password: string;
  passwordConfirmation: string;
}

export type SignInResponseDTO = {
  data: User & Token;
}

export type User = {
  id: number;
  email: string;
}

export type Token = {
  token: string;
  type?: string;
}

export type AuthState = {
  user: User | null
  token: Token | null
}

export type UserInfoGeneral = {
  firstName: string;
  lastName: string;
  email: string;
}

export type BusinessInfoGeneral = {
  businessName: string;
}

export type PauseSendoutsPlan = {
  pauseTill: string;
}

export type ResetPasswordGeneral = {
  oldPassword: string;
  password: string;
  passwordConfirmation: string;
}

export type UpdatePaymentCardDetails = {
  payment: string;
}
export type ErrorModalData = {
  heading: string;
  bodyText: string;
  buttonText: string;
  secondButtonText: string;
  buttonLink: string | (() => void) | null;
  secondButtonLink: string | (() => void) | null | ((data:any) => Promise<void>);
};

export type DeleteAccountDTO = {
  reason: string;
  other?: string;
};