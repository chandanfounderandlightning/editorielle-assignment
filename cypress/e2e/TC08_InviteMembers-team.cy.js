import { selectors } from "../support/selectors";
const { signUpForm: signUpform } = selectors;
const { verificationPage: form } = selectors;
const { inviteMembersPage: inviteMembersForm } = selectors;
const { inviteMembersTeamPage: inviteMembersTeamForm} = selectors;
const { categoriesPage: categoriesForm } = selectors;

describe('Sign up page scenarios - till Invite Members Team', () => {
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
    cy.wait(10000);
    cy.get(form.submitBtn, { timeout: 200000 }).should('be.visible');
    cy.get(form.verificationCode).type('123456');
    cy.get(form.submitBtn).click({ force: true });
    cy.get(form.verificationError).contains('Account verified, redirecting you to Editorielle');
  });

  it('Should show error if blank FN, blank LN, blank email, invalid details entered', () => {
    //blank first name
    cy.wait(5000);
    cy.get(inviteMembersTeamForm.lastName_1).type('Tester');
    let email1 = "test" + Math.floor((Math.random() * 100) + 1) + "_" + Math.floor((Math.random() * 100) + 1) + "@yopmail.com";
    cy.get(inviteMembersTeamForm.email_1).type(email1);
    cy.contains('Next').click({ force: true });
    cy.get(inviteMembersTeamForm.firstName_error).contains('Please enter your first name')
    //blank last Name
    cy.get(inviteMembersTeamForm.firstName_1).type('Tester');
    cy.get(inviteMembersTeamForm.lastName_1).clear();
    cy.contains('Next').click({ force: true });
    cy.get(inviteMembersTeamForm.lastName_error).contains('Please enter your last name')
    //blank email
    cy.get(inviteMembersTeamForm.lastName_1).type('Hosker');
    cy.get(inviteMembersTeamForm.email_1).clear();
    cy.contains('Next').click({ force: true });
    cy.get(inviteMembersTeamForm.email_error).contains('Please enter an email address')
    //blank spaces in first name
    cy.get(inviteMembersTeamForm.firstName_1).clear();
    cy.get(inviteMembersTeamForm.firstName_1).type('           ');
    cy.get(inviteMembersTeamForm.lastName_1).type('Hosker');
    cy.get(inviteMembersTeamForm.email_1).type(email1);
    cy.contains('Next').click({ force: true });
    cy.get(inviteMembersTeamForm.firstName_error).contains('Please enter your first name')
    //blank spaces in last name
    cy.get(inviteMembersTeamForm.firstName_1).clear();
    cy.get(inviteMembersTeamForm.firstName_1).type('Tester');
    cy.get(inviteMembersTeamForm.lastName_1).clear();
    cy.get(inviteMembersTeamForm.lastName_1).type('           ');
    cy.contains('Next').click({ force: true });
    cy.get(inviteMembersTeamForm.lastName_error).contains('Please enter your last name')
    //blank spaces in email
    cy.get(inviteMembersTeamForm.lastName_1).clear();
    cy.get(inviteMembersTeamForm.lastName_1).type('Hosker');
    cy.get(inviteMembersTeamForm.email_1).clear();
    cy.get(inviteMembersTeamForm.email_1).type('          ');
    cy.contains('Next').click({ force: true });
    cy.get(inviteMembersTeamForm.email_error).contains('Please enter an email address')
    //numbers in first name
    cy.get(inviteMembersTeamForm.firstName_1).clear();
    cy.get(inviteMembersTeamForm.firstName_1).type('12333');
    cy.get(inviteMembersTeamForm.email_1).clear();
    cy.get(inviteMembersTeamForm.email_1).type(email1);
    cy.contains('Next').click({ force: true });
    cy.get(inviteMembersTeamForm.firstName_error).contains('Please remove special characters or numbers in first name')
    //numbers in last name
    cy.get(inviteMembersTeamForm.firstName_1).clear();
    cy.get(inviteMembersTeamForm.firstName_1).type('Tester');
    cy.get(inviteMembersTeamForm.lastName_1).clear();
    cy.get(inviteMembersTeamForm.lastName_1).type('23456');
    cy.contains('Next').click({ force: true });
    cy.get(inviteMembersTeamForm.lastName_error).contains('Please remove special characters or numbers in last name')
    //invalid in email
    cy.get(inviteMembersTeamForm.lastName_1).clear();
    cy.get(inviteMembersTeamForm.lastName_1).type('Hosker');
    cy.get(inviteMembersTeamForm.email_1).clear();
    cy.get(inviteMembersTeamForm.email_1).type('111111');
    cy.contains('Next').click({ force: true });
    cy.get(inviteMembersTeamForm.email_error).contains('Please enter a valid email address')
    //special characters in first name
    cy.get(inviteMembersTeamForm.firstName_1).clear();
    cy.get(inviteMembersTeamForm.firstName_1).type('~`!@#$%^&*()_+{}:"<>?,./;[]\|');
    cy.get(inviteMembersTeamForm.lastName_1).clear();
    cy.get(inviteMembersTeamForm.lastName_1).type('Tester');
    cy.get(inviteMembersTeamForm.email_1).clear();
    cy.get(inviteMembersTeamForm.email_1).type(email1);
    cy.contains('Next').click({ force: true });
    cy.get(inviteMembersTeamForm.firstName_error).contains('Please remove special characters or numbers in first name')
    //special characters in last name
    cy.get(inviteMembersTeamForm.firstName_1).clear();
    cy.get(inviteMembersTeamForm.firstName_1).type('Tester');
    cy.get(inviteMembersTeamForm.lastName_1).clear();
    cy.get(inviteMembersTeamForm.lastName_1).type('~`!@#$%^&*()_+{}:"<>?,./;[]\|');
    cy.get(inviteMembersTeamForm.email_1).clear();
    cy.get(inviteMembersTeamForm.email_1).type(email1);
    cy.contains('Next').click({ force: true });
    cy.get(inviteMembersTeamForm.lastName_error).contains('Please remove special characters or numbers in last name')
    //special characters in email
    cy.get(inviteMembersTeamForm.firstName_1).clear();
    cy.get(inviteMembersTeamForm.firstName_1).type('James');
    cy.get(inviteMembersTeamForm.lastName_1).clear();
    cy.get(inviteMembersTeamForm.lastName_1).type('Hosker');
    cy.get(inviteMembersTeamForm.email_1).clear();
    cy.get(inviteMembersTeamForm.email_1).type('~`!@#$%^&*()_+{}:"<>?,./;[]\|');
    cy.contains('Next').click({ force: true });
    cy.get(inviteMembersTeamForm.email_error).contains('Please enter a valid email address')
    //1 character in first name
    cy.get(inviteMembersTeamForm.firstName_1).clear();
    cy.get(inviteMembersTeamForm.firstName_1).type('s');
    cy.get(inviteMembersTeamForm.lastName_1).clear();
    cy.get(inviteMembersTeamForm.lastName_1).type('Tester');
    cy.get(inviteMembersTeamForm.email_1).clear();
    cy.get(inviteMembersTeamForm.email_1).type(email1);
    cy.contains('Next').click({ force: true });
    cy.get(inviteMembersTeamForm.firstName_error).contains('First name should have at least 2 characters')
    //1 character in last name
    cy.get(inviteMembersTeamForm.firstName_1).clear();
    cy.get(inviteMembersTeamForm.firstName_1).type('Tester');
    cy.get(inviteMembersTeamForm.lastName_1).clear();
    cy.get(inviteMembersTeamForm.lastName_1).type('y');
    cy.get(inviteMembersTeamForm.email_1).clear();
    cy.get(inviteMembersTeamForm.email_1).type(email1);
    cy.contains('Next').click({ force: true });
    cy.get(inviteMembersTeamForm.lastName_error).contains('Last name should have at least 2 characters')
    //Duplicate email IDs in both members
    cy.get(inviteMembersTeamForm.firstName_1).clear();
    cy.get(inviteMembersTeamForm.firstName_1).type('Tester');
    cy.get(inviteMembersTeamForm.lastName_1).clear();
    cy.get(inviteMembersTeamForm.lastName_1).type('James');
    cy.get(inviteMembersTeamForm.email_1).clear();
    cy.get(inviteMembersTeamForm.email_1).type(email1);
    cy.wait(5000);
    cy.get(inviteMembersForm.toggleBtn)
      .eq(0)
      .find('button')
      .click({ force: true });
    cy.get(inviteMembersTeamForm.firstName).type('Robbert');
    cy.get(inviteMembersTeamForm.lastName).type('Tony');
    cy.get(inviteMembersTeamForm.email).type(email1);
    cy.contains('Next').click({ force: true });
    cy.get(inviteMembersForm.validationError).contains('Please enter distinct email address for each team member')
    //adding new 7 team member
    cy.get(inviteMembersTeamForm.firstName_1).clear();
    cy.get(inviteMembersTeamForm.firstName_1).type('Jane-Marie');
    cy.get(inviteMembersTeamForm.lastName_1).clear();
    cy.get(inviteMembersTeamForm.lastName_1).type('Taylor');
    cy.get(inviteMembersTeamForm.email_1).clear();
    let email2 = "test." + Math.floor((Math.random() * 100) + 1) + "_" + Math.floor((Math.random() * 100) + 1) + "@yopmail.com";
    cy.get(inviteMembersTeamForm.email_1).type(email2);
    cy.contains('Add Member').click({ force: true });
    //adding 2nd member
    cy.get(inviteMembersTeamForm.firstName_2).type('Maria');
    cy.get(inviteMembersTeamForm.lastName_2).type('Hosker');
    let email3 = "test_" + Math.floor((Math.random() * 100) + 1) + "_" + Math.floor((Math.random() * 100) + 1) + "@yopmail.com";
    cy.get(inviteMembersTeamForm.email_2).type(email3);
    cy.get(':nth-child(6) > .mt-3').click({ forc: true });
    //adding 3rd member
    cy.get(inviteMembersTeamForm.firstName_3).type('Rommie');
    cy.get(inviteMembersTeamForm.lastName_3).type('Giraud');
    let email4 = "test" + Math.floor((Math.random() * 100) + 1) + "_" + Math.floor((Math.random() * 100) + 1) + "@yopmail.com";
    cy.get(inviteMembersTeamForm.email_3).type(email4);
    cy.get(':nth-child(7) > .mt-3').click({ force: true });
    //adding 4th member
    cy.get(inviteMembersTeamForm.firstName_4).type('Kim');
    cy.get(inviteMembersTeamForm.lastName_4).type('Venhuesen');
    let email5 = "test2" + Math.floor((Math.random() * 100) + 1) + "_" + Math.floor((Math.random() * 100) + 1) + "@yopmail.com";
    cy.get(inviteMembersTeamForm.email_4).type(email5);
    cy.get(':nth-child(8) > .mt-3').click({ force: true });
    //adding 5th member
    cy.get(inviteMembersTeamForm.firstName_5).type('Sebastien');
    cy.get(inviteMembersTeamForm.lastName_5).type('Giraud');
    let email6 = "test3" + Math.floor((Math.random() * 100) + 1) + "_" + Math.floor((Math.random() * 100) + 1) + "@yopmail.com";
    cy.get(inviteMembersTeamForm.email_5).type(email6);
    cy.get(':nth-child(9) > .mt-3').click({ force: true });
    //adding 6th member
    cy.get(inviteMembersTeamForm.firstName_6).type('Mathew');
    cy.get(inviteMembersTeamForm.lastName_6).type('Bruce');
    let email7 = "test4" + Math.floor((Math.random() * 100) + 1) + "_" + Math.floor((Math.random() * 100) + 1) + "@yopmail.com";
    cy.get(inviteMembersTeamForm.email_6).type(email7);
    cy.contains('Next').click({ force: true });
    //verify plan and price
    cy.contains('Number of members').should('exist');
    cy.contains('7x').should('exist');
    cy.contains('£40/month + VAT').should('exist');
    //Next Page is displayed
    cy.contains('Select your instant categories').should('exist');
    cy.url("https://editorielle-fe-uat.vercel.app/team/choose-categories");
    //select Back button from categories page
    cy.get(categoriesForm.backBtn,{ timeout: 30000 })
    .eq(1)
    .click({ force: true });
    try {
      for (let i = 4; i <= 6;) {
        const removeBtn = ':nth-child(' + i + ') > .text-rose-300'
        cy.get(removeBtn).click({ force: true })
        i++;
        cy.wait(1000);
      }
      throw ("Unable to find Remove button")
    } catch (err) {
      cy.log("ERROR!!!", err)
    }
    cy.get(inviteMembersTeamForm.firstName).clear();
    cy.get(inviteMembersTeamForm.firstName).type('Tester');
    cy.get(inviteMembersTeamForm.lastName).clear();
    cy.get(inviteMembersTeamForm.lastName).type('Hosker');
    cy.get(inviteMembersTeamForm.email).clear();
    cy.get(inviteMembersTeamForm.email).type(email1);
    cy.get(inviteMembersTeamForm.firstName_1).clear();
    cy.get(inviteMembersTeamForm.firstName_1).type('Jane-Marie');
    cy.get(inviteMembersTeamForm.lastName_1).clear();
    cy.get(inviteMembersTeamForm.lastName_1).type('Taylor');
    cy.get(inviteMembersTeamForm.email_1).clear();
    cy.get(inviteMembersTeamForm.email_1).type(email3);
    cy.contains('Next').click({ force: true });
    //verify plan and price
    cy.contains('Number of members').should('exist');
    cy.contains('4x').should('exist');
    cy.contains('£25/month').should('exist');
    //Next Page is displayed
    cy.contains('Select your instant categories').should('exist');
    cy.url("https://editorielle-fe-uat.vercel.app/team/choose-categories");
  })
})