const exampleAdminPage = {
  title: "Admin Page",
};

const exampleWebPage = {
  title: " Platform Template",
  visitDocsText: "Visit Documentation",
  signUp: "Sign up",
  login: "Log in",
  logout: "Log out",
  payment: "Payment",
  loggedIn: "You are signed in successfully!",
};

const signUp = {
  header: "Get started with Editorielle",
  firstName: "First name",
  lastName: "Last name",
  email: "Email",
  businessName: "Business name",
  businessPlaceholder: "Enter Business Name",
  emailPlaceholder: "Email address",
  password: "Password",
  passwordPlaceholder: "Password",
  confirmPassword: "Re-enter password",
  submitButtonLabel: "Create account",
  iAgree: "I agree to the",
  terms: "Terms & Conditions",
  acknowledge: "and acknowledge the",
  privacyPolicy: "Privacy Policy",
  accountExists: "Already a member?",
  login: "Sign in",
  errorSigningUp: "Error signing up",
  errorFirstName: "Please enter your first name",
  errorLastName: "Please enter your last name",
  errorEmail: "Please enter a valid email address",
  errorPassword: "Please enter a valid password",
};

const signIn = {
  header: "Sign in to Editorielle",
  email: "Email",
  emailPlaceholder: "Email address",
  password: "Password",
  passwordPlaceholder: "Password",
  submitButtonLabel: "Sign in",
  forgotPassword: "Forgot password?",
  notAMember: "Not a member?",
  createAccount: "Create an account",
  donthaveAccount: "Don’t have an account?",
  signUp: "Sign up",
  signInError: "Please enter a valid email and password",
  rememberMe: "Remember me",
};

const forgotPassword = {
  resetPassword: "Reset password",
  instructions:
    "Please enter your email and we’ll send you instructions on how to reset your password",
  emailAddress: "Email",
  sendEmail: "Send email",
  noEmail: "Didn’t receive an email?",
  contactSupport: "Contact support",
  resend: "Resend",
  errorResettingPassword: "Error resetting password",
  success: "Email sent, please check your inbox!",
};

const resetPassword = {
  header: "Reset password",
  headerSuccess: "Password reset",
  instruction: "Please enter your new password",
  newPassword: "Password",
  confirmPassword: "Re-enter password",
  resetPasswordCTA: "Reset password",
  success: "Password reset",
  successMessage:
    "Your password has been reset. Please sign in to your account",
  error: "Error resetting password",
  login: "Sign in",
  descriptionLine1: "Your password has been reset.",
  descriptionLine2: " Please sign in to your account!",
};

const auth = {
  emailFormat: "Please enter a valid email address",
  passwordFormat: "Please enter a valid password",
  fieldRequired: "This field is required",
  passwordValidationCheck: "Please make sure your passwords match",
  password: {
    uppercase: "One uppercase character",
    lowercase: "One lowercase character",
    number: "One number",
    special: "One special character",
    length: "10 characters minimum",
  },
  consent: "Please accept to continue",
  minimumCharactersFN: "First name should have at least 2 characters",
  minimumCharactersLN: "Last name should have at least 2 characters",
  minimumCharactersBN: "Business name should have at least 2 characters",
  requiredFirstName: "Please enter your first name",
  requiredLastName: "Please enter your last name",
  specialCharactersFN:
    "Please remove special characters or numbers in first name",
  specialCharactersLN:
    "Please remove special characters or numbers in last name",
  emailValidation: "Please enter an email address",
};

const signUpSuccess = {
  header: "You have signed up successfully!",
  login: "Sign in",
};

const passwordResetSuccess = {
  header: "Password reset",
  login: "Sign in",
  instruction:
    "Your password has been reset.<br /> Please sign in to your account!",
};

const confirmEmailSuccess = {
  header: "Your account email has been confirmed",
  login: "Sign in",
};

