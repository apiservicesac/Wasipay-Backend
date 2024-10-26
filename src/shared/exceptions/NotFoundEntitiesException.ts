export class NotFoundEntitiesException extends Error {
    constructor () {
        super("Registro no encontrados")
    }
}