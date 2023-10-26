import { selectors } from "../support/selectors";
const { signUpForm: signUpform } = selectors;
const { verificationPage: form } = selectors;
const { inviteMembersTeamPage: inviteMembersTeamForm } = selectors;
const { dashboardPage: dashboardForm } = selectors;
const { inviteMembersPage: inviteMembersForm } = selectors;

describe('View dashboard General tab of Team admin user', () => {
  let emailAddress = "test-" + Math.floor((Math.random() * 100) + 1) + "_" + Math.floor((Math.random() * 100) + 1) + "@yopmail.com";
  beforeEach(() => {
    cy.visit('/team/account/signup');
    cy.get(signUpform.firstName).type('melissa');
    cy.get(signUpform.lastName).type('thomas');
    cy.get(signUpform.email).type(emailAddress);
    cy.get(signUpform.password).type('Test@77777');
    cy.get(signUpform.passwordConfirmation).type('Test@77777');
    cy.get(signUpform.isAgreeTermAndConditions).click({ force: true });
    cy.get(signUpform.signUpButton).click({ force: true });
    cy.wait(20000);
    cy.get(form.submitBtn, { timeout: 250000 }).should('be.visible');
    cy.get(form.verificationCode).clear();
    cy.get(form.verificationCode).type('123456');
    cy.get(form.submitBtn).click({ force: true });
    cy.get(form.verificationError).contains('Account verified, redirecting you to Editorielle');
    cy.wait(5000);
    //adding 2nd member
    cy.get(inviteMembersTeamForm.firstName_1).type('Maria');
    cy.get(inviteMembersTeamForm.lastName_1).type('Hosker');
    let email3 = "test_" + Math.floor((Math.random() * 100) + 1) + "_" + Math.floor((Math.random() * 100) + 1) + "@yopmail.com";
    cy.get(inviteMembersTeamForm.email_1).type(email3);
    cy.contains('Next').click({ force: true });
    //verify plan and price
    cy.contains('Number of members').should('exist');
    cy.contains('2x').should('exist');
    cy.contains('£15/month + VAT').should('exist');
    //Next Page is displayed
    cy.contains('Select your instant categories').should('exist');
    cy.url("https://editorielle-fe-uat.vercel.app/team/choose-categories");
    //no categories selected
    cy.get(inviteMembersForm.continueToPayment, { timeout: 30000 })
      .eq(1)
      .click({ force: true });
    //pop up comes
    cy.get('.mt-3 > .text-2xl').should('exist');
    cy.get('.flex-col > .border').click({ force: true });
    cy.get(inviteMembersForm.continueToPayment, { timeout: 30000 })
      .eq(1)
      .click({ force: true });
    cy.get('div.App-Overview > div > div', { timeout: 1200000 }).should('exist');
    cy.get('#cardNumber').type("4242424242424242");
    cy.get('#cardExpiry').type("1224");
    cy.get('#cardCvc').type("123");
    cy.get('#billingName').type("Test user");
    cy.get('button > div > a > span').click({ force: true });
    cy.get('#billingAddressLine2').type("colaba");
    cy.get('#billingLocality').type("Mumbai");
    cy.get('#billingPostalCode').type("400072");
    cy.get('#billingAdministrativeArea').contains('Maharashtra')
      .then(element => {
        var text = element.text();
        cy.get('#billingAdministrativeArea').select(text);
      });
    cy.get('#billingAddressLine1').type("mumbai");
    cy.screenshot();
    cy.get('.SubmitButton-Text--pre').click({force:true});
    cy.get(inviteMembersTeamForm.letsGetGoing, { timeout: 80000 }).should('exist');
    cy.get(inviteMembersTeamForm.letsGetGoing).click({ forc: true });
  });

  it.skip('Should see general information of user', () => {
    //User information
    cy.contains('General').should('exist');
    cy.contains('Notifications').should('exist');
    cy.contains('Plan').should('exist');
    cy.contains('Support').should('exist');
    cy.get(dashboardForm.firstName)
      .invoke('val') 
      .then(text => {
      const firstname = text
      cy.log(firstname);
      })    
    cy.get(dashboardForm.lastName)
      .invoke('val') 
      .then(text1 => {
      const lastname = text1;
      cy.log(lastname);
      }) 
    cy.get(dashboardForm.email)
      .invoke('val') 
      .then(text2 => {
      const email = text2;
      cy.log(email);
      })
    cy.get('main > div:nth-child(1) button').should('be.disabled');
    //Business information
    //Reset Password information
  })
});