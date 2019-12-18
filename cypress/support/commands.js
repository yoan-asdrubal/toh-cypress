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

// Especifica la fecha definida por parametros en el widget-date-picker especificado por @param name
Cypress.Commands.add('selectDate', (name, day, month, year) => {
    const labelMonth = ['ENE.', 'FEB.', 'MAR.', 'ABR.', 'MAY.', 'JUN.', 'JUL.', 'AGO.', 'SEP.', 'OCT.', 'NOV.', 'DIC.']
    cy.get(`[formControlName="${name}"]`).as('date');
    cy.get('@date').find('mat-datepicker-toggle button', {force: true}).click();
    cy.get('.mat-calendar-header .mat-calendar-controls .mat-calendar-period-button').click();
    cy.get('.mat-calendar-body-cell-content').contains(year).click();
    cy.get('.mat-calendar-body-cell-content').contains(labelMonth[month - 1]).click();
    cy.get('.mat-calendar-body-cell-content').contains(day).click();
    return cy.get('@date');
});

// WidgetAutocomplete
// Comprueba que se muestran la cantidad de opciones especificadas para el widget autocomplete
Cypress.Commands.add('widgetAutocompleteCheckOptions', (name, options) => {
    cy.get(`[formControlName="${name}"]`).as('autocomplete');
    cy.get('@autocomplete').click();
    cy.get('.widget-autocomplete-option').should('have.length', options);
    return cy.get('@autocomplete');
});

// Selecciona un elemento dentro del WidgetAutocomplete
Cypress.Commands.add('widgetAutocompleteSelectOption', (name, option) => {
    cy.get(`[formControlName="${name}"]`).as('autocomplete');
    cy.get('@autocomplete').click();
    cy.get('.widget-autocomplete-option').contains(option).should('have.length', 1);
    cy.get('.widget-autocomplete-option').contains(option).click();
    return cy.get('@autocomplete');
});
// Realiza y chequea el resultado de la busqueda en el widgetAutocomplete
Cypress.Commands.add('widgetAutocompleteSearch', (name, search, results, values) => {
    cy.get(`[formControlName="${name}"]`).as('autocomplete');
    cy.get('@autocomplete').click();
    cy.get('input.input-filter').focus().type(search).should('have.value', search);
    cy.get('.widget-autocomplete-option').should('have.length', results);
    if (!!values) {
        cy.get('.widget-autocomplete-option span')
            .should((val) => {
                const options = val.map((i, el) => Cypress.$(el).text()).get();
                expect(options).to.have.length(results);
                expect(options).to.deep.eq(values);
            })
    }
    return cy.get('@autocomplete');
});
