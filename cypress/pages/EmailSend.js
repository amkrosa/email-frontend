const getTemplate = (template) => {
    switch (template) {
        case 'REGISTRATION': {
            return registrationTemplate()
        }
        default: {
            return registrationTemplate()
        }
    }
}

const registrationTemplate = () => {
    return {
        username: cy.get('#username').as('username')
    }
}

export const getForm = (template = null) => {
    const form = {
        subject: cy.get('#subject').as('subject'),
        email: cy.get('#toEmail').as('email'),
        template: cy.get('#template').as('template')
    }
    if (template != null) {
        form[template.toLowerCase()] = getTemplate(template)
    }
    return form
}

export const openDialog = () => {
    cy.get("[data-testid='test-openSendEmailDialog'").click()
}

export const fillForm = (form) => {
    getForm().template.click().get(`[data-value='${form.template}'`).click();
    const formElements = getForm(form.template)
    cy.get('@subject').type(form.subject)
    cy.get('@email').type(form.email)

    const templateForm = getTemplate(form.template)

    Object.keys(templateForm).forEach(key => {
        cy.get(`@${key}`).type(form[form.template.toLowerCase()][key])
    })
}

export const submitForm = () => {
    cy.get("[data-testid='test-submit']").click()
}

export const closeDialog = () => {
    cy.get("[data-testid='test-cancel']").click()
}

export const mapFormToRequest = (form) => {
    const formCopy = JSON.parse(JSON.stringify(form))
    formCopy.attributes = formCopy[formCopy.template.toLowerCase()]
    delete formCopy[formCopy.template.toLowerCase()]

    formCopy.toEmail = formCopy.email
    delete formCopy.email

    return formCopy
}