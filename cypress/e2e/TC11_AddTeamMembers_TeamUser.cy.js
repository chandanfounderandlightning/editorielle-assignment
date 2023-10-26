import { selectors } from "../support/selectors";
const { signInForm: form } = selectors;
const { addMembersPage: addMembersForm } = selectors;
const { signUpForm: signUpform } = selectors;
const { createAccountPage: createAccountForm } = selectors;
const { teamsPage: teamsForm } = selectors;
import datafile from "../support/datafile";

describe('View members screen of admin user', () => {
  const serverId = 'iyseeyo7';
  beforeEach(() => {
    cy.visit('/account/signin');
    cy.get(form.email).type(datafile.username)
    cy.get(form.password).type(datafile.password)
    cy.get(form.loginButton).click();
    cy.wait(10000);
  });

  it('Should view team members of Admin user in Members screen', () => {
    //Verify Team tab
    cy.get(teamsForm.teamsTab).should('exist');
    cy.get(teamsForm.teamsTab).click({ force: true });
    cy.get(teamsForm.members).should('exist');
    cy.contains('Team members').should('exist');
    cy.contains(datafile.messageTeamTab).should('exist');
    cy.contains('Add member').should('exist');
})
  it('Should add team members in Members screen', () => {
    //Select Team tab
    cy.get(teamsForm.teamsTab).click({ force: true });
    cy.wait(3000);
    //SELECT add member CTA
    cy.contains('Add member').click({ force: true });
    //Enter details
    function makeFN(length) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      } 
          return result;
  }
    cy.get(addMembersForm.firstName).type(makeFN(6));
    //enter last name
    function makeLN(length) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      } 
          return result;
  }
    cy.get(addMembersForm.lastName).type(makeLN(6));
    let testemail = "test" + Math.floor((Math.random() * 100) + 1) + "_" + Math.floor((Math.random() * 100) + 1) + "@iyseeyo7.mailosaur.net";
    cy.get(addMembersForm.email).type(testemail);
    cy.get(teamsForm.messageInAddMemberForm).contains(datafile.messageInAddMemberForm);
    cy.contains('Invite member').click({ force: true });
    cy.contains('Add member').should('exist');
    cy.wait(2000);
    //check the added member in list
    cy.get(teamsForm.membersList).each(($el) => {
      //Find element based on InnerText
      if ($el.text() == testemail) {
          cy.contains(testemail).should('exist');
      }
    })
    //Verify invitation email
    try {
      cy.mailosaurGetMessage(serverId, {
        sentTo: testemail
      }).then(email => {
        expect(email.subject).to.equal("You’ve Been Invited By Jane Marie !💌");
        let verifyLink = email.html.links[0].href;
        cy.visit(verifyLink);
        cy.get(createAccountForm.newPassword).type(datafile.passwordForMember);
        cy.get(createAccountForm.reenterPassword).type(datafile.passwordForMember);
        cy.get(signUpform.isAgreeTermAndConditions).click({ force: true });
        cy.get(signUpform.signUpButton).click({ force: true });
        cy.wait(2000);
      });
      throw ("Unable to find email")
    } catch (err) {
      cy.log("ERROR!!!", err)
    }
    //login with new member
    cy.visit('/account/signin');
    cy.get(form.email).type(testemail);
    cy.get(form.password).type(datafile.passwordForMember);
    cy.get(form.loginButton).click();
  })

  it('Should add already added team member in Members list', () => {
    cy.get(teamsForm.teamsTab).should('exist');
    cy.get(teamsForm.teamsTab).click({ force: true });
    //SELECT add member
    cy.contains('Add member').click({ force: true });
    //Enter details
    cy.get(addMembersForm.firstName).type(datafile.firstname);
    cy.get(addMembersForm.lastName).type(datafile.lastName);
    cy.get(addMembersForm.email).type(datafile.username);
    cy.get(teamsForm.messageInAddMemberForm).contains(datafile.messageInAddMemberForm);
    cy.contains('Invite member').click({ force: true });
    cy.get(addMembersForm.errorMsg).contains(datafile.errorMsgForRegisteredUser);
    cy.contains('Cancel').click({ force: true });
})

  it('Should not add member with blank first name, blank last name and blank email, special chars and numbers in first name, last name and email', () => {
    cy.get(teamsForm.teamsTab).should('exist');
    cy.get(teamsForm.teamsTab).click({ force: true });
    //SELECT add member
    cy.contains('Add member').click({ force: true });
    //Enter details
    cy.wait(2000);
    cy.get(addMembersForm.lastName).type(datafile.lastName);
    let testemail = "test" + Math.floor((Math.random() * 100) + 1) + "_" + Math.floor((Math.random() * 100) + 1) + "@yopmail.com";
    cy.get(addMembersForm.email).type(testemail);
    cy.contains('Invite member').click({ force: true });
    cy.get(addMembersForm.errorMsg_FN).contains(datafile.errorMsg_FN);
    cy.contains('Cancel').click({ force: true });
    //SELECT add member
    cy.contains('Add member').click({ force: true });
    cy.wait(2000);
    //Enter details
    cy.get(addMembersForm.firstName).type(datafile.firstname);
    let testemail1 = "test" + Math.floor((Math.random() * 100) + 1) + "_" + Math.floor((Math.random() * 100) + 1) + "@yopmail.com";
    cy.get(addMembersForm.email).type(testemail1);
    cy.contains('Invite member').click({ force: true });
    cy.get(addMembersForm.errorMsg_LN).contains(datafile.errorMsg_LN);
    cy.contains('Cancel').click({ force: true });
    //SELECT add member
    cy.contains('Add member').click({ force: true });
    cy.wait(2000);
    //Enter details
    cy.get(addMembersForm.firstName).type(datafile.firstname);
    cy.get(addMembersForm.lastName).type(datafile.lastName);
    cy.contains('Invite member').click({ force: true });
    cy.get(addMembersForm.errorMsg_email).contains(datafile.errorMsg_email);
    cy.contains('Cancel').click({ force: true });
    //special chars and numbers in form
    //SELECT add member
    cy.contains('Add member').click({ force: true });
    //Enter details
    cy.wait(2000);
    cy.get(addMembersForm.firstName).type(datafile.firstNamewithSpecialCharAndNumbers);
    cy.get(addMembersForm.lastName).type(datafile.lastNamewithSpecialCharAndNumbers);
    cy.get(addMembersForm.email).type(datafile.invalidEmail);
    cy.contains('Invite member').click({ force: true });
    cy.get(addMembersForm.errorMsg_FN).contains(datafile.errorMsg_FN_specialChar_numbers);
    cy.get(addMembersForm.errorMsg_LN).contains(datafile.errorMsg_LN_specialChar_numbers);
    cy.get(addMembersForm.errorMsg_email).contains(datafile.errorMsg_email_specialChar_numbers);
    cy.contains('Cancel').click({ force: true });
    //Blank spaces
    //SELECT add member
    cy.contains('Add member').click({ force: true });
    //Enter details
    cy.wait(2000);
    cy.get(addMembersForm.firstName).type('            ');
    cy.get(addMembersForm.lastName).type('          ');
    cy.get(addMembersForm.email).type('             ');
    cy.contains('Invite member').click({ force: true });
    cy.get(addMembersForm.errorMsg_FN).contains(datafile.errorMsg_FN);
    cy.get(addMembersForm.errorMsg_LN).contains(datafile.errorMsg_LN);
    cy.get(addMembersForm.errorMsg_email).contains(datafile.errorMsg_email);
    cy.contains('Cancel').click({ force: true });
  })
});