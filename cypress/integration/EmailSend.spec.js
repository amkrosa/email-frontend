describe("Recent emails", () => {
    beforeEach(() => {
        cy.intercept(
            {
                method: 'GET',
                url: '**/email/all',
            },
            {
                fixture: 'getEmailsAll.json'
            } // and force the response to be: []
        ).as('getAllEmails') // and assign an alias
        cy.visit('http://localhost:3000/')
    })

    it("displays email list", () => {
        cy.wait('@getAllEmails')
        cy.wait(10000)
    })


})