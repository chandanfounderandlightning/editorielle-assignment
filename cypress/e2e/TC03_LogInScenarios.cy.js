import { selectors } from "../support/selectors";
const { signInForm: form } = selectors;
const { inviteMembersTeamPage: inviteMembersTeamForm} = selectors;
const { inviteMembersPage: inviteMembersForm } = selectors;
const { signUpForm: signUpform } = selectors;
const { verificationPage: verificationForm } = selectors;

describe('Log in  page scenarios', () => {
  beforeEach(() => {
    cy.visit('/account/signin');
  });

  it('Should not login when email is  blank', () => {
    cy.get(form.email).click()
    cy.get(form.password).type('test@1234')
    cy.get(form.emailError).contains('Please enter a valid email address')
  });

  it('Should not login when password is  blank', () => {
    cy.get(form.email).type('test@yopmail.com')
    cy.get(form.password).click();
    cy.get(form.email).click()
    cy.get(form.passwordError).contains('Please enter a valid password')
  });

  it('Should not login when email is invalid', () => {
    cy.get(form.email).type('test@yopmail')
    cy.get(form.password).type('test@1234')
    cy.get(form.emailError).contains('Please enter a valid email address')
  });

  it('Should not login when password is incorrect', () => {
    cy.get(form.email).type('test@yopmail.com')
    cy.get(form.password).type('test@1234')
    cy.get(form.loginButton).click({force:true})
    cy.get(form.passwordError).contains('Please enter a valid password')
  });

  it('Should not login when email or password is Incorrect', () => {
    cy.get(form.email).type('test8@yopmail.com')
    cy.get(form.password).type('Test@77777')
    cy.get(form.loginButton).click()
    cy.get(form.errorMessage).contains('User with given email does not exist')
  });

  it('Should login when email and password is correct', () => {
    cy.get(form.email).type('suman@founderandlightning.com')
    cy.get(form.password).type('Suman12345!@')
    cy.get(form.loginButton).click()
    cy.get(form.errorMessage).contains('Incorrect email or password. Please try again!');
  });
  
  it('Should login when email and password is correct', () => {
    cy.get(form.email).type('suman@founderandlightning.com')
    cy.get(form.password).type('Suman12345!')
    cy.get(form.loginButton).click()
    cy.url().should('include', '/team/dashboard/home/general');
  });

  it('Should login with INDIVIDUAL Verified user', () => {
    cy.visit('/individual/account/signup');
    cy.get(signUpform.firstName).type('melissa');
    cy.get(signUpform.lastName).type('thomas');
    let emailIndividual = "test" + Math.floor((Math.random() * 100) + 1) + "_" + Math.floor((Math.random() * 100) + 1) + "@yopmail.com";
    cy.get(signUpform.email).type(emailIndividual);
    cy.get(signUpform.password).type('Test@77777');
    cy.get(signUpform.passwordConfirmation).type('Test@77777');
    cy.get(signUpform.isAgreeTermAndConditions).click({ force: true });
    cy.get(signUpform.signUpButton).click({ force: true });
    cy.wait(10000);
    cy.get(verificationForm.submitBtn, { timeout: 180000 }).should('exist');
    cy.get(verificationForm.verificationCode).clear();
    cy.get(verificationForm.verificationCode).type('123456');
    cy.get(verificationForm.submitBtn).click({ force: true });
    cy.get(verificationForm.verificationError).contains('Account verified, redirecting you to Editorielle');
    cy.visit('/account/signin');
    cy.get(form.email).type(emailIndividual)
    cy.get(form.password).type('Test@77777')
    cy.get(form.loginButton).click();
    cy.contains('Number of members').should('exist');
    cy.contains('1x').should('exist');
    cy.contains('£10/month').should('exist');
    cy.contains('Who will receive the daily newsletter?').should('exist');
    
  })
  it('Should login with TEAM ADMIN Verified user', () => {
    cy.visit('/team/account/signup');
    cy.get(signUpform.firstName).type('melissa');
    cy.get(signUpform.lastName).type('thomas');
    let emailTeam = "test" + Math.floor((Math.random() * 100) + 1) + "_" + Math.floor((Math.random() * 100) + 1) + "@yopmail.com";
    cy.get(signUpform.email).type(emailTeam);
    cy.get(signUpform.password).type('Test@77777');
    cy.get(signUpform.passwordConfirmation).type('Test@77777');
    cy.get(signUpform.isAgreeTermAndConditions).click({ force: true });
    cy.get(signUpform.signUpButton).click({ force: true });
    cy.wait(10000);
    cy.get(verificationForm.submitBtn, { timeout: 180000 }).should('exist');
    cy.get(verificationForm.verificationCode).clear();
    cy.get(verificationForm.verificationCode).type('123456');
    cy.get(verificationForm.submitBtn).click({ force: true });
    cy.get(verificationForm.verificationError).contains('Account verified, redirecting you to Editorielle');
    cy.visit('/account/signin');
    cy.get(form.email).type(emailTeam)
    cy.get(form.password).type('Test@77777')
    cy.get(form.loginButton).click();
    cy.contains('Number of members').should('exist');
    cy.contains('2x').should('exist');
    cy.contains('£15/month').should('exist');
    cy.contains('Who will receive the daily newsletter?').should('exist');
  })

  it('Should not login with not verified user', () => {
    cy.visit('/team/account/signup');
    cy.get(signUpform.firstName).type('melissa');
    cy.get(signUpform.lastName).type('thomas');
    let emailNotVerified = "test" + Math.floor((Math.random() * 100) + 1) + "_" + Math.floor((Math.random() * 100) + 1) + "@yopmail.com";
    cy.get(signUpform.email).type(emailNotVerified);
    cy.get(signUpform.password).type('Test@77777');
    cy.get(signUpform.passwordConfirmation).type('Test@77777');
    cy.get(signUpform.isAgreeTermAndConditions).click({ force: true });
    cy.get(signUpform.signUpButton).click({ force: true });
    cy.visit('/account/signin');
    cy.get(form.email).type(emailNotVerified)
    cy.get(form.password).type('Test@77777')
    cy.get(form.loginButton).click();
    cy.get(form.errorMessage).contains('User with given email does not exist');
  })

  it('Should not login with individual invited user', () => {
    cy.visit('/individual/account/signup');
    cy.get(signUpform.firstName).type('melissa');
    cy.get(signUpform.lastName).type('thomas');
    let emailIndividual = "test" + Math.floor((Math.random() * 100) + 1) + "_" + Math.floor((Math.random() * 100) + 1) + "@yopmail.com";
    cy.get(signUpform.email).type(emailIndividual);
    cy.get(signUpform.password).type('Test@77777');
    cy.get(signUpform.passwordConfirmation).type('Test@77777');
    cy.get(signUpform.isAgreeTermAndConditions).click({ force: true });
    cy.get(signUpform.signUpButton).click({ force: true });
    cy.wait(10000);
    cy.get(verificationForm.submitBtn, { timeout: 180000 }).should('exist');
    cy.get(verificationForm.verificationCode).clear();
    cy.get(verificationForm.verificationCode).type('123456');
    cy.get(verificationForm.submitBtn).click({ force: true });
    cy.get(verificationForm.verificationError).contains('Account verified, redirecting you to Editorielle');
    cy.visit('/account/signin');
    cy.get(form.email).type(emailIndividual)
    cy.get(form.password).type('Test@77777')
    cy.get(form.loginButton).click();
    cy.contains('Number of members').should('exist');
    cy.contains('1x').should('exist');
    cy.contains('£10/month').should('exist');
    cy.contains('Who will receive the daily newsletter?').should('exist');
    cy.wait(5000);
    cy.get(inviteMembersForm.toggleBtn)
      .eq(1)
      .find('button')
      .click({ force: true });
    cy.get(inviteMembersForm.firstName).clear();
    cy.get(inviteMembersForm.firstName).type('Tester');
    cy.get(inviteMembersForm.lastName).clear();
    cy.get(inviteMembersForm.lastName).type('Hosker');
    cy.get(inviteMembersForm.email).clear();
    let individualInvitedUser = "test" + Math.floor((Math.random() * 100) + 1) + "_" + Math.floor((Math.random() * 100) + 1) + "@yopmail.com";
    cy.get(inviteMembersForm.email).type(individualInvitedUser);
    cy.contains('Next').click({ force: true });
    cy.wait(2000);
    cy.visit('/account/signin');
    cy.get(form.email).type(individualInvitedUser);
    cy.get(form.password).type('Test@77777')
    cy.get(form.loginButton).click();
    cy.get(form.errorMessage).contains('Your email address is not verified');
  })

  it('Should not login with team invited user', () => {
    cy.visit('/team/account/signup');
    cy.get(signUpform.firstName).type('melissa');
    cy.get(signUpform.lastName).type('thomas');
    let emailTeam = "test" + Math.floor((Math.random() * 100) + 1) + "_" + Math.floor((Math.random() * 100) + 1) + "@yopmail.com";
    cy.get(signUpform.email).type(emailTeam);
    cy.get(signUpform.password).type('Test@77777');
    cy.get(signUpform.passwordConfirmation).type('Test@77777');
    cy.get(signUpform.isAgreeTermAndConditions).click({ force: true });
    cy.get(signUpform.signUpButton).click({ force: true });
    cy.wait(10000);
    cy.get(verificationForm.submitBtn, { timeout: 180000 }).should('exist');
    cy.get(verificationForm.verificationCode).clear();
    cy.get(verificationForm.verificationCode).type('123456');
    cy.get(verificationForm.submitBtn).click({ force: true });
    cy.get(verificationForm.verificationError).contains('Account verified, redirecting you to Editorielle');
    cy.visit('/account/signin');
    cy.get(form.email).type(emailTeam)
    cy.get(form.password).type('Test@77777')
    cy.get(form.loginButton).click();
    cy.contains('Number of members').should('exist');
    cy.contains('2x').should('exist');
    cy.contains('£15/month').should('exist');
    cy.contains('Who will receive the daily newsletter?').should('exist');
    cy.wait(5000);
    cy.get(inviteMembersTeamForm.firstName_1).clear();
    cy.get(inviteMembersTeamForm.firstName_1).type('Jane-Marie');
    cy.get(inviteMembersTeamForm.lastName_1).clear();
    cy.get(inviteMembersTeamForm.lastName_1).type('Taylor');
    cy.get(inviteMembersTeamForm.email_1).clear();
    let email2 = "test." + Math.floor((Math.random() * 100) + 1) + "_" + Math.floor((Math.random() * 100) + 1) + "@yopmail.com";
    cy.get(inviteMembersTeamForm.email_1).type(email2);
    cy.contains('Next').click({ force: true });
    cy.visit('/account/signin');
    cy.get(form.email).type(email2)
    cy.get(form.password).type('Test@77777')
    cy.get(form.loginButton).click();
    cy.get(form.errorMessage).contains('Your email address is not verified');
  })
});
