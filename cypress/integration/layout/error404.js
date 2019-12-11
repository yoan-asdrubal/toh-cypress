describe('Error 404', () => {
    it('should render Error404Component when visit pathNotFound url', function () {
        cy.visit('pathNotFound');
        cy.url().should('include', 'pathNotFound');
        cy.get('#app-content app-error404').should('have.length', 1);
    });
    it('should redirect to pathNotFound when access to not found url ', function () {
        cy.visit('path-Not-Found');
        cy.url().should('include', 'pathNotFound');
        cy.get('#app-content app-error404').should('have.length', 1);
    });
})
