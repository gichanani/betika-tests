import loginPage from '../support/pom/loginPage'
const account = require('../fixtures/user.json')

describe('Login', () => {
  beforeEach( () => {
    cy.visit('/login')
  })

  it('Navigate to login page', () => {
    cy.location('pathname').should('eq','/en-ke/login')
  })

  it('Validate required phone number field', () => {
    loginPage.elements.loginBtn()
    loginPage.elements.error().should('contain','Please enter a phone number')
  })

  it('Validate required password field', () => {
    loginPage.elements.username().type(account.testaccount)
    loginPage.elements.loginBtn()
    loginPage.elements.error().should('contain','Please enter a password')
  })

  it('Login with valid credentials', () => {
    loginPage.elements.username().type(account.testaccount)
    loginPage.elements.password().type(account.password)
    loginPage.elements.loginBtn()
    cy.location('pathname').should('contain','en-ke')
  })

  it('Login with wrong password', () => {
    loginPage.elements.username().type(account.testaccount)
    loginPage.elements.password().type(account.invalid_password)
    loginPage.elements.loginBtn()
    loginPage.elements.notification().should('contain','The mobile and password provided do not match')
  })

  it('Login with wrong phone number', () => {
    loginPage.elements.username().type(account.wrongaccount)
    loginPage.elements.password().type(account.invalid_password)
    loginPage.elements.loginBtn()
    loginPage.elements.notification().should('contain','The mobile and password provided do not match')
  })

  it('Login with invalid phone number', () => {
    loginPage.elements.username().type(account.invalid_testaccount)
    loginPage.elements.password().type(account.invalid_password)
    loginPage.elements.loginBtn()
    loginPage.elements.error().should('contain','This phone number is invalid')
  })

})