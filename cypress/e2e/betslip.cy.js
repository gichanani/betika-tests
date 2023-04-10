const bettingPage = require("../support/pom/bettingPage")
const loginPage = require("../support/pom/loginPage")


describe('Betslip', () => {
  // beforeEach(() => {
  //   cy.betikasession()
  // })
  it('Navigate to betslip page', () => {
    cy.visit('/betslip')
    //cy.visit('/betslip', {timeout:60000})
  })

  it('Verify that a user can add a single selection to their betslip', () => {
    cy.visit('/s/soccer')
    cy.singlebet()
    cy.visit('/betslip')
    cy.get('.stacked').should('have.length', 1)
  })

  it('Verify that a user can add multiple selections to their betslip', () => {
    cy.visit('/s/soccer')
    cy.multibet()
    cy.visit('/betslip')
    cy.get('.stacked').should('have.length', 2)
  })
  
  it('Verify that a user can remove a selection from their betslip', () => {
    cy.visit('/s/soccer')
    cy.multibet()
    cy.visit('/betslip')
    cy.get('.stacked__remove').first().click()
    cy.get('.stacked').should('have.length', 1)
  })

  it('Verify that the user is prompted to confirm their bet before placing it.', () => {
    cy.login()
    cy.visit('/s/soccer')
    cy.singlebet()
    cy.visit('/betslip')
    bettingPage.elements.betamount().type('{backspace}{backspace}')
    bettingPage.elements.placebet().click()
    // cy.intercept('POST','https://api.betika.com/v2/bet').as('bet')
    // cy.wait('@bet')
    loginPage.elements.notification()
  })

  it('Verify that the user receives a confirmation message after placing a bet.', () => {
    cy.login()
    cy.visit('/s/soccer')
    cy.singlebet()
    cy.visit('/betslip')
    bettingPage.elements.betamount().type('{backspace}{backspace}')
    bettingPage.elements.placebet().click()
    loginPage.elements.notification().should('contain','Bet Placement Successful')
  })

  it.skip('Verify that the user account balance is correctly updated after placing a bet', () => {
    
  })

  it('Login and place a single bet successfully', () => {
    cy.login()
    cy.visit('/s/soccer')
    cy.singlebet()
    cy.visit('/betslip')
    bettingPage.elements.betamount().type('{backspace}{backspace}')
    bettingPage.elements.placebet().click()
    loginPage.elements.notification().should('contain','Bet Placement Successful')
  })

  it('Place a single bet without being logged in', () => {
    cy.visit('/s/soccer')
    cy.singlebet()
    cy.visit('/betslip')
    bettingPage.elements.betamount().type('{backspace}{backspace}')
    bettingPage.elements.placebet().click()
    loginPage.elements.notification().should('contain','Please login to place a bet')
    cy.url().should('contain','/login')
  })

  it('Login and place multibet', () => {
    cy.login()
    cy.visit('/s/soccer')
    cy.multibet()
    cy.visit('/betslip')
    bettingPage.elements.betamount().type('{backspace}{backspace}')
    bettingPage.elements.placebet().click()
    loginPage.elements.notification().should('contain','Bet Placement Successful')
  })

  it('Place a multi bet without being logged in', () => {
    cy.visit('/s/soccer')
    cy.multibet()
    cy.visit('/betslip')
    bettingPage.elements.betamount().type('{backspace}{backspace}')
    bettingPage.elements.placebet().click()
    loginPage.elements.notification().should('contain','Please login to place a bet')
    cy.url().should('contain','/login')
  })

  it('Place bet with less than minimum stake limit', () => {
    cy.visit('/s/soccer')
    cy.singlebet()
    cy.visit('/betslip')
    bettingPage.elements.betamount().type('{backspace}{backspace}{backspace}').type('0.99')
    bettingPage.elements.placebet().should('have.attr','disabled','disabled')
    
  })

  it('Place bet with amount exceeding wallet balance', () => {
    cy.login()
    cy.visit('/s/soccer')
    cy.singlebet()
    cy.visit('/betslip')
    bettingPage.elements.betamount().type('{backspace}{backspace}{backspace}').type('50000')
    bettingPage.elements.placebet().click()
    loginPage.elements.notification().should('contain','Max stake exceeded')
  })

  it.only('Cancelling betslip before game starts', () => {
    cy.login()
    cy.visit('/s/soccer')
    cy.singlebet()
    cy.visit('/betslip')
    bettingPage.elements.betamount().type('{backspace}{backspace}')
    bettingPage.elements.placebet().click()
    cy.visit('/mybets')
    cy.get('.bets > :nth-child(1)').click()
    cy.wait(3000)
    cy.get('.betdetails__summary__actions__item__progress__cancel').click()
  })

})