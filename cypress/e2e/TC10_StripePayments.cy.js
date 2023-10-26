import { selectors } from "../support/selectors";
const { signUpForm: signUpform } = selectors;
const { verificationPage: form } = selectors;
const { inviteMembersPage: inviteMembersForm } = selectors;
//import 'cypress-plugin-stripe-elements';

describe('Sign up page scenarios - till Payments', () => {
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
    cy.wait(3000);
    cy.get(form.verificationCode, { timeout: 10000 }).type('123456');
    cy.get(form.submitBtn).click({ force: true });
    cy.get(form.verificationError).contains('Account verified, redirecting you to Editorielle');
    //Account holder registered for newsletter
    cy.contains('Next').click({ force: true });

  });

  it.skip('Should display confirmation page and user completes the payment for all categories', () => {
    //payment page
    //verify plan and price
    cy.contains('Number of members').should('exist');
    cy.contains('1x').should('exist');
    cy.contains('£10/month').should('exist');
    //Categories Page is displayed
    cy.contains('Select your instant categories').should('exist');
    cy.url("https://editorielle-fe-uat.vercel.app/individual/choose-categories");
    //choose categories
    try {
      for (let i = 2; i < 14;) {
        const fullstring = '.flex-wrap > :nth-child(' + i + ') > .border'
        cy.get(fullstring).click({ force: true })
        i++;
        cy.wait(1000);
      }
      throw ("Unable to find categories")
    } catch (err) {
      cy.log("ERROR!!!", err)
    }
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
    cy.get(inviteMembersForm.letsGetGoing, { timeout: 80000 }).should('exist');

  })

  it.skip('Should display confirmation page and user completes the payment with promotion code for 0 category', () => {
    //payment page
    //verify plan and price
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
    cy.get('div.App-Overview > div > div', { timeout: 1200000 }).should('exist');
    cy.get('#promotionCode').click({ force: true })
    cy.get('#promotionCode').type("ED100", { enter });
    cy.get('#OrderDetails-TotalAmount > span').contains('£0.00')
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
    cy.get('div.SubmitButton-IconContainer').click({ force: true });
    cy.get(inviteMembersForm.letsGetGoing, { timeout: 1200000 }).should('exist');
  })

  it.skip('Should display confirmation page and user completes the payment for less than 12 categories', () => {
    //payment page
    //verify plan and price
    cy.contains('Number of members').should('exist');
    cy.contains('1x').should('exist');
    cy.contains('£10/month').should('exist');
    //Categories Page is displayed
    cy.contains('Select your instant categories').should('exist');
    cy.url("https://editorielle-fe-uat.vercel.app/individual/choose-categories");
    //choose categories
    try {
      for (let i = 2; i < 5;) {
        const fullstring = '.flex-wrap > :nth-child(' + i + ') > .border'
        cy.get(fullstring).click({ force: true })
        i++;
      }
      throw ("Unable to find 1 category")
    } catch (err) {
      cy.log("ERROR!!!", err)
    }
    cy.get(inviteMembersForm.continueToPayment, { timeout: 30000 })
      .eq(1)
      .click({ force: true });
    cy.get('div.App-Overview > div > div', { timeout: 150000 }).should('exist');
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
    cy.get('div.SubmitButton-IconContainer').click({ force: true });
    cy.get(inviteMembersForm.letsGetGoing, { timeout: 80000 }).should('exist');
  })
})
