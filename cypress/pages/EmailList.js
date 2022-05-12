const elementsToRows = (cssSelector, key, rows, isButton=false) => {
    cy.get(cssSelector).then((elements) => {
        const elementArray = Array.from(elements, el => isButton ? el : el.innerText);
        elementArray.forEach((subject, index) => {
            rows[index][key] = subject
        })
    })
}

export const getRows = () => {
    let rows = [{}, {}, {}]

    elementsToRows("[data-testid^='test-subject']", "subject", rows)
    elementsToRows("[data-testid^='test-toEmail']", "toEmail", rows)
    elementsToRows("[data-testid^='test-dateTimeSent']", "dateTimeSent", rows)
    elementsToRows("[data-testid^='test-openHtml']", "button", rows, true)

    return rows
}

export const getHtmlBy = (rowIndex) => {
    return cy.get(`[data-testid^='test-html-${rowIndex}']`)
}