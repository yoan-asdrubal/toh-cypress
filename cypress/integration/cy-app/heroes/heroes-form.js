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
        cy.getWidgetFieldInput('skill').as('skills');

        cy.getWidgetFieldInput('date', '02/12/2019').should('have.value', '02/12/2019');

        cy.get('@skills').within((skills) => {
            cy.wrap(skills[0]).type(hero.skill[0])
                .should('have.value', hero.skill[0]);
            cy.wrap(skills[1]).type(hero.skill[1])
                .should('have.value', hero.skill[1]);
        });


        cy.get('@skills').first().should('have.value', hero.skill[0]);
        cy.get('@skills').last().should('have.value', hero.skill[1]);

        cy.get('@skills').its(0).should('have.value', hero.skill[0]);
        cy.get('@skills').its(1).should('have.value', hero.skill[1]);

        cy.checkValidFormTemplate();

        cy.server();
        cy.route('POST', '/hero', hero).as('addHero');

        cy.getCY('submit').should('have.length', 1).click();

        cy.wait('@addHero')
            .then((req) => {
                delete hero['default'];
                assert.deepEqual(req.requestBody, hero);
            });
        // cy.wait('@addHero')
        //     .its('response.body').should('deep.equal', hero);

        cy.getWidgetFieldInput('name').should('have.value', '');

        cy.get('@skills').then((skills) => {
            cy.wrap(skills[0]).should('have.value', '');
            cy.wrap(skills[1]).should('have.value', '');
        });

        cy.get('@skills').first().should('have.value', '');
        cy.get('@skills').last().should('have.value', '');

        cy.get('@skills').its(0).should('have.value', '');
        cy.get('@skills').its(1).should('have.value', '');
    });
})
