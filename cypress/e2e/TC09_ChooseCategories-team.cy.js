import { selectors } from "../support/selectors";
const { signUpForm: signUpform } = selectors;
const { verificationPage: form } = selectors;
const { inviteMembersPage: inviteMembersForm } = selectors;
const { categoriesPage: categoriesForm } = selectors;
const { inviteMembersTeamPage: inviteMembersTeamForm} = selectors;

describe('Sign up scenarios - till choose categories page', () => {
  let emailAddress = "test" + Math.floor((Math.random() * 100) + 1) + "_" + Math.floor((Math.random() * 100) + 1) + "@yopmail.com";
  beforeEach(() => {
    cy.visit('/team/account/signup');
    cy.get(signUpform.firstName).type('melissa');
    cy.get(signUpform.lastName).type('thomas');
    cy.get(signUpform.email).type(emailAddress);
    cy.get(signUpform.password).type('Test@77777');
    cy.get(signUpform.passwordConfirmation).type('Test@77777');
    cy.get(signUpform.isAgreeTermAndConditions).click({ force: true });
    cy.get(signUpform.signUpButton).click({ force: true });
    cy.wait(10000);
    cy.contains('Thanks', { timeout: 180000 }).should('exist');
    cy.get(form.verificationCode).clear();
    cy.get(form.verificationCode).type('123456');
    cy.get(form.submitBtn).click({ force: true });
    cy.get(form.verificationError).contains('Account verified, redirecting you to Editorielle');
    cy.contains('Who will receive the daily newsletter?', { timeout: 30000 }).should('exist');
    //add second member
    cy.get(inviteMembersTeamForm.firstName_1).type('Jane-Marie');
    cy.get(inviteMembersTeamForm.lastName_1).type('Taylor');
    let email = "test." + Math.floor((Math.random() * 100) + 1) + "_" + Math.floor((Math.random() * 100) + 1) + "@yopmail.com";
    cy.get(inviteMembersTeamForm.email_1).type(email);
    cy.contains('Next', { timeout: 30000 }).click({ force: true });
  });

  it('Should show Category page if user do back and come back to Category page, dont select any category, 1 category is selected', () => {
    //Select Back button and Come back to Category page
    //Category Page is displayed
    cy.contains('Select your instant categories').should('exist');
    cy.url("https://editorielle-fe-uat.vercel.app/team/choose-categories");
    //choose categories
    try{
      for (let i=2; i<4;){
        const fullstring = '.flex-wrap > :nth-child('+ i +') > .border'             
          cy.get(fullstring).click({force:true})
          i++;
          cy.wait(3000);
        }
        throw("Unable to find 1 category")
    }catch(err){
        cy.log("ERROR!!!", err)
      }
    cy.get(categoriesForm.backBtn,{ timeout: 30000 })
    .eq(1)
    .click({ force: true });  
    //Invite members page is displayed
    cy.contains('Who will receive the daily newsletter?', { timeout: 30000 }).should('exist');  
    cy.wait(10000);
    cy.contains('Next', {timeout : 30000}).click({ force: true });
    cy.contains('Select your instant categories').should('exist');
    cy.url("https://editorielle-fe-uat.vercel.app/team/choose-categories");
    //choose categories
    try{
      for (let i=2; i<10;){
        const fullstring = '.flex-wrap > :nth-child('+ i +') > .border'             
          cy.get(fullstring).click({force:true})
          i++;
        }
        throw("Unable to find 1 category")
    }catch(err){
        cy.log("ERROR!!!", err)
      }
    cy.get(inviteMembersForm.continueToPayment, { timeout: 30000 })
    .eq(1)
    .click({ force: true });  
    cy.get('div.App-Overview > div > div', { timeout: 80000 }).should('exist');

  })
})
