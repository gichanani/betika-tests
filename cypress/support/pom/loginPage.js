class login {
    elements = {
        username: () => cy.get("input[type='text']"),
        password: () => cy.get("input[type='password']"),
        loginBtn: () => cy.contains('button','Login').click(),
        loginTop: () => cy.get('.outline').click(),
        notification: () => cy.get('.notification'),
        error: () => cy.get('.text-error'),
        logo: () => cy.get('.topnav__left > .logo__image')
    }
}

module.exports = new login();