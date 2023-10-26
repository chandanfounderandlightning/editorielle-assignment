import { get } from "cypress/types/lodash";
import { getDataCySelector } from "./utils";

const homePage = {
  signUpButtonIndividual: getDataCySelector('button-sign-up-individual'),
  signUpButtonTeam: getDataCySelector('button-sign-up-team'),
  signInButton: getDataCySelector('button-sign-in'),
}

const signUpForm = {
  
  firstName: getDataCySelector('first-name'),
  lastName: getDataCySelector('last-name'),
  email: getDataCySelector('email'),
  password: getDataCySelector('password'),
  passwordConfirmation: getDataCySelector('password-confirmation'),
  isAgreeTermAndConditions: getDataCySelector('terms-and-conditions'),
  signUpButton: getDataCySelector('submit-button'),
  firstNameError: getDataCySelector('firstName-error'),
  lastNameError: getDataCySelector('lastName-error'),
  emailError: getDataCySelector('email-error'),
  passwordError: getDataCySelector('password-error'),
  passwordConfirmationError: getDataCySelector('passwordConfirmation-error'),
  isAgreeTermAndConditionsError: getDataCySelector('isAgreeTermAndConditions-error'),
  existingEmailError: getDataCySelector('alert-content'),
}

const signInForm = {
  email: getDataCySelector('email'),
  password: getDataCySelector('password'),
  loginButton: getDataCySelector('submit-button'),
  emailError: getDataCySelector('email-error'),
  passwordError: getDataCySelector('password-error'),
  errorMessage: getDataCySelector('alert-content'),
  headline: getDataCySelector('login-success-heading'),
}
const LogoutForm = {
  logoutButton: getDataCySelector('button-test-logout'),
  userMenu: getDataCySelector ('userAvatar'),
  logout: getDataCySelector ('Logout')
}

const forgotPasswordForm = {
  forgotPassword:"[href='/account/forgot-password']",
  email: getDataCySelector('email'),
  sendLink: getDataCySelector('send-link'),
  submitButton: getDataCySelector('submit-button'),
  emailError: getDataCySelector('email-error'),
  invalidEmailError:('.text-content > .body-compact-01'),
  successMessage: getDataCySelector('alert-content'),
  contactSupport: getDataCySelector('contact-support'),
  resetPasswordTitle: ('.heading-05'),
}

const payment = {
  toggle: getDataCySelector('payment-toggle'),
  simple: {
    paymentButton: getDataCySelector('payment-button-simple'),
  },
}

const verificationPage = {
  verificationCode: getDataCySelector('verification-code'),
  submitBtn: getDataCySelector('submit-button'),
  resendCode: getDataCySelector('resend-code'),
  thanksText: getDataCySelector('Thanks!'),
  verificationError: getDataCySelector('alert-content'),
  invalidCodeError: getDataCySelector('alert-popup!'),
  userRegisteredError: getDataCySelector('alert-popup'),
  validationError: getDataCySelector('otp-error')
}

const inviteMembersPage = {
  toggleBtn: getDataCySelector('email-toggle'),
  firstName: getDataCySelector('first-name'),
  lastName: getDataCySelector('last-name'),
  email: getDataCySelector('email'),
  validationError: getDataCySelector('alert-content'),
  nextBtn: getDataCySelector('next'),
  firstName_error: getDataCySelector('firstName-error'),
  lastName_error: getDataCySelector('lastName-error'),
  email_error: getDataCySelector('email-error'),
  continueToPayment: getDataCySelector('payment'),
  letsGetGoing: getDataCySelector('confirmation-individual-button')
}
const categoriesPage = {
  backBtn: getDataCySelector('back'),
}

const inviteMembersTeamPage = {
  firstName: getDataCySelector('first-name-0'),
  lastName: getDataCySelector('last-name-0'),
  email: getDataCySelector('email-0'),
  firstName_1: getDataCySelector('first-name-1'),
  lastName_1: getDataCySelector('last-name-1'),
  email_1: getDataCySelector('email-1'),
  validationError: getDataCySelector('alert-content'),
  nextBtn: getDataCySelector('next'),
  firstName_error: getDataCySelector('members.1.firstName-error'),
  lastName_error: getDataCySelector('members.1.lastName-error'),
  email_error: getDataCySelector('members.1.email-error'),
  firstName_2: getDataCySelector('first-name-2'),
  lastName_2: getDataCySelector('last-name-2'),
  email_2: getDataCySelector('email-2'),
  firstName_3: getDataCySelector('first-name-3'),
  lastName_3: getDataCySelector('last-name-3'),
  email_3: getDataCySelector('email-3'),
  firstName_4: getDataCySelector('first-name-4'),
  lastName_4: getDataCySelector('last-name-4'),
  email_4: getDataCySelector('email-4'),
  firstName_5: getDataCySelector('first-name-5'),
  lastName_5: getDataCySelector('last-name-5'),
  email_5: getDataCySelector('email-5'),
  firstName_6: getDataCySelector('first-name-6'),
  lastName_6: getDataCySelector('last-name-6'),
  email_6: getDataCySelector('email-6'),
  firstName_7: getDataCySelector('first-name-7'),
  lastName_7: getDataCySelector('last-name-7'),
  email_7: getDataCySelector('email-7'),
}

  const dashboardPage = {
    firstName: getDataCySelector('first-name'),
    lastName: getDataCySelector('last-name'),
    email: getDataCySelector('email'),
    oldPassword: getDataCySelector('oldPassword'),
    newPassword: getDataCySelector('newPassword'),
    confirmPwd: getDataCySelector('confirmPassword'),
    businessName: getDataCySelector('businessName'),
}

  const addMembersPage = {
    firstName: getDataCySelector('first-name'),
    lastName: getDataCySelector('last-name'),
    email: getDataCySelector('email'),
    errorMsg: getDataCySelector('alert-content'),
    errorMsg_FN: getDataCySelector('firstName-error'),
    errorMsg_LN: getDataCySelector('lastName-error'),
    errorMsg_email: getDataCySelector('email-error'),
  }

  const createAccountPage ={
    newPassword: getDataCySelector('password'),
    reenterPassword: getDataCySelector('password-confirmation')
  }

  const teamsPage ={
    teamsTab: getDataCySelector ('team'),
    members: getDataCySelector ('Members'),
    messageInAddMemberForm: getDataCySelector ('messageInAddMemberForm'),
    membersList: ('main > div > div > div > div')
  }

  const editMembersPage ={
    editBtnForList: getDataCySelector ('1431'),
    pauseDate: getDataCySelector('pauseDate'),
    errorMsgForDate: getDataCySelector('alert-content'),
    pauseSendoutBtn: getDataCySelector('pauseSendoutButton')
  }

export const selectors = {
  homePage,
  signUpForm,
  signInForm,
  forgotPasswordForm,
  payment,
  verificationPage,
  inviteMembersPage,
  categoriesPage,
  inviteMembersTeamPage,
  dashboardPage,
  addMembersPage,
  createAccountPage,
  LogoutForm,
  teamsPage,
  editMembersPage
}
