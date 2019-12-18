// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('getWidgetField', (name) => {

    return cy.get(`[formControlName="${name}"]`);
});

// Devuelve el input especificado correspondiente al formControlName especificado parametros
// En caso de especificarle un valor lo escribe en el input
Cypress.Commands.add('getWidgetFieldInput', (name, value) => {
    if (!!value)
        return cy.get(`[formControlName="${name}"] input`).clear().type(value);
    return cy.get(`[formControlName="${name}"] input`);
});

// Chequea que el formulario sea valido
Cypress.Commands.add('checkValidFormTemplate', () => {
    cy.get('ng-invalid').should('have.length', 0);
});

// Chequea que la cantidad de campos no validos sea la especificada por parametros
Cypress.Commands.add('checkInvalidFormTemplate', (invalids) => {
    cy.get('[formControlName] .ng-invalid').should('have.length', invalids);
});

// Devuelve el resultado de un selector usando atributo data-cy
Cypress.Commands.add('getCY', (attr) => {
    return cy.get(`[data-cy="${attr}"]`);
});

