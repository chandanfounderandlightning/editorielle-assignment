import { selectors } from "../support/selectors";
const { signUpForm: form } = selectors;
const { verificationPage: verificationForm } = selectors;
class EmailGenerator {
  static id = 1;
  static generate (baseEmail) {
    const uniqueId = `-a${this.id++}${Math.floor(Date.now() / 1000)}`;
    return baseEmail.replace('@', `${uniqueId}@`);
  }
}

describe('Sign up page scenarios', () => {
  beforeEach(() => {
    cy.visit('/team/account/signup');
  });

  it('Should not create a user with first name as blank', () => {
    cy.get(form.lastName) .type('thomas-user');
    cy.get(form.email).type(EmailGenerator.generate('test@yopmail.com'));
    cy.get(form.password).type('Test@77777');
    cy.get(form.passwordConfirmation).type('Test@77777');
    cy.get(form.isAgreeTermAndConditions).click({ force: true });
    cy.get(form.signUpButton).click({ force: true });
    cy.get(form.firstNameError).contains('Please enter your first name')
  });

  it('Should not create a user with last name as blank', () => {
    cy.get(form.firstName) .type('thomas-user');
    cy.get(form.email).type(EmailGenerator.generate('test@yopmail.com'));
    cy.get(form.password).type('Test@77777');
    cy.get(form.passwordConfirmation).type('Test@77777');
    cy.get(form.isAgreeTermAndConditions).click({ force: true });
    cy.get(form.signUpButton).click({ force: true });
    cy.get(form.lastNameError).contains('Please enter your last name')
  });


  it('Should not create a user with email as blank', () => {
    cy.get(form.firstName).type('melissa-user');
    cy.get(form.lastName) .type('thomas-tester');
    cy.get(form.password).type('Test@77777');
    cy.get(form.passwordConfirmation).type('Test@77777');
    cy.get(form.isAgreeTermAndConditions).click({ force: true });
    cy.get(form.signUpButton).click({ force: true });
    cy.get(form.emailError).contains('Please enter a valid email address');
  });
  it('Should not create a user with password as blank', () => {
    cy.get(form.firstName).type('melissa');
    cy.get(form.lastName) .type('thomas');
    cy.get(form.email).type(EmailGenerator.generate('test@yopmail.com'));
    cy.get(form.passwordConfirmation).type('Test@77777');
    cy.get(form.isAgreeTermAndConditions).click({ force: true });
    cy.get(form.signUpButton).click({ force: true });
    cy.get(form.passwordError).contains('Please enter a valid password');

  });
  it('Should not create a user with confirm password as blank', () => {
    cy.get(form.firstName).type('melissa');
    cy.get(form.lastName) .type('thomas');
    cy.get(form.email).type(EmailGenerator.generate('test@yopmail.com'));
    cy.get(form.password).type('Test@77777');
    cy.get(form.isAgreeTermAndConditions).click({ force: true });
    cy.get(form.signUpButton).click({ force: true });
    cy.get(form.passwordConfirmationError).contains('This field is required');

  });

  it('should not create a user with terms as blank', () => {
    cy.get(form.firstName).type('melissa');
    cy.get(form.lastName) .type('thomas');
    cy.get(form.email).type(EmailGenerator.generate('test@yopmail.com'));
    cy.get(form.password).type('Test@77777');
    cy.get(form.passwordConfirmation).type('Test@77777');
    cy.get(form.signUpButton).click({ force: true });
    cy.get(form.isAgreeTermAndConditionsError).contains('Please accept to continue');
  });

  it('should not create a user with password  as less than 10 chars', () => {
    cy.get(form.firstName).type('melissa');
    cy.get(form.lastName) .type('thomas');
    cy.get(form.email).type(EmailGenerator.generate('test@yopmail.com'));
    cy.get(form.password).type('Test@77').click();
    cy.get(form.signUpButton).click({ force: true });
    cy.get(form.passwordError).contains('Please enter a valid password');
  });

  it('should not create a user with password without a capital letter', () => {
    cy.get(form.firstName).type('melissa');
    cy.get(form.lastName) .type('thomas');
    cy.get(form.email).type(EmailGenerator.generate('test@yopmail.com'));
    cy.get(form.password).type('test@77777');
    cy.get(form.passwordConfirmation).type('test@77777');
    cy.get(form.signUpButton).click({ force: true });
    cy.get(form.passwordError).contains('Please enter a valid password');
  });

  it('should not create a user with password without a special char', () => {
    cy.get(form.firstName).type('melissa');
    cy.get(form.lastName) .type('thomas');
    cy.get(form.email).type(EmailGenerator.generate('test@yopmail.com'));
    cy.get(form.password).type('Test1234');
    cy.get(form.passwordConfirmation).type('Test1234');
    cy.get(form.signUpButton).click({ force: true });
    cy.get(form.passwordError).contains('Please enter a valid password');
  });

  it('should not create a user with password without a number', () => {
    cy.get(form.firstName).type('melissa');
    cy.get(form.lastName) .type('thomas');
    cy.get(form.email).type(EmailGenerator.generate('test@yopmail.com'));
    cy.get(form.password).type('Test@abcd');
    cy.get(form.passwordConfirmation).type('Test@abcd');
    cy.get(form.signUpButton).click({ force: true });
    cy.get(form.passwordError).contains('Please enter a valid password');
  });

  it('should not create a user when password and confirm password do not match', () => {
    cy.get(form.firstName).type('melissa');
    cy.get(form.lastName) .type('thomas');
    cy.get(form.email).type(EmailGenerator.generate('test@yopmail.com'));
    cy.get(form.password).type('Test@88888');
    cy.get(form.passwordConfirmation).type('Test@77777');
    cy.get(form.signUpButton).click({ force: true });
    cy.get(form.passwordConfirmationError).contains('Please make sure your passwords match');
  });

  it('should create a user when existing email is cleared and new email is entered ', () => {
    cy.get(form.firstName).type('melissa');
    cy.get(form.lastName) .type('thomas');
    cy.get(form.email).type('test@yopmail.com');
    cy.get(form.email).clear()
    cy.get(form.email).type(EmailGenerator.generate('test@yopmail.com'));
    cy.get(form.password).type('Test@77777');
    cy.get(form.passwordConfirmation).type('Test@77777');
    cy.get(form.isAgreeTermAndConditions).click({ force: true });
    cy.get(form.signUpButton).click({ force: true });
    cy.contains('Thanks').should('exist');
  });

  it('should create a successful user account and error for already registered email', () => {
    cy.get(form.firstName).type('melissa');
    cy.get(form.lastName) .type('thomas');
    cy.get(form.email).type(EmailGenerator.generate('test@yopmail.com'));
    cy
    .get(form.email)
    .invoke('val') 
    .then(text => {
      const someText = text;
      cy.log(someText);  
    cy.get(form.password).type('Test@77777');
    cy.get(form.passwordConfirmation).type('Test@77777');
    cy.get(form.isAgreeTermAndConditions).click({ force: true });
    cy.get(form.signUpButton).click({ force: true });
    cy.wait(10000);
    cy.get(verificationForm.submitBtn, { timeout: 180000 }).should('be.visible');
    cy.get(verificationForm.verificationCode).type('123456');
    cy.get(verificationForm.submitBtn).click({ force: true });
    cy.get(verificationForm.verificationError).contains('Account verified, redirecting you to Editorielle');
    cy.visit('/individual/account/signup');
    cy.get(form.firstName).type('melissa');
    cy.get(form.lastName) .type('thomas');
    cy.get(form.email).type(someText);
  });
    cy.get(form.password).type('Test@77777');
    cy.get(form.passwordConfirmation).type('Test@77777');
    cy.get(form.isAgreeTermAndConditions).click({ force: true });
    cy.get(form.signUpButton).click({ force: true });
    cy.contains('This email has already been taken. Please sign in or choose an alternative email address').should('exist');
    cy.get(form.existingEmailError).contains('This email has already been taken. Please sign in or choose an alternative email address');
  });
});