export class UpdateEntityException extends Error {
    constructor () {
        super("Error al actualizar el registro")
    }
}