import * as hero from '../../../fixtures/hero';

describe('Heroes Form component', () => {
    it('should render from HeroesListComponent', function () {
        cy.visit('/heroes');
        cy.get('#add').click();
        cy.url().should('include', 'heroes/nuevo');
        cy.get('#app-content app-heroes-form').should('have.length', 1);
    });

    it('should render from visit url ', function () {
        cy.visit('/heroes/nuevo');
        cy.url().should('include', 'heroes/nuevo');
        cy.get('#app-content app-heroes-form').should('have.length', 1);
    });

    it('should Render form with to skill field', function () {
        cy.get('form')
            .should('have.length', 1)
            .within(() => {
                cy.getWidgetField('name').should('have.length', 1);
                cy.getWidgetField('skill').should('have.length', 0);
            });

        cy.get('#add-skill').should('have.length', 1)
            .click()
            .click();

        cy.getWidgetField('skill').should('have.length', 2);
        cy.getWidgetField('skill').eq(0).should('contain.text', 'Skill 0');
        cy.getWidgetField('skill').eq(1).should('contain.text', 'Skill 1');

    });

    it('should submit form when valid with tow skill field', function () {


        cy.getWidgetFieldInput('name', hero.name).should('have.value', hero.name);

        cy.getWidgetFieldInput('skill').eq(0).type(hero.skill[0])
            .should('have.value', hero.skill[0]);

        cy.getWidgetFieldInput('skill').eq(1).type(hero.skill[1])
            .should('have.value', hero.skill[1]);

        cy.checkValidFormTemplate();
        cy.checkInvalidFormTemplate(0);

        cy.server();
        cy.route('POST', '/hero', hero).as('addHero');

        cy.getCY('submit').should('have.length', 1).click();

        cy.wait('@addHero')
            .its('request.body').should('deep.equal', hero);

        cy.getWidgetField('name').should('have.class', 'ng-invalid');

        cy.getWidgetField('skill').eq(0).should('have.class', 'ng-invalid');

        cy.getWidgetField('skill').eq(1).should('have.class', 'ng-invalid');


    });
})
