import datafile from "../support/datafile";
import { selectors } from "../support/selectors";
const { LogoutForm: logoutForm } = selectors;

describe('Log out button', () => {
  beforeEach(() => {
    cy.login(datafile.username, datafile.password);
  });

  it('Should logout successfully', () => {
    cy.visit('/team/dashboard/home/general');
    cy.get(logoutForm.userMenu).click({ force: true });
    cy.get(logoutForm.logout).click();
    cy.url().should('include', '/account/signin');
  });
});

