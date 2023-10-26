/// <reference types="cypress" />
import { selectors } from "./selectors";
const { signInForm: form } = selectors;

// -- This is a parent command --
Cypress.Commands.add('login', (username, password) => {
  cy.session([username, password], () => {
    cy.visit('/account/signin')
    cy.get(form.email).type('suman@founderandlightning.com')
    cy.get(form.password).type('Suman12345!')
    cy.get(form.loginButton).click()
    cy.url().should('include', '/team/dashboard');
  })
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
    }
  }
// Cypress.Commands.add('VerifyChildEmail',(emailAddress,subject)=>{
//     const serverId = 'iyseeyo7';
//     const serverDomain = "iyseeyo7.mailosaur.net";
//     cy.mailosaurGetMessage(serverId,{
//       sentTo: emailAddress
//     }).then(email=>{
//       cy.log(email.subject);
//       cy.log(subject);
//       expect(email.subject).to.equal(subject);
//       cy.log(email.html.links[0].href);
//       let verifyLink = email.html.links[0].href;
//       cy.visit(verifyLink);
//       cy.log(email.text.body);
//       const text1 = email.text.body;
//       cy.log(text1);
//     });
}
