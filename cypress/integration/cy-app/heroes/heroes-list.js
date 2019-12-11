describe('Heroes List Component ', ()=> {
    it('should render HeroesListComponent', function () {
        cy.visit('/heroes');
        cy.get('#app-content app-heroes-list').should('have.length',  1);
    });
})
