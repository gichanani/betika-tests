describe('Betting games', () => {
  beforeEach( () => {
    cy.visit('/s/soccer', {timeout:60000})
  })
  it('Navgate to games selection page', () => {
    cy.get('.prebet-match__odd-market__container')
  })

  it.only('Select random games', () => {
    cy.randomgames()
  })
})