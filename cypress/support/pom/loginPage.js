class login {
    elements = {
        username: () => cy.get("input[type='text']"),
        password: () => cy.get("input[type='password']"),
        loginBtn: () => cy.contains('button','Login').click({timeout:60000}),
        loginTop: () => cy.get('.outline').click(),
        notification: () => cy.get('.notification'),
        error: () => cy.get('.text-error'),
        logo: () => cy.get('.topnav__left > .logo__image'),
        forgotpassword: () => cy.get('.session__form__link'),
        register: () => cy.contains('a','Register here')
    }
}

module.exports = new login();