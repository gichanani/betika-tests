describe('Betting games', () => {
  beforeEach( () => {
    cy.usersession()
  })
  it('Navgate to games selection page', () => {
    
  })

  it.only('Select random games', () => {
    cy.visit('/s/soccer')
    cy.randomgames()
  })
})