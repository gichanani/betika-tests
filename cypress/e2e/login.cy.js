import loginPage from '../support/pom/loginPage'
const account = require('../fixtures/user.json')

describe('Login', () => {
  beforeEach( () => {
    cy.visit('/login')
  })

  it('Navigate to login page', () => {
    cy.allure().severity('blocker')
    cy.location('pathname').should('eq','/en-ke/login')
  })

  it('Validate required phone number field', () => {
    cy.allure().severity('critical')
    loginPage.elements.loginBtn()
    loginPage.elements.error().should('contain','Please enter a phone number')
  })

  it('Validate required password field', () => {
    cy.allure().severity('critical')
    loginPage.elements.username().type(account.testaccount)
    loginPage.elements.loginBtn()
    loginPage.elements.error().should('contain','Please enter a password')
  })

  it('Login with valid credentials', () => {
    cy.allure().severity('blocker')
    loginPage.elements.username().type(account.testaccount)
    loginPage.elements.password().type(account.password)
    loginPage.elements.loginBtn()
    loginPage.elements.notification().should('contain','Loggged in')
    // cy.location('pathname').should('contain','en-ke')
  })

  it.skip('Login with wrong password', () => {
    cy.allure().severity('blocker')
    loginPage.elements.username().type(account.testaccount)
    loginPage.elements.password().type(account.invalid_password)
    loginPage.elements.loginBtn()
    loginPage.elements.notification().should('contain','The mobile and password provided do not match')
  })

  it.skip('Login with wrong phone number', () => {
    cy.allure().severity('blocker')
    loginPage.elements.username().type(account.wrongaccount)
    loginPage.elements.password().type(account.invalid_password)
    loginPage.elements.loginBtn()
    loginPage.elements.notification().should('contain','The mobile and password provided do not match')
  })

  it.skip('Login with invalid phone number', () => {
    cy.allure().severity('blocker')
    loginPage.elements.username().type(account.invalid_testaccount)
    loginPage.elements.password().type(account.invalid_password)
    loginPage.elements.loginBtn()
    loginPage.elements.error().should('contain','This phone number is invalid')
  })

  it('Validate regsiter link redirects to register page', () => {
    cy.allure().severity('blocker')
    loginPage.elements.register().click()
    cy.url().should('contain','/register')
  })

  it('Validate password reset link redirects to password reset page', () => {
    cy.allure().severity('blocker')
    loginPage.elements.forgotpassword().click()
    cy.url().should('contain','/forgotpassword')
  })

})