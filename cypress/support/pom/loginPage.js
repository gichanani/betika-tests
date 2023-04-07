class login {
    elements = {
        username: () => cy.get("input[type='text']"),
        password: () => cy.get("input[type='password']"),
        loginBtn: () => cy.contains('button','Login').click(),
        notification: () => cy.get('.notification'),
        error: () => cy.get('.text-error')
    }
}

module.exports = new login();