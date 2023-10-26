import { selectors } from "../support/selectors";
const { signUpForm: signUpform } = selectors;
const { verificationPage: form } = selectors;
const { inviteMembersPage: inviteMembersForm } = selectors;
const { createAccountPage: createAccountForm } = selectors;
const { signInForm: signInForm } = selectors;

describe('Create invited user account from the email', () => {
  const serverId = 'iyseeyo7';
  let emailAddress = "test" + Math.floor((Math.random() * 100) + 1) + "_" + Math.floor((Math.random() * 100) + 1) + "@iyseeyo7.mailosaur.net";
  beforeEach(() => {
    cy.visit('/individual/account/signup');
    cy.get(signUpform.firstName).type('melissa');
    cy.get(signUpform.lastName).type('thomas');
    cy.get(signUpform.email).type(emailAddress);
    cy.get(signUpform.password).type('Test@77777');
    cy.get(signUpform.passwordConfirmation).type('Test@77777');
    cy.get(signUpform.isAgreeTermAndConditions).click({ force: true });
    cy.get(signUpform.signUpButton).click({ force: true });
    cy.wait(20000);
    cy.get(form.submitBtn, { timeout: 250000 }).should('be.visible');
    try {
      cy.mailosaurGetMessage(serverId, {
        sentTo: emailAddress
      }).then(email => {
        expect(email.subject).to.equal("Welcome Melissa! Here's Your Code 💌");
        const firstCode = email.html.codes[0]
        cy.log(firstCode.value)
        cy.get(form.verificationCode).clear();
        cy.get(form.verificationCode).type(firstCode.value);
        cy.get(form.submitBtn).click({ force: true });
        cy.get(form.verificationError).contains('Account verified, redirecting you to Editorielle');
      })
      throw ("Unable to find email")
    } catch (err) {
      cy.log("ERROR!!!", err)
    }
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

  });

  it.skip('Should create account on setting password from invitation email', () => {
    let testemail = "test" + Math.floor((Math.random() * 100) + 1) + "_" + Math.floor((Math.random() * 100) + 1) + "@iyseeyo7.mailosaur.net";
    cy.get(inviteMembersForm.email).type(testemail);
    cy.contains('Next').click({ force: true });
    //payment page
    //verify plan and price on invite page
    cy.contains('Number of members').should('exist');
    cy.contains('1x').should('exist');
    cy.contains('£10/month').should('exist');
    //Categories Page is displayed
    cy.contains('Select your instant categories').should('exist');
    cy.url("https://editorielle-fe-uat.vercel.app/individual/choose-categories");
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
    cy.get('.SubmitButton-Text--pre').click({ force: true });
    cy.get(inviteMembersForm.letsGetGoing, { timeout: 80000 }).should('exist');
    //search for invitation email to invited user and create account 
    try {
      cy.mailosaurGetMessage(serverId, {
        sentTo: testemail
      }).then(email => {
        expect(email.subject).to.equal("You’ve Been Invited By melissa thomas !💌");
        let verifyLink = email.html.links[0].href;
        cy.visit(verifyLink);
        cy.get(createAccountForm.newPassword).type("Test123456!");
        cy.get(createAccountForm.reenterPassword).type("Test123456!");
        cy.get(signUpform.isAgreeTermAndConditions).click({ force: true });
        cy.get(signUpform.signUpButton).click({ force: true });
      });
      throw ("Unable to find email")
    } catch (err) {
      cy.log("ERROR!!!", err)
    }
    //login
    cy.visit('/account/signin');
    cy.get(signInForm.email).type(testemail)
    cy.get(signInForm.password).type('Test123456!')
    cy.get(signInForm.loginButton).click()
  })
});
