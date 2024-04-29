export class DeleteEntityException extends Error {
    constructor () {
        super("Error al eliminar el registro")
    }
}