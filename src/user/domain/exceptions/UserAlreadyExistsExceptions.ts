export class UserAlreadyExistsExceptions extends Error {
    constructor () {
        super("El usuario ya esta registrado")
    }
}