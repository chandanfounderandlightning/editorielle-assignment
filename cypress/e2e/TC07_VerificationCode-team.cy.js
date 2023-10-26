import { selectors } from "../support/selectors";
const { signUpForm: signUpform } = selectors;
const { verificationPage: form } = selectors;

describe('Sign up page scenarios', () => {
  const serverId = 'iyseeyo7';
  let emailAddress = "test" + Math.floor((Math.random() * 100) + 1) + "_" + Math.floor((Math.random() * 100) + 1) + "@iyseeyo7.mailosaur.net";
  beforeEach(() => {
    cy.visit('/team/account/signup');
    cy.get(signUpform.firstName).type('melissa');
    cy.get(signUpform.lastName).type('thomas');
    cy.get(signUpform.email).type(emailAddress);
    cy.get(signUpform.password).type('Test@77777');
    cy.get(signUpform.passwordConfirmation).type('Test@77777');
    cy.get(signUpform.isAgreeTermAndConditions).click({ force: true });
    cy.get(signUpform.signUpButton).click({ force: true });
    cy.contains('Thanks', { timeout: 80000 }).should('exist');
  });

  it('Should not verify a user with blank code, blank spaces, 6 special characters, multiple special characters, invalid 6 digit code, with characters', () => {
    cy.get(form.verificationCode).clear();
    cy.get(form.submitBtn).click({ force: true });
    cy.get(form.validationError).contains('Please enter the code sent to your email');
    //with blank spaces as code
    cy.get(form.verificationCode).type('           ');
    cy.get(form.submitBtn).click({ force: true });
    cy.get(form.validationError).contains('Please enter the code sent to your email');
    //with long special characters as code
    cy.get(form.verificationCode).clear();
    cy.get(form.verificationCode).type('~!@#$%^&*()_-+=`{}[]|\:"<>?,.;');
    cy.get(form.submitBtn).click({ force: true });
    cy.get(form.validationError).contains('Verification code must be 6 digits long'); //update needs to be reverted to Verification code should only include numbers
    //with invalid 6 digit code
    cy.get(form.verificationCode).clear();
    cy.get(form.verificationCode).type('123456');
    cy.get(form.submitBtn).click({ force: true });
    cy.get(form.verificationError).should('be.visible');
    cy.get(form.verificationError).contains('Incorrect verification code')
    //with 6 characters as code
    cy.get(form.verificationCode).clear();
    cy.get(form.verificationCode).type('testFo');
    cy.get(form.submitBtn).click({ force: true });
    cy.get(form.validationError).contains('Verification code must be 6 digits long') //update needs to be reverted to Verification code should only include numbers
    //with invalid long verification code
    cy.get(form.verificationCode).clear();
    cy.get(form.verificationCode).type('1234567890');
    cy.get(form.submitBtn).click({ force: true });
    cy.get(form.validationError).contains('Verification code must be 6 digits long');
    // try {
    //   cy.mailosaurGetMessage(serverId, {
    //     sentTo: emailAddress
    //   }).then(email => {
    //     expect(email.subject).to.equal("Welcome to Editorielle,melissa 💌");
    //     const firstCode = email.html.codes[0]
    //     cy.log(firstCode.value)
    //     cy.get(form.verificationCode).clear();
    //     cy.get(form.verificationCode).type(firstCode.value);
    //     cy.get(form.submitBtn).click({ force: true });
    //     cy.get(form.verificationError).contains('Account verified, redirecting you to Editorielle');
    //   })
    //   throw ("Unable to find email")
    // } catch (err) {
    //   cy.log("ERROR!!!", err)
    // }
  })
})
