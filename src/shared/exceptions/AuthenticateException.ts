export class AuthenticateException extends Error {
    constructor () {
        super("Las credenciales proporcionadas son incorrectas")
    }
}