const signUpVerification = {
  header: "Thanks!",
  instructions:
    "Please verify your email by entering the confirmation code sent to ",
  code: "Verification code",
  verifyAccount: "Verify account",
  noCode: "Didn’t receive a code?",
  resendCode: "Resend code",
  error: "Error verifying account",
  errorResendingCode: "Error resending code",
  codeSuccess: "Code sent!",
  emailDefault: "your email used while signing up!",
  codeExpired: "Your code has expired, make sure you send a new one",
  accountVerified: "Account verified, redirecting you to Editorielle",
  lengthValidation: "Verification code must be 6 digits long",
  requiredText: "Please enter the code sent to your email",
  numberValidation: "Verification code must be 6 digits long",
};

const individualAddTeamMember = {
  header: "Who will receive the daily newsletter?",
  bodyText: "If it’s not you, please change the details below!",
  toggleText: "Send to the account holder’s email address",
  buttonText: "Next",
  priceHeader: "Your plan",
  priceBody: "Tailored for you",
  memberCountText: "Number of members",
  memberCount: "1x",
  total: "Total: ",
  price: "£10/month",
  vat: " + VAT",
  toggleTextInActive: "Send to a different email address",
};

const teamAddTeamMember = {
  header: "Who will receive the daily newsletter?",
  bodyText:
    "Add the details of all team members who should receive Editorielle blasts. You can add between 2-7 members here. Don’t worry, you can add more later!",
  bodyTextSmallDevices:
    "Add the details of all team members you’d like to become Editorielle members!",
  toggleText: "Make the account admin a member",
  buttonText: "Next",
  priceHeader: "Your plan",
  priceBody: "Tailored for you",
  memberCountText: "Number of members",
  memberCount: "1x",
  total: "Total: ",
  price: "£10/month",
  vat: " + VAT",
  toggleTextInActive: "Send to a different email address",
};

const individualChooseCategories = {
  header: "Select your instant categories",
  bodyText:
    "Get a headstart! Receive round-the-clock alerts for your chosen categories before they appear in the newsletter.",
  bodyText1: "Change, add or remove them at any time!",
  backButton: "Back",
  nextButton: "Next",
  paymentButton: "Continue to payment",
  priceHeader: "Your plan",
  priceBody: "Tailored for you",
  memberCountText: "Number of members",
  memberCount: "1x",
  total: "Total: ",
  price: "£10/month",
  vat: " + VAT",
  categoryText: "Number of instant categories",
  successMessage: "Categories updated successfully!",
};

const paymentErrorModal = {
  heading: "Payment didn’t go through",
  bodyText:
    "Something went wrong with your payment. Please check your details and try again.",
  buttonText: "Try again",
};

const confirmationIndividual = {
  header: "Editorielle",
  firstName: "Harry",
  lastName: "Potter",
  message: "Thank you for being our newest member",
  buttonText: "Let’s get going",
};

const confirmationTeam = {
  header: "Editorielle",
  firstName: "Harry",
  lastName: "Potter",
  message: "Thank you for being our newest members",
  buttonText: "Let’s get going",
};

const invitedMemberConfirmationTeam = {
  header: "Editorielle",
  firstName: "Harry",
  lastName: "Potter",
  message: "Thank you for being our newest member",
  buttonText: "Let’s get going",
};

const invitedMemberCreateAccount = {
  headerLine1: "Hi",
  headerLine2: "Let’s get started with Editorielle.",
  password: "Password",
  errorPassword: "Please enter a valid password",
  confirmPassword: "Re-enter password",
  iAgree: "I agree to the",
  terms: "Terms & Conditions",
  submitButtonLabel: "Create account",
  accountExists: "Already a member?",
  login: "Sign in",
  errorSigningUp: "Error signing up",
};

const generalDashboardHomeTeam = {
  userInformation: "Account owner information",
  userInfoDesc: "Personal information tied to your account.",
  firstName: "First name",
  lastName: "Last name",
  email: "Email",
  saveButton: "Save changes",
  changePassword: "Change password",
  errorEmail: "Please enter a valid email address",
  businessInformation: "Business information",
  businessInfoDesc: "Information tied to your admin account.",
  businessName: "Business name",
  empty: "Field cannot be empty",
  resetPassword: "Reset password",
  resetPassDesc: "Change the password tied to your account.",
  currentPassword: "Current password",
  newPassword: "New password",
  confirmPassword: "Confirm password",
};

