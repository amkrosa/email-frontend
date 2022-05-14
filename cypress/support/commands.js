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

/// <reference types="cypress" />
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add('interceptGetAllEmails', () => {
    cy.intercept(
        {
            method: 'GET',
            url: '**/email/all',
        },
        {
            fixture: 'getEmailsAll.json'
        } // and force the response to be: []
    ).as('getAllEmails')
})

Cypress.Commands.add('interceptGetTemplates', () => {
    cy.intercept(
        {
            method: 'GET',
            url: '**/email/templates',
        },
        {
            fixture: 'templates.json'
        } // and force the response to be: []
    ).as('getTemplates')
})

Cypress.Commands.add('interceptPostEmail', () => {
    cy.intercept(
        {
            method: 'POST',
            url: '**/email/*',
        }, cy.spy().as('postEmailSpy')
    ).as('postEmail')
})

Cypress.Commands.add(`verifyCallCount`, (alias, expectedNumberOfCalls) => {
    const resolvedAlias = alias[0] === `@` ? alias.substring(1) : alias

    cy.get(`${resolvedAlias}.all`).then((calls) => {
        cy.wrap(calls.length).should(`equal`, expectedNumberOfCalls)
    })
})
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
