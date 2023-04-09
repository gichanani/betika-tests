import bettingPage from "../support/pom/bettingPage"
import loginPage from "../support/pom/loginPage"

describe('Betting games after login', () => {
  beforeEach( () => {
    cy.betikasession()
  })

  it('Navigate to games selection page', () => {
    cy.visit('/s/soccer')

  })

  it('Place a single bet', () => {
    cy.visit('/s/soccer')
    cy.singlebet()
    bettingPage.elements.betnav().click()
    bettingPage.elements.betamount().type('{backspace}')
    bettingPage.elements.placebet().click()
    loginPage.elements.notification().should('contain','Bet Placement Successful')
  })

  it('Place bet with less than minimum stake limit', () => {
    cy.visit('/s/soccer')
    cy.singlebet()
    bettingPage.elements.betnav().click()
    bettingPage.elements.betamount().type('{backspace}{backspace}{backspace}').type('0.99')
    bettingPage.elements.placebet().should('have.attr','disabled','disabled')
    
  })

  it('Place bet with amount exceeding wallet balance', () => {
    cy.visit('/s/soccer')
    cy.singlebet()
    bettingPage.elements.betnav().click()
    bettingPage.elements.betamount().type('{backspace}{backspace}{backspace}').type('50000')
    bettingPage.elements.placebet().click()
    loginPage.elements.notification().should('contain','Max stake exceeded')
  })

  it('Place multiple bets', () => {
    cy.visit('/s/soccer')
    cy.multibet()
    bettingPage.elements.betnav().click()
    bettingPage.elements.placebet().click()
    loginPage.elements.notification().should('contain','Bet Placement Successful')
  })


})

describe('Betting games before login', () => {
  it('Place a single bet without being logged in', () => {
    cy.visit('/s/soccer')
    cy.singlebet()
    bettingPage.elements.betnav().click()
    bettingPage.elements.betamount().type('{backspace}')
    bettingPage.elements.placebet().click()
    loginPage.elements.notification().should('contain','Please login to place a bet')
    cy.url().should('contain','/login')
  })

  it('Place a multi bet without being logged in', () => {
    cy.visit('/s/soccer')
    cy.multibet()
    bettingPage.elements.betnav().click()
    bettingPage.elements.betamount().type('{backspace}')
    bettingPage.elements.placebet().click()
    loginPage.elements.notification().should('contain','Please login to place a bet')
    cy.url().should('contain','/login')
  })
})