const notificationsDashboardHomeTeam = {
  title: "Notifications",
  description: "Alerts from your team members and Editorielle.",
  noNewNotifications: "No new notifications",
};

const planDashboardHomeTeam = {
  title: "Current plan",
  description:
    "Your current plan, number of team members and number of instant category slots.",
  teamPlan: "Team plan",
  teamMembers: "Team members",
  instantCategoryLists: "Instant category slots",
  manageTeam: "Manage team",
  manageCategories: "Manage categories",
  payment: "Payment",
  manageYourPaymentDetails: "Manage your payment details.",
  paymentMethod: "Payment method",
  pauseSendoutTitle: "Pause sendouts",
  pauseSendoutDesc:
    "Pausing will stop the daily newsletter and any instant requests for all members of your team, immediately.",
  pauseDatePlaceholder: "DD/MM/YYYY",
  changeCardDetails: "Change card details",
  cardDetails: "Card details",
  confirmDetails: "Confirm details",
  deleteTitle: "Delete account",
  deleteDesc:
    "You and all team members will lose access to  the Editorielle platform, the daily newsletters and any instant requests. This action cannot be undone.",
  deleteButton: "Yes, delete my account",
  deleteWarningTitle: "You’re about to delete your account",
  deleteWarningDesc:
    "You and all team members will lose access to the Editorielle platform, the daily newsletters and any instant requests. This action cannot be undone.",
  deleteWarningReasonLabel: "Please detail why",
  deleteWarningCancelCTA: "No, go back",
  deleteWarningDeleteCTA: "Delete",
};

const contactDashboardHomeTeam = {
  title: "Contact support",
  description: "We’re always here to help!",
  innerTitle: "Don’t hesitate to reach out",
  innerDescription:
    "We’d love to hear from you! Please drop us a line at hello@editorielle.com if you have a question. Alternatively, simply click the button below.",
  buttonText: "Contact us",
};

const teamMembersTeamDashboard = {
  title: "Team members",
  description:
    "A quick overview of your team. Here you can edit member information, change instant categories and add/remove users.",
  addMember: "Add member",
  editButton: "Edit",
};

const addTeamMembersTeamDashboard = {
  title: "New member",
  description: "Please fill in their information",
  addMemberButton: "Invite member",
  cancelButton: "Cancel",
  firstName: "First name",
  lastName: "Last name",
  email: "Email",
  info: "Adding a new team member will increase the subscription price by £5+VAT per month.",
};

const editTeamMembersTeamDashboard = {
  title: "Edit member",
  description: "User profile",
  editMemberButton: "Save",
  cancelButton: "Close",
  deleteMemberButton: "Delete",
  firstName: "First name",
  lastName: "Last name",
  email: "Email",
  pauseTitle: "Pause member",
  pauseInfo:
    "Pausing will stop the daily newsletter and any instant requests for this member of your team, immediately.",
  pauseInputLabel: "Pause until",
  pauseInputPlaceholder: "DD/MM/YYYY",
  pauseButton: "Pause sendouts",
};

const warningModalOnEditMember = {
  heading: "You’re about to delete a team member",
  bodyText:
    "This user will lose access to their Editorielle profile, future newsletters and any instant requests. Your ongoing price plan will be reduced by £5+VAT. This action cannot be undone.",
  buttonText: "No, go back",
  secondButtonText: "Delete",
};

export const lang = {
  exampleAdminPage,
  exampleWebPage,
  signUp,
  signIn,
  auth,
  forgotPassword,
  resetPassword,
  signUpSuccess,
  confirmEmailSuccess,
  signUpVerification,
  passwordResetSuccess,
  individualAddTeamMember,
  individualChooseCategories,
  confirmationIndividual,
  paymentErrorModal,
  teamAddTeamMember,
  confirmationTeam,
  invitedMemberCreateAccount,
  invitedMemberConfirmationTeam,
  generalDashboardHomeTeam,
  notificationsDashboardHomeTeam,
  planDashboardHomeTeam,
  contactDashboardHomeTeam,
  teamMembersTeamDashboard,
  addTeamMembersTeamDashboard,
  editTeamMembersTeamDashboard,
  warningModalOnEditMember,
};

export default lang;
