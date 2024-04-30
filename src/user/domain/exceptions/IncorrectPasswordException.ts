export class IncorrectPasswordException extends Error {
    constructor () {
        super("La contraseña proporcionada es incorrecta")
    }
}