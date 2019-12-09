describe('Dashboard Component', () => {

    it('should Load Dashboard component on page component ', () => {
        cy.visit('dashboard');
        cy.get('.page-title .title').should('have.text', 'Dashboard');
    });

    it('should have 4 card rendered', function () {
        cy.get('.page-content .mat-card-title')
            .should('have.length', 4)
    });

    it('should have first card title Estadisticas', function () {
        cy.get('.page-content .mat-card-title')
            .its('0')
            .should('contain.text', 'Estadísticas')
    });
})
