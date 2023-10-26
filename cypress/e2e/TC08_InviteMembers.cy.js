import { selectors } from "../support/selectors";
const { signUpForm: signUpform } = selectors;
const { verificationPage: form } = selectors;
const { inviteMembersPage: inviteMembersForm } = selectors;

describe('Sign up page scenarios - till Invite Members', () => {
  let emailAddress = "test" + Math.floor((Math.random() * 100) + 1) + "_" + Math.floor((Math.random() * 100) + 1) + "@yopmail.com";
  beforeEach(() => {
    cy.visit('/individual/account/signup');
    cy.get(signUpform.firstName).type('melissa');
    cy.get(signUpform.lastName).type('thomas');
    cy.get(signUpform.email).type(emailAddress);
    cy.get(signUpform.password).type('Test@77777');
    cy.get(signUpform.passwordConfirmation).type('Test@77777');
    cy.get(signUpform.isAgreeTermAndConditions).click({ force: true });
    cy.get(signUpform.signUpButton).click({ force: true });
    cy.wait(10000);
    cy.get(form.submitBtn, { timeout: 180000 }).should('exist');
    cy.get(form.verificationCode).clear();
    cy.get(form.verificationCode).type('123456');
    cy.get(form.submitBtn).click({ force: true });
    cy.get(form.verificationError).contains('Account verified, redirecting you to Editorielle');
  });

  it('Should show error if blank FN, blank LN, blank email, invalid details entered', () => {
    //blank first name
    cy.wait(5000);
    cy.get(inviteMembersForm.toggleBtn)
      .eq(1)
      .find('button')
      .click({ force: true });
    cy.get(inviteMembersForm.lastName).type('Tester');
    let email1 = "test" + Math.floor((Math.random() * 100) + 1) + "_" + Math.floor((Math.random() * 100) + 1) + "@yopmail.com";
    cy.get(inviteMembersForm.email).type(email1);
    cy.contains('Next').should('be.disabled');
    //blank last Name
    cy.get(inviteMembersForm.firstName).type('Tester');
    cy.get(inviteMembersForm.lastName).clear();
    cy.contains('Next').should('be.disabled');
    //blank email
    cy.get(inviteMembersForm.lastName).type('Hosker');
    cy.get(inviteMembersForm.email).clear();
    cy.contains('Next').should('be.disabled');
    //blank spaces in first name
    cy.get(inviteMembersForm.firstName).clear();
    cy.get(inviteMembersForm.firstName).type('           ');
    cy.get(inviteMembersForm.lastName).type('Hosker');
    cy.get(inviteMembersForm.email).type(email1);
    cy.contains('Next').click({ force: true });
    cy.get(inviteMembersForm.firstName_error).contains('Please enter your first name')
    //blank spaces in last name
    cy.get(inviteMembersForm.firstName).clear();
    cy.get(inviteMembersForm.firstName).type('Tester');
    cy.get(inviteMembersForm.lastName).clear();
    cy.get(inviteMembersForm.lastName).type('           ');
    cy.contains('Next').click({ force: true });
    cy.get(inviteMembersForm.lastName_error).contains('Please enter your last name')
    //blank spaces in email
    cy.get(inviteMembersForm.lastName).clear();
    cy.get(inviteMembersForm.lastName).type('Hosker');
    cy.get(inviteMembersForm.email).clear();
    cy.get(inviteMembersForm.email).type('          ');
    cy.contains('Next').click({ force: true });
    cy.get(inviteMembersForm.email_error).contains('Please enter an email address')
    //numbers in first name
    cy.get(inviteMembersForm.firstName).clear();
    cy.get(inviteMembersForm.firstName).type('12333');
    cy.get(inviteMembersForm.email).clear();
    cy.get(inviteMembersForm.email).type(email1);
    cy.contains('Next').click({ force: true });
    cy.get(inviteMembersForm.firstName_error).contains('Please remove special characters or numbers in first name')
    //numbers in last name
    cy.get(inviteMembersForm.firstName).clear();
    cy.get(inviteMembersForm.firstName).type('Tester');
    cy.get(inviteMembersForm.lastName).clear();
    cy.get(inviteMembersForm.lastName).type('23456');
    cy.contains('Next').click({ force: true });
    cy.get(inviteMembersForm.lastName_error).contains('Please remove special characters or numbers in last name')
    //invalid in email
    cy.get(inviteMembersForm.lastName).clear();
    cy.get(inviteMembersForm.lastName).type('Hosker');
    cy.get(inviteMembersForm.email).clear();
    cy.get(inviteMembersForm.email).type('111111');
    cy.contains('Next').click({ force: true });
    cy.get(inviteMembersForm.email_error).contains('Please enter a valid email address')
    //special characters in first name
    cy.get(inviteMembersForm.firstName).clear();
    cy.get(inviteMembersForm.firstName).type('~`!@#$%^&*()_+{}:"<>?,./;[]\|');
    cy.get(inviteMembersForm.lastName).clear();
    cy.get(inviteMembersForm.lastName).type('Tester');
    cy.get(inviteMembersForm.email).clear();
    cy.get(inviteMembersForm.email).type(email1);
    cy.contains('Next').click({ force: true });
    cy.get(inviteMembersForm.firstName_error).contains('Please remove special characters or numbers in first name')
    //special characters in last name
    cy.get(inviteMembersForm.firstName).clear();
    cy.get(inviteMembersForm.firstName).type('Tester');
    cy.get(inviteMembersForm.lastName).clear();
    cy.get(inviteMembersForm.lastName).type('~`!@#$%^&*()_+{}:"<>?,./;[]\|');
    cy.get(inviteMembersForm.email).clear();
    cy.get(inviteMembersForm.email).type(email1);
    cy.contains('Next').click({ force: true });
    cy.get(inviteMembersForm.lastName_error).contains('Please remove special characters or numbers in last name')
    //special characters in email
    cy.get(inviteMembersForm.firstName).clear();
    cy.get(inviteMembersForm.firstName).type('James');
    cy.get(inviteMembersForm.lastName).clear();
    cy.get(inviteMembersForm.lastName).type('Hosker');
    cy.get(inviteMembersForm.email).clear();
    cy.get(inviteMembersForm.email).type('~`!@#$%^&*()_+{}:"<>?,./;[]\|');
    cy.contains('Next').click({ force: true });
    cy.get(inviteMembersForm.email_error).contains('Please enter a valid email address')
    //1 character in first name
    cy.get(inviteMembersForm.firstName).clear();
    cy.get(inviteMembersForm.firstName).type('s');
    cy.get(inviteMembersForm.lastName).clear();
    cy.get(inviteMembersForm.lastName).type('Tester');
    cy.get(inviteMembersForm.email).clear();
    cy.get(inviteMembersForm.email).type(email1);
    cy.contains('Next').click({ force: true });
    cy.get(inviteMembersForm.firstName_error).contains('First name should have at least 2 characters')
    //1 character in last name
    cy.get(inviteMembersForm.firstName).clear();
    cy.get(inviteMembersForm.firstName).type('Tester');
    cy.get(inviteMembersForm.lastName).clear();
    cy.get(inviteMembersForm.lastName).type('y');
    cy.get(inviteMembersForm.email).clear();
    cy.get(inviteMembersForm.email).type(email1);
    cy.contains('Next').click({ force: true });
    cy.get(inviteMembersForm.lastName_error).contains('Last name should have at least 2 characters')
    //adding valid member
    //verify placeholder in each input field
    cy.get(inviteMembersForm.firstName).clear();
    cy.get(inviteMembersForm.lastName).clear();
    cy.get(inviteMembersForm.email).clear();
    cy.get('input[placeholder*="First name"]');
    cy.get('input[placeholder*="Last name"]');
    cy.get('input[placeholder*="Email"]');
    cy.get(inviteMembersForm.firstName).clear();
    cy.get(inviteMembersForm.firstName).type('Tester');
    cy.get(inviteMembersForm.lastName).clear();
    cy.get(inviteMembersForm.lastName).type('Hosker');
    cy.get(inviteMembersForm.email).clear();
    let email = "test" + Math.floor((Math.random() * 100) + 1) + "_" + Math.floor((Math.random() * 100) + 1) + "@yopmail.com";
    cy.get(inviteMembersForm.email).type(email);
    cy.contains('Next').click({ force: true });
    //verify plan and price
    cy.contains('Number of members').should('exist');
    cy.contains('1x').should('exist');
    cy.contains('£10/month').should('exist');
    //Next Page is displayed
    cy.contains('Select your instant categories').should('exist');
    cy.url("https://editorielle-fe-uat.vercel.app/individual/choose-categories");
  })
})
