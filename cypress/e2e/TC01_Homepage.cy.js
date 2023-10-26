import { selectors } from "../support/selectors";
const { homePage: homePage } = selectors;
describe('Home page scenarios', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Verify Home page buttons and links ', () => {
    cy.get(homePage.signUpButtonIndividual).contains('Individual Sign up')
    cy.get(homePage.signUpButtonTeam).contains('Team Sign up')
    cy.get(homePage.signInButton).contains('Log in')
  });

  it('Verify when individual sign up button is clicked it redirects to the individual sign up page', () => {
    cy.get(homePage.signUpButtonIndividual).click()
    cy.url().should('include', '/account/signup');
  });

  it('Verify when team sign up button is clicked it redirects to the team sign up page', () => {
    cy.get(homePage.signUpButtonTeam).click()
    cy.url().should('include', '/account/signup');
  });

  it('Verify  when Log in button is clicked it redirects to the Log in page', () => {
    cy.get(homePage.signInButton).click()
    cy.url().should('include', '/account/signin');
  });
});
