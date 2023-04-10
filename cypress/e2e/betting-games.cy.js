import bettingPage from "../support/pom/bettingPage"
import loginPage from "../support/pom/loginPage"

describe('Betting games after login', () => {
  beforeEach( () => {
  //   cy.betikasession()
  cy.login()
 })
  

  it('Navigate to games selection page', () => {
    cy.visit('/s/soccer')

  })

})
