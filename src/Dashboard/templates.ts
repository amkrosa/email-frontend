interface RegistrationFields {
    username: string
}

const registration = {
    username: "Username"
}


export const template = (name: string): RegistrationFields => {
    switch (name.toUpperCase()) {
        case "REGISTRATION": {
            return registration
        }
        default: {
            return registration
        }
    }
}