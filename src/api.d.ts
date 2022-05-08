export interface Email {
    emailUuid: string,
    subject: string,
    toEmail: string,
    dateTimeSent: string,
    html: string
}

export interface GetAllEmails {
    emails: Email[]
}
