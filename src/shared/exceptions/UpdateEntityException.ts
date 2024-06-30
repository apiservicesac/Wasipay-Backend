export class UpdateEntityException extends Error {
    constructor (message: string = "Error al actualizar el registro") {
        super(message)
    }
}