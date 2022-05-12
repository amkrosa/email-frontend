import {getHtmlBy, getRows} from "../pages/EmailList";


describe("Recent emails - displays email list", () => {
    let rows
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
        cy.wait('@getAllEmails')
        rows = getRows()
    })

    for (let i = 0; i < 3; i++) {
        let row
        beforeEach(() => { row = rows[i] })

        it(`row ${i} should have correct subject`, () => {
            expect(row.subject).to.equal(`subject ${i + 1}`)
        })
        it(`row ${i} should have correct email`, () => {
            expect(row.toEmail).to.equal(`email${i + 1}@gmail.com`)
        })
        it(`row ${i} should have correct date`, () => {
            expect(row.dateTimeSent).to.equal(`2022-04-21 00:0${i + 1}`)
        })
        it(`row ${i} HTML should be expandable`, () => {
            row.button.click()
            getHtmlBy(i).should('be.visible')
        })
        it(`row ${i} HTML should have correct data`, () => {
            row.button.click()
            getHtmlBy(i).should('contain.text', `Hello test ${i + 1}`)
        })
    }
})