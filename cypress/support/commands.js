// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import loginPage from '../support/pom/loginPage'
const account = require('../fixtures/user.json')
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
Cypress.Commands.add('usersession', () => {
    cy.session('betika', () => {
    cy.visit('/')
    loginPage.elements.loginTop()
    loginPage.elements.username().type(account.testaccount)
    loginPage.elements.password().type(account.password)
    loginPage.elements.loginBtn()
    cy.location('pathname').should('contain','en-ke')
    loginPage.elements.logo().should('be.visible')
    })
})


Cypress.Commands.add('randomgames', () => { 
        // Loop through 10 games
        for (let i = 0; i < 10; i++) {
            // Find the game container
            cy.get('.prebet-match__odd-market__container').eq(i).within(() => {
      
              cy.wait(500).get('.prebet-match__odd').then(buttons => {
                // Select a random button
                const randomIndex = Math.floor(Math.random() * buttons.length);
                const randomButton = buttons.eq(randomIndex);
      
                // Click the button and confirm the selection
                randomButton.trigger('click')
              })
        });
      }
})
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

