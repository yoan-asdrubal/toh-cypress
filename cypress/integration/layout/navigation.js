describe('Navigation component', () => {
    it('should render ToHComponent when access to root route', function () {
        cy.visit('/');
        cy.get('app-toh-home').should('have.length', 1);
    });

    it('should load url and component when click on Dashboard option', function () {
        cy.visit('/');
        cy.get('#id1').click();
        cy.url().should('include', 'dashboard');
    });

})
