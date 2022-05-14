import {closeDialog, fillForm, getForm, mapFormToRequest, openDialog, submitForm} from "../pages/EmailSend";

describe("Send email dialog", () => {
    const setup = () => {
        cy.interceptGetAllEmails()
        cy.interceptGetTemplates()
        localStorage.setItem("token", "sometoken")
        cy.visit('http://localhost:3000/')
        cy.wait('@getAllEmails')
        cy.wait('@getTemplates')
    }

    beforeEach(() => {
        setup()
    })

    it("can open send dialog", () => {
        openDialog()

        getForm().subject.should('be.visible')
        getForm().email.should('be.visible')
        getForm().template.should('be.visible')
    })

    context("dialog opened", () => {
        beforeEach(() => {
            openDialog()
        })

        it("can cancel dialog without sending the form", () => {
            cy.interceptPostEmail()
            closeDialog()
            cy.get('@postEmailSpy').its('callCount').should('equal', 0)
        })

        it("can send filled out form with submit", () => {
            cy.interceptPostEmail()

            const givenForm = {
                    subject: 'subject',
                    email: 'email@email.com',
                    template: 'REGISTRATION',
                    registration: {
                        username: 'some username'
                    }
            }
            fillForm(givenForm)
            submitForm()

            cy.get('@postEmailSpy').its('callCount').should('equal', 1)
            cy.get('@postEmail').its('request.body').should('deep.equal', mapFormToRequest(givenForm))
        })

    })
})