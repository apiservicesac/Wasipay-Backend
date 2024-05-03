export class NotFoundEntityException extends Error {
    constructor () {
        super("Registro no encontrado")
    }
}