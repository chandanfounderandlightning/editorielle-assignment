import datafile from "../support/datafile";
import { selectors } from "../support/selectors";
const { signInForm: form } = selectors;
const { addMembersPage: addMembersForm } = selectors;
const { createAccountPage: createAccountForm } = selectors;
const { signUpForm: signUpform } = selectors;
const { teamsPage: teamsForm } = selectors;
const { editMembersPage: editMembersForm } = selectors;

describe('View members screen of admin user to edit', () => {
  const serverId = 'iyseeyo7';
  beforeEach(() => {
    cy.visit('/account/signin');
    cy.get(form.email).type(datafile.username)
    cy.get(form.password).type(datafile.password)
    cy.get(form.loginButton).click();
    cy.wait(10000);
  });

  it('Should edit team members in Members screen', () => {
    cy.get(teamsForm.teamsTab).should('exist');
    cy.get(teamsForm.teamsTab).click({ force: true });
    cy.get(teamsForm.members).should('exist');
    cy.contains('Team members').should('exist');
    cy.contains(datafile.messageTeamTab).should('exist');
    cy.contains('Add member').should('exist');
    cy.get(editMembersForm.editBtnForList).click({ force: true });//click on 2nd member edit button
    //Update first name
    function makeFN(length) {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
    cy.get(addMembersForm.firstName).clear();
    cy.get(addMembersForm.firstName).type(makeFN(6));
    //update last name
    function makeLN(length) {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
    cy.get(addMembersForm.lastName).clear();
    cy.get(addMembersForm.lastName).type(makeLN(6));
    cy.get(addMembersForm.email).clear();
    let testemail = "test" + Math.floor((Math.random() * 100) + 1) + "_" + Math.floor((Math.random() * 100) + 1) + "@iyseeyo7.mailosaur.net";
    cy.get(addMembersForm.email).type(testemail);
    cy.contains('Save').click({ force: true });
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
        cy.wait(3000);
      });
      throw ("Unable to find email")
    } catch (err) {
      cy.log("ERROR!!!", err)
    }
    //login
    cy.visit('/account/signin');
    cy.get(form.email).type(testemail)
    cy.get(form.password).type(datafile.passwordForMember)
    cy.get(form.loginButton).click()
  })

  it('Should edit email only of added team member in Members list', () => {
    //Select Team tab
    cy.get(teamsForm.teamsTab).click({ force: true });
    //SELECT Edit member CTA
    cy.contains('Add member').should('exist');
    cy.get(editMembersForm.editBtnForList).click({ force: true });
    //Update email
    let testemail = "test-" + Math.floor((Math.random() * 100) + 1) + "_" + Math.floor((Math.random() * 100) + 1) + "@yopmail.com";
    cy.get(addMembersForm.email).clear();
    cy.get(addMembersForm.email).type(testemail);
    cy.contains('Save').click({ force: true });
    cy.contains('Add member').should('exist');
    cy.wait(3000);
    //check the added member in list
    cy.get(teamsForm.membersList).each(($el) => {
      //Find element based on InnerText
      if ($el.text() == testemail) {
        cy.contains(testemail).should('exist');
      }
    })
    //login
    cy.visit('/account/signin');
    cy.get(form.email).type(testemail);
    cy.get(form.password).type(datafile.passwordForMember);
    cy.get(form.loginButton).click();
    cy.get(form.errorMessage).contains(datafile.errorMsg_emailNotVerified);
  })

  it('Should edit FN and LN of team member in Members screen', () => {
    cy.get(teamsForm.teamsTab).should('exist');
    cy.get(teamsForm.teamsTab).click({ force: true });
    cy.contains('Add member').should('exist');
    //SELECT Edit member CTA
    cy.get(editMembersForm.editBtnForList).click({ force: true });
    //Update first name
    function makeFN(length) {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
    cy.get(addMembersForm.firstName).clear();
    cy.get(addMembersForm.firstName).type(makeFN(6));
    //update last name
    function makeLN(length) {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
    cy.get(addMembersForm.lastName).clear();
    cy.get(addMembersForm.lastName).type(makeLN(6));
    //Pause sendouts in edit member form - Past date
    cy.contains('Pause member').should('exist');
    cy.get(editMembersForm.pauseDate).clear();
    cy.get(editMembersForm.pauseDate).type(datafile.pastDate);
    cy.get(editMembersForm.pauseSendoutBtn).click({ force: true });
    cy.get(editMembersForm.errorMsgForDate).contains(datafile.errorMsgForPastDate);
    //Pause sendouts in edit member form - Invalid date
    cy.get(editMembersForm.pauseDate).clear();
    cy.get(editMembersForm.pauseDate).type(datafile.invalidDate);
    cy.get(editMembersForm.pauseSendoutBtn).click({ force: true });
    cy.get(editMembersForm.errorMsgForDate).contains(datafile.errorMsgForInvalidDate);
    //Pause sendouts in edit member form - Future date
    cy.get(editMembersForm.pauseDate).clear();
    cy.get(editMembersForm.pauseDate).type(datafile.futureDate);
    cy.get(editMembersForm.pauseSendoutBtn).click({ force: true });
    cy.contains('Save').click({ force: true });
    cy.contains('Add member').should('exist');
    //check the added member in list
    cy.get(teamsForm.membersList).each(($el) => {
      //Find element based on InnerText
      if ($el.text() == makeFN(6)) {
        cy.contains(makeFN(6)).should('exist');
      }
    })
  })
  
  it('Should not edit member with blank first name, blank last name and blank email, special chars and numbers in first name, last name and email', () => {
    cy.get(teamsForm.teamsTab).should('exist');
    cy.get(teamsForm.teamsTab).click({ force: true });
    //SELECT Edit member CTA
    cy.contains('Add member').should('exist');
    cy.get(editMembersForm.editBtnForList).click({ force: true });
    //Enter details - Blank FN
    cy.wait(4000);
    cy.get(addMembersForm.firstName).clear();
    cy.get(addMembersForm.lastName).type(datafile.lastName);
    let testemail = "test" + Math.floor((Math.random() * 100) + 1) + "_" + Math.floor((Math.random() * 100) + 1) + "@yopmail.com";
    cy.get(addMembersForm.email).clear();
    cy.get(addMembersForm.email).type(testemail);
    cy.contains('Save').click({ force: true });
    cy.get(addMembersForm.errorMsg_FN).contains(datafile.errorMsg_FN);
    cy.contains('Close').click({ force: true });
    //SELECT edit button
    cy.get(editMembersForm.editBtnForList).click({ force: true });
    cy.wait(4000);
    //Enter details - Blank LN
    cy.get(addMembersForm.firstName).clear();
    cy.get(addMembersForm.firstName).type(datafile.firstname);
    cy.get(addMembersForm.lastName).clear();
    let testemail1 = "test" + Math.floor((Math.random() * 100) + 1) + "_" + Math.floor((Math.random() * 100) + 1) + "@yopmail.com";
    cy.get(addMembersForm.email).clear();
    cy.get(addMembersForm.email).type(testemail1);
    cy.contains('Save').click({ force: true });
    cy.get(addMembersForm.errorMsg_LN).contains(datafile.errorMsg_LN);
    cy.contains('Close').click({ force: true });
    //SELECT edit button
    cy.get(editMembersForm.editBtnForList).click({ force: true });
    cy.wait(4000);
    //Enter details - Blank email
    cy.get(addMembersForm.firstName).clear();
    cy.get(addMembersForm.firstName).type(datafile.firstname);
    cy.get(addMembersForm.lastName).clear();
    cy.get(addMembersForm.lastName).type(datafile.lastName);
    cy.get(addMembersForm.email).clear();
    cy.contains('Save').click({ force: true });
    cy.get(addMembersForm.errorMsg_email).contains(datafile.errorMsg_email);
    cy.contains('Close').click({ force: true });
    //special chars and numbers in form
    //SELECT edit button
    cy.get(editMembersForm.editBtnForList).click({ force: true });
    //Enter details
    cy.wait(4000);
    cy.get(addMembersForm.firstName).clear();
    cy.get(addMembersForm.firstName).type(datafile.firstNamewithSpecialCharAndNumbers);
    cy.get(addMembersForm.lastName).clear();
    cy.get(addMembersForm.lastName).type(datafile.lastNamewithSpecialCharAndNumbers);
    cy.wait(2000);
    cy.get(addMembersForm.email).clear();
    cy.get(addMembersForm.email).type(datafile.errorMsg_email_specialChar_numbers);
    cy.contains('Save').click({ force: true });
    cy.get(addMembersForm.errorMsg_FN).contains(datafile.errorMsg_FN_specialChar_numbers);
    cy.get(addMembersForm.errorMsg_LN).contains(datafile.errorMsg_LN_specialChar_numbers);
    cy.get(addMembersForm.errorMsg_email).contains(datafile.errorMsg_email_specialChar_numbers);
    cy.contains('Close').click({ force: true });
    //Blank spaces
    //SELECT edit button
    cy.get(editMembersForm.editBtnForList).click({ force: true });
    //Enter details - Blank spaces
    cy.wait(4000);
    cy.get(addMembersForm.firstName).clear();
    cy.get(addMembersForm.firstName).type('            ');
    cy.get(addMembersForm.lastName).clear();
    cy.get(addMembersForm.lastName).type('          ');
    cy.get(addMembersForm.email).clear();
    cy.get(addMembersForm.email).type('             ');
    cy.contains('Save').click({ force: true });
    cy.get(addMembersForm.errorMsg_FN).contains(datafile.errorMsg_FN);
    cy.get(addMembersForm.errorMsg_LN).contains(datafile.errorMsg_LN);
    cy.get(addMembersForm.errorMsg_email).contains(datafile.errorMsg_email);
    cy.contains('Close').click({ force: true });
  })
});