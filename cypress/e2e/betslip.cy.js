const bettingPage = require("../support/pom/bettingPage")
const loginPage = require("../support/pom/loginPage")


describe('Betslip with login', () => {
  beforeEach(() => {
    cy.betikasession()
  })
  
  it('Verify that the user is prompted to confirm their bet before placing it.', () => {
    cy.allure().severity('critical')
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
    cy.allure().severity('critical')
    cy.visit('/s/soccer')
    cy.singlebet()
    cy.visit('/betslip')
    bettingPage.elements.betamount().type('{backspace}{backspace}')
    bettingPage.elements.placebet().click()
    cy.get('.notification').should('contain','Bet Placement Successful')
    //loginPage.elements.notification().should('contain','Bet Placement Successful')
  })

  it.skip('Verify that the user account balance is correctly updated after placing a bet', () => {
    cy.allure().severity('blocker')
    cy.visit('/s/soccer')
    cy.multibet()
    cy.visit('/betslip')
    bettingPage.elements.betamount().type('{backspace}{backspace}')
    bettingPage.elements.placebet().click()
    loginPage.elements.notification().should('contain','Bet Placement Successful')
    
  })

  it('Login and place a single bet successfully', () => {
    cy.allure().severity('blocker')
    cy.visit('/s/soccer')
    cy.singlebet()
    cy.visit('/betslip')
    bettingPage.elements.betamount().type('{backspace}{backspace}')
    bettingPage.elements.placebet().click()
    cy.get('.notification').should('contain','Bet Placement Successful')
    //loginPage.elements.notification().should('contain','Bet Placement Successful')
  })

  it('Login and place multibet successfully', () => {
    cy.allure().severity('blocker')
    cy.visit('/s/soccer')
    cy.multibet()
    cy.visit('/betslip')
    bettingPage.elements.betamount().type('{backspace}{backspace}')
    bettingPage.elements.placebet().click()
    cy.get('.notification').should('contain','Bet Placement Successful')
    //loginPage.elements.notification().should('contain','Bet Placement Successful')
  })

  it('Place bet with amount exceeding wallet balance', () => {
    cy.allure().severity('blocker')
    cy.visit('/s/soccer')
    cy.singlebet()
    cy.visit('/betslip')
    bettingPage.elements.betamount().type('{backspace}{backspace}{backspace}').type('50000')
    bettingPage.elements.placebet().click()
    loginPage.elements.notification().should('contain','Max stake exceeded')
  })

  it('Failed betslip cancellation before game starts', () => {
    cy.allure().severity('critical')
    cy.visit('/s/soccer')
    cy.singlebet()
    cy.visit('/betslip')
    bettingPage.elements.betamount().type('{backspace}{backspace}')
    bettingPage.elements.placebet().click()
    cy.visit('/mybets')
    cy.get('.my-bets-bet--id').eq(0).invoke('text').then( (text) => {
      const cleanedText = text.replace(/[^\w\s]/gi, ''); 
      const betid = cleanedText.slice(0, 12);
      cy.visit(`https://www.betika.com/en-ke/b/${betid}`);
      cy.get('.betdetails__summary__actions__item__progress__cancel').click()
      cy.get('.confirm-dialogue__ok-btn').click()
      loginPage.elements.notification().should('contain','Sorry, bet cancel was not allowed. Invalid. Betika T&c apply.')
    })
  })  
    
  it('Successful betslip cancellation before game starts', () => {
    cy.allure().severity('critical')
    cy.visit('/s/soccer')
    cy.singlebet()
    cy.visit('/betslip')
    bettingPage.elements.betamount().type('{backspace}')
    bettingPage.elements.placebet().click()
    cy.wait(2000)
    cy.visit('/mybets')
    cy.get('.my-bets-bet--id').eq(0).invoke('text').then( (text) => {
      const cleanedText = text.replace(/[^\w\s]/gi, ''); 
      const betid = cleanedText.slice(0, 12);
      cy.visit(`https://www.betika.com/en-ke/b/${betid}`);
      cy.get('.betdetails__summary__actions__item__progress__cancel').click()
      cy.get('.confirm-dialogue__ok-btn').click()
      loginPage.elements.notification().should('contain','Bet cancel successfully accepted, you will receive confirmation shortly.')
    })
  }) 
})

describe('Betslip without login', () => {
  it('Navigate to betslip page', () => {
    cy.allure().severity('blocker')
    cy.visit('/betslip')
    //cy.visit('/betslip', {timeout:60000})
  })

  it('Verify that a user can add a single selection to their betslip', () => {
    cy.allure().severity('blocker')
    cy.visit('/s/soccer')
    cy.singlebet()
    cy.visit('/betslip')
    cy.get('.stacked').should('have.length', 1)
  })

  it('Verify that a user can add multiple selections to their betslip', () => {
    cy.allure().severity('blocker')
    cy.visit('/s/soccer')
    cy.multibet()
    cy.visit('/betslip')
    cy.get('.stacked').should('have.length', 2)
  })
  
  it('Verify that a user can remove a selection from their betslip', () => {
    cy.allure().severity('blocker')
    cy.visit('/s/soccer')
    cy.multibet()
    cy.visit('/betslip')
    cy.get('.stacked__remove').first().click()
    cy.get('.stacked').should('have.length', 1)
  })

  it('Place a single bet without being logged in', () => {
    cy.allure().severity('critical')
    cy.visit('/s/soccer')
    cy.singlebet()
    cy.visit('/betslip')
    bettingPage.elements.betamount().type('{backspace}{backspace}')
    bettingPage.elements.placebet().click()
    loginPage.elements.notification().should('contain','Please login to place a bet')
    cy.url().should('contain','/login')
  })

  it('Place a multi bet without being logged in', () => {
    cy.allure().severity('critical')
    cy.visit('/s/soccer')
    cy.multibet()
    cy.visit('/betslip')
    bettingPage.elements.betamount().type('{backspace}{backspace}')
    bettingPage.elements.placebet().click()
    loginPage.elements.notification().should('contain','Please login to place a bet')
    cy.url().should('contain','/login')
  })

  it('Place bet with less than minimum stake limit', () => {
    cy.allure().severity('blocker')
    cy.visit('/s/soccer')
    cy.singlebet()
    cy.visit('/betslip')
    bettingPage.elements.betamount().type('{backspace}{backspace}{backspace}').type('0.99')
    bettingPage.elements.placebet().should('have.attr','disabled','disabled')
    
  })
})