describe('Heroes Form component', () => {
    it('should render from HeroesListComponent', function () {
        cy.visit('/heroes');
        cy.get('#add').click();
        cy.url().should('include','heroes/nuevo');
        cy.get('#app-content app-heroes-form').should('have.length',  1);
    });

    it('should render from visit url ', function () {
        cy.visit('/heroes/nuevo');
        cy.url().should('include','heroes/nuevo');
        cy.get('#app-content app-heroes-form').should('have.length',  1);
    });
})
