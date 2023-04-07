describe('Betting games', () => {
  beforeEach( () => {
    cy.visit('/s/soccer', {timeout:60000})
  })
  it('Navgate to games selection page', () => {
    cy.get('.prebet-match__odd-market__container')
  })

  it.only('Select random games', () => {

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
        });

  });
}

 
    
  })
})