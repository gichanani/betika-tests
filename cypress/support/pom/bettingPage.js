class betting {
    elements = {
        betnav: () => cy.get('.nav__betslip'),
        betamount: () => cy.get('.input__container > .input'),
        placebet: () => cy.get("button[type='normal']")
    
    }
}

module.exports = new betting();